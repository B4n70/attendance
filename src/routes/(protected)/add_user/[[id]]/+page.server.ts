import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from '../$types'
import { writeFileSync, readFileSync } from 'fs';
import bcrypt from 'bcrypt'

import { db } from '$lib/database'

// using an enum for user roles to avoid typos
// if you're not using TypeScript use an object
enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER',
}


export const load: PageServerLoad = async ({params, fetch, locals}) => {
	// redirect user if logged in
	if (!locals.user) {
		throw redirect(302, '/login')
	}

    let userStudent = params.id
	if (userStudent){
		//console.log({locals, params})
		let nUser = await fetch(`/api/getUser/${userStudent}`, { headers: { 'Content-Type': 'application/json' } }).then(x => x.json())
		//console.log({ret})
		return {nUser}
	}
};

const add_user: Action = async ({ request }) => {
	const data = await request.formData()

	const fname = data.get('fname')
	const surname = data.get('surname')
	const student_number = data.get('student_number')
	const student_year = data.get('student_year')
	let avatar = data.get('avatar')
	if (avatar == ''){avatar = 'avatar.png'}

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
			student_year,
            avatar,
		},
	})

	throw redirect(303, '/')
}


const upload_photo: Action = async ({ request }) => {
	const formdata = await request.formData();
	const file = formdata.get('avatarFile') as string;
	let avatarName = new Date().getTime().toString()
	avatarName = avatarName+'.jpg'
	console.log(avatarName)
	await new Promise((resolve) => {
		setTimeout(() => {
			// wait 2 secconds
			resolve(1);
		}, 1000);
	});
	if (file) {
		try {
			writeFileSync('./static/uploads/'+avatarName, Buffer.from(await file.arrayBuffer()));
			return { ok: true, pending: false, filename: avatarName };
		} catch (e) {
			return { notok: true, pending: false };
		}
	} else {
		return { notok: true, pending: false };
	}
}

	

export const actions: Actions = { add_user, upload_photo }
