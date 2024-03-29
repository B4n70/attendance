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
	if (locals.user) {
		throw redirect(302, '/')
	}
}

const register: Action = async ({ request }) => {
	const data = await request.formData()
	const username = data.get('username')
	const password = data.get('password')
	const fname = data.get('fname')
	const surname = data.get('surname')
	const student_number = data.get('student_number')
	const student_year = data.get('student_year')
	const email = data.get('email')
	console.log('email')
	console.log(email)
	const avatar = data.get('avatar')

	if (
		typeof username !== 'string' ||
		typeof password !== 'string' ||
		!username ||
		!password
	) {
		return fail(400, { fail: true })
	}

	const user = await db.user.findFirst({
		where: { username },
	})

	if (user) {
		return fail(400, { user: true })
	}

	let datasend = {
		username,
		passwordHash: await bcrypt.hash(password, 10),
		userAuthToken: crypto.randomUUID(),
		role: { connect: { name: Roles.USER } },
		fname,
		surname,
		student_number,
		student_year,
		user_email:email,
		avatar,
	}

	console.log(datasend)

	await db.user.create({
		data: datasend
	})

	throw redirect(303, '/login')
}

export const actions: Actions = { register }
