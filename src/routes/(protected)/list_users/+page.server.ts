import { redirect, type LoadEvent } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import sgMail from '@sendgrid/mail'



import type { Action, Actions, PageServerLoad, RequestEvent } from './$types'
import { db } from '$lib/database'

export const load: PageServerLoad = async ({ locals, fetch }: LoadEvent) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/')
	}
	
	//db.fetch
	const listUsers = await db.user.findMany({
		select: { student_number: true,  fname: true,  surname: true,  student_year: true },
		where: {
			roleId: {
			  equals : 1,
			},
		  },
	})

	return { listUsers: Object.values(listUsers) }
}

/*
const add_time: Action = async ({ request }) => {
*/

export const actions = {
	send_user_email: async ({ request, fetch }) => {

		async function fetchUsers(item) {
			let tUser = await fetch(`/api/getUser/${item}`, { headers: { 'Content-Type': 'application/json' } }).then(x => x.json()).catch((error) => {
				return error.message
			})
			return tUser
		}

		async function sendMail(bUser) {
			console.log(bUser.fname)
			let emailhtml = ''
			emailhtml = "Please find your student card for class attendance<br /><br /><a href='https://class-attendance.vercel.app/profile/"+bUser.student_number+"'>Link to student card</a>"
			console.log(emailhtml)

			let emailStatus = ''
			//console.log(emailhtml)
			sgMail.setApiKey(env.SENDGRID_API_KEY)
			const msg = {
			to: bUser.user_email, // Change to your recipient
			from: 'stevenjoubert@gmail.com', // Change to your verified sender
			subject: 'Student card for '+bUser.fname,
			text: 'its working js',
			html: emailhtml,
		
			}
			await sgMail
			.send(msg)
			.then(() => {
				emailStatus = 'Email sent'
				return emailStatus
			})
			.catch((error) => {
				console.error('showing error: '+ error.message)
			})
		}

		const formdata = await request.formData();
		const userStudentNo = Array.from(formdata.getAll('usersStudent'));
		//const result = await Promise.allSettled(userStudentNo.map(fetchUsers)).then(sendMail);

		const result = await Promise.allSettled(userStudentNo.map(x => fetchUsers(x).then(sendMail)))
	}
}