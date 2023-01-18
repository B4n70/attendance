import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import bcrypt from 'bcrypt'

import { db } from '$lib/database'

// using an enum for user roles to avoid typos
// if you're not using TypeScript use an object
enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (!locals.user) {
		throw redirect(302, '/')
	}
}

const add_user: Action = async ({ request }) => {
	const data = await request.formData()

	const fname = data.get('fname')
	const surname = data.get('surname')
	const student_number = data.get('student_number')
	const avatar = 'no'

	const username = fname+'_'+surname+'_'+new Date().getTime()
	const password = username

	const user = await db.user.findUnique({
		where: { student_number },
	})

	if (user) {
		return fail(400, { user: true })
	}

	await db.user.create({
		data: {
			username,
			passwordHash: await bcrypt.hash(password, 10),
			userAuthToken: crypto.randomUUID(),
			role: { connect: { name: Roles.USER } },
			fname,
			surname,
			student_number,
            avatar,
		},
	})

	throw redirect(303, '/')
}

export const actions: Actions = { add_user }
