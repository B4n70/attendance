import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'


export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/')
	}
}


export const actions = {
	attendance: async ({request}) => {
		let FormData = await request.formData()
		let student_number = FormData.get('student_number')
		//console.log(Array.from(FormData))
		//console.log(db)

		let resp = await db.attendance.create({
			data: {
				student_number
			},
		}).then(console.log).catch(console.error)

	}
}



