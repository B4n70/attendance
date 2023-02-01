<script lang="ts">
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'

	import type { ActionData, PageData } from './$types'
	export let data: PageData

	//export let data: PageData;
    export let form: ActionData;
    let pending = false;
    $: pending = form?.pending ?? false;

</script>

<h1>All users</h1>


<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<form action="?/send_user_email" method="POST" use:enhance on:submit={() => (pending = true)}>

<table>
	<tr><th>Name</th><th>Surname</th><th>Year</th><th>Student Number</th><th></th></tr>
{#if data.listUsers}
{#each data.listUsers as tUser}

	<tr><td>{tUser.fname}</td>
		<td>{tUser.surname}</td>
		<td>{tUser.student_year}</td>
		<td><a href="\profile\{tUser.student_number}">{tUser.student_number}</a></td>
		<td><input type="checkbox" name="usersStudent" value="{tUser.student_number}"></td>
		<td><a href="\add_user\{tUser.student_number}">edit</a></td></tr>
{/each}

{/if}
	<tr><td></td><td></td><td></td><td></td><td><button>Send User Email</button></td><td></td></tr>
</table>
</form>



{#if $page.data.user.role === 'ADMIN'}
<!--
<script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/52d6c7aa98e07df143b6d0431/17b42c86eb94ba7b149a2839a.js");</script>

 
	<form action="/logout" method="POST">
		<button type="submit">Log out</button>
	</form>
-->
{/if}
