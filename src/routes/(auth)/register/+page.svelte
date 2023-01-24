<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'
	export let form: ActionData
</script>

<h1>Register</h1>

<form action="?/register" method="POST" use:enhance>
	<div>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" required />
	</div>

	<div>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" required />
	</div>



	{#if form?.user}
		<p class="error">Username is taken.</p>
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
		<label for="student_number">student number</label>
		<input id="student_number" name="student_number" type="text" required />
	</div>

	<div>
		<label for="student_year">student year</label>
		<select name="student_year" id="student_year" required>
			<option value="First Year">First Year</option>
			<option value="Second Year">Second Year</option>
			<option value="Third Year">Third Year</option>
			<option value="Honours">Honours</option>
		  </select>
	</div>

	<div>
		<label for="avatar">avatar</label>
		<input id="avatar" name="avatar" type="text"  />
	</div>
	
	<button type="submit">Register</button>
</form>


<style>

select{
	text-transform: none;
    float: left;
    diplay: block;
    -webkit-appearance: button;
    -moz-appearance: button;
    -webkit-user-select: none;
    -moz-user-select: none;
    -webkit-padding-end: 20px;
    -moz-padding-end: 20px;
    -webkit-padding-start: 2px;
    -moz-padding-start: 2px;
    background-color: grey;
    background-position: center right;
    background-repeat: no-repeat;
    border: 1px solid #AAA;
    border-radius: 10px;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 10%);
    color: #555;
    font-size: inherit;
    margin: 0;
    overflow: hidden;
    padding-top: 2px;
    padding-bottom: 2px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>