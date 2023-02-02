import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'
import sgMail from '@sendgrid/mail'

export const load: PageServerLoad = async () => {

    sgMail.setApiKey(env.SENDGRID_API_KEY)
    const msg = {
    to: 'steven.joubert@xpertek.co.za', // Change to your recipient
    from: 'steven.joubert@xpertek.co.za', // Change to your verified sender
    subject: 'Sending with SendGrid working',
    
    text: 'anworking!!!!!!! js',
    html: "<a href='#'>link time now</a>",

    }
    await sgMail
    .send(msg)
    .then(() => {
        emailStatus = 'Email sent'
        return emailStatus
    })
    .catch((error) => {
        console.error('showing error: '+ error)
    })


    return {};
};