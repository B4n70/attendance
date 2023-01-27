<script lang="ts">
	import '../app.postcss'
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'

	import '../styles/app.css'

</script>

<svelte:head>
	<title>CFCI Class Registration</title>
</svelte:head>

    <!-- Navigation bar -->
    <header class="header">
        <!-- Logo -->
        <a href="#" class="logo">Class Register</a>
        <!-- Hamburger icon -->
        <input class="side-menu" type="checkbox" id="side-menu"/>
        <label class="hamb" for="side-menu"><span class="hamb-line"></span></label>
        <!-- Menu -->
        <nav class="nav">
            <ul class="menu">
				{#if !$page.data.user}
					<li><a href="/login">Login</a></li>
					<li><a href="/attendance">Attendance</a></li>
			
					<!-- <a href="/register">Register</a> -->
				{/if}
			
				{#if $page.data.user}
					<li><a href="/admin">Admin</a></li>
					<li><a href="/profile">Profile</a></li>
					<li><a href="/attendance">Attendance</a></li>
			
					<li><a href="/view_attendance">View Attendance</a></li>
					<li><a href="/class_times">Class Times</a></li>
					<li><a href="/add_user">Add User</a></li>
					<li><a href="/list_users">List Users</a></li>
					<li>
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
							<button type="submit" style="padding:20px;">Log out</button>
						</form>
					</li>
				{/if}
            </ul>
        </nav>
    </header>

<div class="topnav" id="myTopnav">

    
	{#if $page.data.user}


	
	{/if}
</div>
<br />
<main>
	<slot />
</main>

<style>


</style>