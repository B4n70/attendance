import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'

//get dates diff for calendar weekly/byweekly
const getDiffInMilliseconds = (d1: Date, d2: Date) => d1.getTime() - d2.getTime();
const millisecondsToDays = (x: number) => x / (1000 * 3600 * 24);
const daysBetween = (x: Date, y: Date) => millisecondsToDays(getDiffInMilliseconds(x, y));
//end get dates diff for calendar weekly/byweekly

const timeAllowance = 20

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}
function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}

export const load: PageServerLoad = async ({ locals }) => {
	const d = new Date()
	const theTime = addMinutes(d, 120);
	let earlyTimeS = addMinutes(theTime, timeAllowance).toISOString()
	let lateTimeS = addMinutes(theTime, -timeAllowance).toISOString()
	let earlyTime = earlyTimeS.split("T").pop();
	let lateTime = lateTimeS.split("T").pop();
	let nowTimeS = theTime.toISOString()
	let nowTime = nowTimeS.split("T").pop();

// 	console.log(earlyTime)
//	console.log(lateTime)
//	console.log(nowTime)



	
	// redirect user if not logged in
	/*
	if (!locals.user) {
		throw redirect(302, '/')
	}
    */
	const classes = await db.classes.findMany({
		select: { description: true, startTime: true, endTime: true, startDate: true, endDate: true },
		where: {
			startTime: {
			  // new Date() creates date with current time and day and etc.
			  //lte: new Date()
			  lte: '2001-01-01T'+earlyTime,
			},
			endTime: {
				gte: '2001-01-01T'+lateTime
			  },
		  },
	})

	const nextClass = await db.classes.findMany({
		select: { description: true, startTime: true, endTime: true },
		where: {
			startTime: {
			  // new Date() creates date with current time and day and etc.
			  //lte: new Date()
			  gte: '2001-01-01T'+nowTime,
			},
		  },
		  orderBy: {
				startTime: 'asc',
		  },		  
	})

	return { classes: Object.values(classes), nextClass: Object.values(nextClass) }
}

export const actions = {
	attendance: async ({request, fetch}) => {
		//decare vars and times
		const d = new Date()
		const theTime = addMinutes(d, 120);
		let earlyTimeS = addMinutes(theTime, timeAllowance).toISOString()
		let lateTimeS = addMinutes(theTime, -timeAllowance).toISOString()
		let earlyTime = earlyTimeS.split("T").pop();
		let lateTime = lateTimeS.split("T").pop();
		let nowTimeS = theTime.toISOString()
		let nowTime = nowTimeS.split("T").pop();

		let FormData = await request.formData()
		let student_number = FormData.get('student_number')
		let timeAttendance = '0'
		let retUser
		let InOrOut = []
		let className = []
		let signInName
		let classStartTime
		let realTime
		let calcStartMin
		let classEndTime
		let calcEndtMin

		const getClass = await db.classes.findMany({
			select: { description: true, startTime: true, endTime: true, startDate: true, repeating: true },
			where: {
				startTime: {
				  // new Date() creates date with current time and day and etc.
				  //lte: new Date()
				  lte: '2001-01-01T'+earlyTime,
				},
				endTime: {
					gte: '2001-01-01T'+lateTime
				  },
			  },	  
		})

		for (let i = 0; i < getClass.length; i++) {

            let tdate = new Date().toISOString()
			let today = new Date(tdate.split('T')[0]+'T01:00:00.000Z')
			
            if (getClass[i].repeating === 'weekly'){
				if (daysBetween(today, getClass[i].startDate) % 7 != 0){continue}
			}
			if (getClass[i].repeating === 'biweekly'){
				if (daysBetween(today, getClass[i].startDate) % 14 != 0){continue}
			}
			InOrOut[i] = 'No class found';
            className[i] = 'No Class Found';

			className[i] = getClass[i].description
			classStartTime = new Date(getClass[i].startTime)
			//console.log('1 '+classStartTime);
			realTime = new Date('2001-01-01T'+nowTime)
			//console.log('2 '+realTime);
			calcStartMin = Math.abs((((realTime - classStartTime) % 86400000) % 3600000) / 60000)
			//console.log('time diff start: ' +calcStartMin);

			if (inRange(calcStartMin, -timeAllowance, timeAllowance)){InOrOut[i] = "In"}

			classEndTime = new Date(getClass[i].endTime)
			//console.log(classEndTime);

			//console.log('3 '+classEndTime);

			calcEndtMin = Math.abs((((realTime - classEndTime) % 86400000) % 3600000) / 60000)
			//console.log('time diff end: ' +calcEndtMin);

			if (inRange(calcEndtMin, -timeAllowance, timeAllowance)){
				
				// you can only sign out if you have singed in 
				let nowDate = new Date().toISOString()
				nowDate = nowDate.substring(0, nowDate.indexOf('T'))

				let InOrOutSearch = await db.attendance.findMany({
					select: { student_number: true, InOrOut: true },
					where: {
						student_number: {
						equals: student_number
						},
						className: {
							equals: className[i]
						},
						createdAt: {
						gte: nowDate+'T00:01:01.000Z'
						},				  
					},
				})
				if (InOrOutSearch.length >= 1){InOrOut[i] = 'Out'}
			}
			//console.log('now the in or out...')
			//console.log(InOrOut)
			//end sign in check
	
			if (InOrOut[i] =='In'){
				timeAttendance = getClass[i].startTime
			}else{
				timeAttendance = getClass[i].endTime
			}
	
	
			retUser = await fetch("/api/getUser/"+student_number, { headers: { 'Content-Type': 'application/json' } }).then(x => x.json())
			//console.log({ret})
			if (retUser !== null) {
				signInName = (retUser.fname +' '+retUser.surname)
			}

			if (InOrOut[i] === 'In' || InOrOut[i] ==='Out'){
				let resp = await db.attendance.create({
					data: {
						student_number,
						className:className[i],
						InOrOut:InOrOut[i],
						timeAttendance
					},
				}).then(console.log).catch(console.error)
			}else{
				className[i] = 'No Class can be signed in or out of at this time'
			}
	
		}

    
		return {retUser, className, InOrOut}
		//fail(400, {error: 'Name too long'})

	}
}