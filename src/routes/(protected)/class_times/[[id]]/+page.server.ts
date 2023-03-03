import { redirect, type LoadEvent } from '@sveltejs/kit'
import type { PageServerLoad, RequestEvent, Actions, Action } from '../$types'
import { db } from '$lib/database'


export const load: PageServerLoad = async ({ params, locals, fetch }: LoadEvent) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/')
	}
	//db.fetch all
	const classes = await db.classes.findMany({
		select: { id: true, description: true, startTime: true, endTime: true, repeating: true},
	})

    let classId = params.id
    let nClass = ""
	if (classId){
		//console.log({locals, params})
		nClass = await db.classes.findUnique({
			select: { id: true, description: true, startTime: true, endTime: true, startDate: true, endDate: true, repeating: true },
			where: {
				id: parseInt(classId)
			  }
	   })
    }

	return { classes, nClass }
}

const add_class: Action = async ({ request }) => {
	const data = await request.formData()
	const status = true
	const description = data.get('description')
	const sTime = data.get('startTime')
	const eTime = data.get('endTime')

	const sDate = data.get('startDate')
	const eDate = data.get('endDate')
	const repeating = data.get('repeating')

	//let startTime = new Date('01/01/2001 '+ sTime).toISOString()
	let startTime = new Date('01/01/2001 '+ sTime).toISOString()
	let endTime = new Date('01/01/2001 '+ eTime).toISOString()
    
	//using 3am to compensate for 2hours of locale time, to get date to use 1am as time in date
	let startDate = new Date(sDate+' 03:00').toISOString()
	let endDate = new Date(eDate+' 03:00').toISOString()

	await db.classes.create({
		data: {
			status,
			description,
			startTime,
            endTime,
			startDate,
			endDate,
			repeating,
		},
	})

	throw redirect(303, '/class_times')
}

const update_class: Action = async ({ request }) => {
	const data = await request.formData()
	const status = true
	const updateID = data.get('id')
	const description = data.get('description')

	const sTime = data.get('startTime')
	const eTime = data.get('endTime')

	const sDate = data.get('startDate')
	const eDate = data.get('endDate')
	const repeating = data.get('repeating')

	//let startTime = new Date('01/01/2001 '+ sTime).toISOString()
	let startTime = new Date('01/01/2001 '+ sTime).toISOString()
	let endTime = new Date('01/01/2001 '+ eTime).toISOString()
    
	//using 3am to compensate for 2hours of locale time, to get date to use 1am as time in date
	let startDate = new Date(sDate+' 03:00').toISOString()
	let endDate = new Date(eDate+' 03:00').toISOString()

	await db.classes.update({
		where: {
			id: parseInt(updateID),
		  },
		data: {
			status,
			description,
			startTime,
            endTime,
			startDate,
			endDate,
			repeating,
		},
	})

	throw redirect(303, '/class_times')
}

export const actions: Actions = { add_class, update_class }