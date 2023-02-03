import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { db } from '$lib/database'


export const GET: RequestHandler = async ({ params }) => {
   let { student_number } = params
   console.log('123: '+student_number)

   let value = null
   try {
      value = await db.user.findUnique({
         select: { username: true, role: true, fname: true, surname: true, email: true, student_number: true, student_year: true, avatar: true },
         where: {
            student_number: student_number,
         }
      })
      //console.log({user})
   } catch(e) {
      //console.log({e})
      //value = {}
      throw error(500, e.message)
   }

   return json(value)
};

