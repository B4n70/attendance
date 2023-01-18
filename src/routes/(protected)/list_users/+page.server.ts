import { redirect, type LoadEvent } from '@sveltejs/kit'
import type { PageServerLoad, RequestEvent } from './$types'
import { db } from '$lib/database'

export const load: PageServerLoad = async ({ locals, fetch }: LoadEvent) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/')
	}
	//db.fetch
	const listUsers = await db.user.findMany({
		select: { student_number: true,  fname: true,  surname: true },
	})

	return { listUsers: Object.values(listUsers) }
}