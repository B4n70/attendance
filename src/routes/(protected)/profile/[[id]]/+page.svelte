<script lang="ts">
    import type { PageData } from './$types';
    import QrCode from "svelte-qrcode"

    import {page} from '$app/stores'
	export let data: PageData

    
</script>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<h1>Profile for {data.nUser.fname} {data.nUser.surname}  </h1>

{#if data.nUser}
	<!-- <p>Profile {data.nUser.username}</p> --->
	<p>First Name: {data.nUser.fname}</p>
	<p>Surname: {data.nUser.surname}</p>
	<p>Student year: {data.nUser.student_year}</p>

	<p>Student number: {data.nUser.student_number}</p>

	<p>Photo: <img src="/uploads/{data.nUser.avatar}" width="400" alt="avatar" /> </p>

	<br />
	<div class="container">
		<QrCode value="{data.nUser.student_number}" /> 
    </div>
{/if}

