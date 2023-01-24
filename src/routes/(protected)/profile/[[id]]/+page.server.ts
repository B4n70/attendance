import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params, fetch, locals}) => {
    let userStudent = params.id
    //console.log({locals, params})
    let nUser = await fetch(`/api/getUser/${userStudent ?? locals.user.student_number}`, { headers: { 'Content-Type': 'application/json' } }).then(x => x.json())
    //console.log({ret})

	return {nUser}

};
