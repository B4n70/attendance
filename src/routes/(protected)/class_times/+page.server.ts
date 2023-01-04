import { redirect, type LoadEvent } from '@sveltejs/kit'
import type { PageServerLoad, RequestEvent } from './$types'
import { db } from '$lib/database'

export const load: PageServerLoad = async ({ locals, fetch }: LoadEvent) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/')
	}
	//db.fetch
	/*
	const classes = await db.classes.findMany({
		select: { status: true, description: true },
	})

	for (const result in classes) {
		result.name = await db.classes.findFirst({ select: { status: true }, where: x => x.id === result.id })
		//let { fname, surname } = await fetch(`/api/getUser/${attendance[result].student_number}`).then(x => x.json())
		//let ret = await fetch(`/api/getClasses/${classes[result].status}`, { headers: { 'Content-Type': 'application/json' } }).then(x => x.json())
		//console.log({ret})
		//if (ret !== null) {
		//	classes[result].name = `${ret.status} ${ret.description}`
		//}
	}

	return { classes: Object.values(classes) }
	*/
}
