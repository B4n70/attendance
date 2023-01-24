<script lang="ts">
	import { page } from '$app/stores'

	import type { ActionData, PageData } from './$types'
	export let data: PageData

</script>

<h1>All users</h1>


<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->


<table>
	<tr><th>Name</th><th>Surname</th><th>Student Number</th></tr>
{#if data.listUsers}
{#each data.listUsers as tUser}
	<tr><td>{tUser.fname}</td><td>{tUser.surname}</td><td><a href="\profile\{tUser.student_number}">{tUser.student_number}</a></td><td><a href="\add_user\{tUser.student_number}">edit</a></td></tr>
{/each}

{/if}
</table>

{#if $page.data.user.role === 'ADMIN'}
	<form action="/logout" method="POST">
		<button type="submit">Log out</button>
	</form>
{/if}
