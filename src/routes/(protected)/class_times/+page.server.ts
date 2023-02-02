import { redirect, type LoadEvent } from '@sveltejs/kit'
import type { PageServerLoad, RequestEvent } from './$types'
import { db } from '$lib/database'


export const load: PageServerLoad = async ({ locals, fetch }: LoadEvent) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/')
	}
	//db.fetch
	const classes = await db.classes.findMany({
		select: { description: true, startTime: true, endTime: true, repeating: true},
	})

	return { classes: Object.values(classes) }
}


const add_time: Action = async ({ request }) => {
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

export const actions: Actions = { add_time }

