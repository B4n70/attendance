<script lang="ts">
    import type { PageData } from '../routes/(auth)/profile/[[id]]/$types';
    import QrCode from "svelte-qrcode"

    import {page} from '$app/stores'
	export let user

    
</script>

	<p>First Name: {user.fname}</p>
	<p>Surname: {user.surname}</p>
	<p>Email Address: {user.user_email}</p>
	<p>Student year: {user.student_year}</p>
	<p>Student number: {user.student_number}</p>
    <div style="max-width:400px">
		Photo: <img src="{user.avatar}" width="100%" alt="avatar" />
	</div>
	<br />
    <div style="max-width:400px">
		<QrCode value="{user.student_number}"  />
	</div>