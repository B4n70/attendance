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
function myFunction(item) {
	console.log(item)
	console.log('sending email')
  }

export const actions = {
	send_user_email: async ({ request, fetch }) => {
		const formdata = await request.formData();
		const userStudentNo = formdata.getAll('usersStudent');
		userStudentNo.forEach(myFunction)

		return userStudentNo
		
		let useToEmail = await fetch(`/api/getUser/${userStudentNo}`, { headers: { 'Content-Type': 'application/json' } }).then(x => x.json())
        
		let emailhtml = ''
		emailhtml = "<table>"
		emailhtml += "	<tr><th>Name</th><th>Surname</th><th>Year</th><th>Student Number</th><th></th></tr>"
		emailhtml += "	<tr><td>"+useToEmail.fname+"</td>"
		emailhtml += "		<td>"+useToEmail.surname+"</td>"
		emailhtml += "		<td>"+useToEmail.student_year+"</td>"
		emailhtml += "		<td>"+useToEmail.student_number+"</td>"
		emailhtml += "</table>"
		//console.log(res)


		let emailStatus = ''
		//return emailStatus
		//let emailStatus
		sgMail.setApiKey(env.SENDGRID_API_KEY)
		const msg = {
		to: 'stevenjoubert@gmail.com', // Change to your recipient
		from: 'stevenjoubert@gmail.com', // Change to your verified sender
		subject: 'Sending with SendGrid is Fun',
		
		text: 'anworking!!!!!!! js',
		//html: '<strong>anwith HTMLjs</strong>',
		html: emailhtml,

		}
		sgMail
		.send(msg)
		.then(() => {
			emailStatus = 'Email sent'
			return emailStatus
		})
		.catch((error) => {
			console.error(error)
		})
	}
}
