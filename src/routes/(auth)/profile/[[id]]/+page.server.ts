import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({params, fetch, locals}) => {
    let userStudent = params.id
    //console.log({locals, params})
    if (userStudent){
        let nUser = await fetch(`/api/getUser/${userStudent}`, { headers: { 'Content-Type': 'application/json' } }).then(x => x.json())
        //console.log({ret})
        return {nUser}
    }else{
        throw redirect(303, '/login')
    }


};
