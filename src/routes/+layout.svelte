<script lang="ts">
	import '../app.postcss'
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'

	import '../styles/app.css'

function navClick() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


</script>

<svelte:head>
	<title>CFCI Class Registration</title>
</svelte:head>


<nav class="topnav" id="myTopnav">
	<a href="/" class="active">Home</a>

	{#if !$page.data.user}
		<a href="/login">Login</a>
		<a href="/attendance">Attendance</a>

		<!-- <a href="/register">Register</a> -->
	{/if}

	{#if $page.data.user}
		<a href="/admin">Admin</a>
		<a href="/profile">Profile</a>
		<a href="/attendance">Attendance</a>

		<a href="/view_attendance">View Attendance</a>
		<a href="/class_times">Class Times</a>
		<a href="/add_user">Add User</a>
		<a href="/list_users">List Users</a>
		<a href="/logout">Logout</a>
	{/if}

	<div class="icon" on:keypress={() => navClick()}><i class="fa fa-bars">-></i></div>
</nav>
<br />
<main>
	<slot />
</main>

<style>

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #4cafe1;
  color: white;
}

.topnav .icon {
  display: block;
  font-size:30px;
  cursor: pointer;
}




</style>