<script lang="ts">
	import '../app.postcss'
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'

	import '../styles/app.css'
</script>

<svelte:head>
	<title>SvelteKit Auth</title>
</svelte:head>

<nav>
	{#if $page.data.user}
		<a href="/login">Login</a>
		<a href="/register">Register</a>
	{/if}

	{#if $page.data.user}
		<a href="/admin">Admin</a>
		<a href="/profile">Profile</a>
		<a href="/attendance">Attendance</a>
		<a href="/view_attendance">View Attendance</a>

		<form
			class="logout"
			action="/logout"
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					invalidateAll()
					await applyAction(result)
				}
			}}
		>
			<button type="submit">Log out</button>
		</form>
	{/if}
</nav>

<main>
	<slot />
</main>
