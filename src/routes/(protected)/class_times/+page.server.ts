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
		select: { description: true, startTime: true, endTime: true },
	})

	return { classes: Object.values(classes) }
}


const add_time: Action = async ({ request }) => {
	const data = await request.formData()
	const status = true
	const description = data.get('description')
	const sTime = data.get('startTime')
	const eTime = data.get('endTime')
	let startTime = new Date('01/01/2001 '+ sTime).toISOString()
	let endTime = new Date('01/01/2001 '+ eTime).toISOString()

	await db.classes.create({
		data: {
			status,
			description,
			startTime,
            endTime,
		},
	})

	throw redirect(303, '/class_times')
}

export const actions: Actions = { add_time }

