<script lang="ts">
	import '../app.postcss'
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'

	import '../styles/app.css'
    
	let setCheck = false;
	function toggle() {
		setCheck = !setCheck;
	}
</script>

<svelte:head>
	<title>CFCI Class Registration</title>
</svelte:head>

    <!-- Navigation bar -->
    <header class="header">
        <!-- Logo -->
        <a href="#" class="logo">Class Register</a>
        <!-- Hamburger icon -->
        <input class="side-menu" type="checkbox" id="side-menu" bind:checked={setCheck} />
        <label class="hamb" for="side-menu"><span class="hamb-line"></span></label>
        <!-- Menu -->
        <nav class="nav">
            <ul class="menu">
				{#if !$page.data.user}
					<li><a href="/login" on:click={toggle}>Login</a></li>
					<li><a href="/attendance" on:click={toggle}>Attendance</a></li>
			
					<!-- <a href="/register">Register</a> -->
				{/if}
			
				{#if $page.data.user}
					<li><a href="/admin" on:click={toggle}>Admin</a></li>
					<!-- <li><a href="/profile" on:click={toggle}>Profile</a></li> -->
					<li><a href="/attendance" on:click={toggle}>Attendance</a></li>

					<li><a href="/view_attendance" on:click={toggle}>View Attendance</a></li>
					<li><a href="/class_times" on:click={toggle}>Class Times</a></li>
					<li><a href="/add_user" on:click={toggle}>Add User</a></li>
					<li><a href="/list_users" on:click={toggle}>List Users</a></li>
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
							<button type="submit" style="padding:20px;" on:click={toggle}
							>Log out</button>
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