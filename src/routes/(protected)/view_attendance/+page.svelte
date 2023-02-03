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

<table class="tableWithBorder"> 
	<tr><th>student number</th><th>Name</th><th>Time</th><th>Class</th><th>Scanned</th></tr>
{#if $page.data.user}
{#each data.attendance as att}
	<tr><td>{att.student_number}</td><td>{att.name}</td><td>{att.timeAttendance.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td><td>{att.className}</td><td>{att.InOrOut}</td><td>{att.timeAttendance}</td></tr>
{/each}

{/if}
</table>


{#if $page.data.user.role === 'ADMIN'}
	<form action="/logout" method="POST">
		<button type="submit">Log out</button>
	</form>
{/if}

<style>
	.tableWithBorder,
	.tableWithBorder td,
	.tableWithBorder th{

		border: 1px solid #555;
	}
</style>