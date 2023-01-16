import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'


function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/')
	}

	//2001-01-01T14:30:00.000Z
	let timeAllowance = 15
	let theTime = new Date()
	let earlyTime = addMinutes(theTime, timeAllowance).toISOString()
	let lateTime = addMinutes(theTime, -timeAllowance).toISOString()
	earlyTime = earlyTime.split("T").pop();
	lateTime = lateTime.split("T").pop();

	//let nowTime = theTime.toLocaleString().split(", ").pop()
	//nowTime = nowTime.substring(0, 8)+'.000Z'
	//nowTime = nowTime.split('T')[1]
	let nowTime = theTime.toISOString()
	nowTime = nowTime.split("T").pop();
	
    //console.log('earlyTime ' +earlyTime );
    //console.log('lateTime '+lateTime );
	//console.log('nowTime ' +nowTime );

	const classes = await db.classes.findMany({
		select: { description: true, startTime: true, endTime: true },
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
	attendance: async ({request}) => {
		let FormData = await request.formData()
		let student_number = FormData.get('student_number')
		let className = FormData.get('className')
		let InOrOut = 'In'
		let timeAttendance = '0'

		let nowDate = new Date().toISOString()
		nowDate = nowDate.substring(0, nowDate.indexOf('T'))

		let InOrOutSearch = await db.attendance.findMany({
			select: { student_number: true, InOrOut: true },
			where: {
				student_number: {
				  equals: student_number
				},
				className: {
					equals: className
				},
				createdAt: {
				gte: nowDate+'T00:01:01.000Z'
				},				  
			  },
		})
		if (InOrOutSearch.length >= 1){InOrOut = 'Out'}
		console.log('now the in or out...')
		console.log(InOrOutSearch)
		console.log(InOrOut)

		if (InOrOut =='In'){
			timeAttendance = FormData.get('startTime')
		}else{
			timeAttendance = FormData.get('endTime')
		}

		let resp = await db.attendance.create({
			data: {
				student_number,
				className,
				InOrOut,
				timeAttendance
			},
		}).then(console.log).catch(console.error)

	}
}