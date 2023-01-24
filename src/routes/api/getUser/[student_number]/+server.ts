import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { db } from '$lib/database'


export const GET: RequestHandler = async ({ params }) => {
   let { student_number } = params
   //console.log(student_number)

   let value = null
   try {
      value = await db.user.findFirst({
         select: { username: true, role: true, fname: true, surname: true, student_number: true, student_year: true, avatar: true },
         where: {
            student_number: student_number,
         }
      })
      //console.log({user})
   } catch(e) {
      console.log({e})
      value = {}
   }

   return json(value)
};

