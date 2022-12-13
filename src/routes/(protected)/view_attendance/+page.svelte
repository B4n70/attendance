<script lang="ts">
	import { page } from '$app/stores'
	import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'
	import { enhance } from '$app/forms'

	import type { ActionData, PageData } from './$types'
	export let data: PageData
	export let form: ActionData

	let scanning = false

</script>

<h1>View Attendance</h1>

<table>
	<tr><th>student number</th><th>Name</th><th>Date</th></tr>
{#if $page.data.user}
{#each data.attendance as att}
	<tr><td>{att.student_number}</td><td>{att.name}</td><td>{att.createdAt}</td></tr>
{/each}

{/if}
</table>

{#if $page.data.user.role === 'ADMIN'}
	<form action="/logout" method="POST">
		<button type="submit">Log out</button>
	</form>
{/if}

