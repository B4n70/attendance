<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'
	export let form: ActionData
</script>

<h1>Add User</h1>

<form action="?/add_user" method="POST" use:enhance>
	<!-- 
	<div>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" required />
	</div>

	<div>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" required />
	</div>




	<div>
		<label for="avatar">avatar</label>
		<input id="avatar" name="avatar" type="text"  />
	</div>
-->
{#if form?.user}
<p class="error">User with student number/name is already registered.</p>
{/if}
	<div>
		<label for="fname">First Name</label>
		<input id="fname" name="fname" type="text" required />
	</div>

	<div>
		<label for="surname">Surname</label>
		<input id="surname" name="surname" type="text" required />
	</div>
	

	<div>
		<label for="student_number">student_number</label>
		<input id="student_number" name="student_number" type="text" required />
	</div>

	

	
	<button type="submit">Add</button>
</form>
