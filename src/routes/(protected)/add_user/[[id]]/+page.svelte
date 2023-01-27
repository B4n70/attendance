<script lang="ts">
	import { enhance } from '$app/forms'
    import type { ActionData, PageData } from '../$types';
    import {page} from '$app/stores'

	//export let data: PageData;
    export let form: ActionData;
    let pending = false;
    $: pending = form?.pending ?? false;
  
	export let data: PageData

	let selectAvatarVal = ''
	let avatarVal = '/uploads/avatar.png'
/*
	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};
	*/

	const convertBase64 = (file, quality) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onloadend = () => {
			const img = new Image();
			img.src = fileReader.result;
			console.log('starting  image')
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");

			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			ctx.scale(quality, quality);

			//ctx.drawImage(img, 0, 0);
			var newImg = canvas.toDataURL("image/jpeg", quality);
			console.log('stopping  image')
			//var newImg = img.src
			//console.log(newImg)
			resolve(newImg);
		};
		fileReader.onerror = (error) => {
			console.dir('1 2 3, '+error)

			reject(error);
		};
	});
};
	
	const uploadImage = async (event) => {
		const file = event.target.files[0];
		const base64 = await convertBase64(file, 0.1);
		avatarVal = base64;
	};

</script>
<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<h1>Add User</h1>


{#if form?.user}
<p class="error">User with student number/name is already registered.</p>
{/if}

<!--
<div class="container">
	
	<form method="POST" enctype="multipart/form-data" use:enhance on:submit={() => (pending = true)}>
		
		
		{#if data?.nUser?.avatar}
			<img src="/uploads/{data?.nUser?.avatar}" width="200" alt="avatar" />
			<input id="avatar" name="avatar" type="text" value="{data?.nUser?.avatar}" /> <br />
		{/if}

		<input id="avatarFile" name="avatarFile" type="file" accept=".png,.jpg" />
		<button formaction="?/upload_photo">Upload Photo</button>

		{#if pending}
		<div class="bg-sky-100 px-3 py-2 text-emerald-900">Uploading</div>
		{/if}
		{#if form?.ok}
		<div class="bg-emerald-100 px-3 py-2 text-emerald-900">Successfully uploaded</div>
		<img src="/uploads/{form.filename}" width="200" alt="avatar" />

		{:else if form?.notok}
		<div class="bg-rose-100 px-3 py-2 text-rose-900">Error with upload</div>
		{/if}

	</form>
</div>
-->
<form action="?/add_user" method="POST" use:enhance on:submit={() => (pending = true)}>
	<input class="form-control form-control-lg" id="selectAvatar" value="{selectAvatarVal}" type="file" on:change={(x) => uploadImage(x)}	/>
	<img class="img" src="{avatarVal}" id="avatarImage" alt="avatar" />
	<input id="avatar" name="avatar" type="text" value="{avatarVal}" />
	
	<div>
		<label for="fname">First Name</label>
		<input id="fname" name="fname" type="text" value="{data?.nUser?.fname ?? ''}" required />
	</div>

	<div>
		<label for="surname">Surname</label>
		<input id="surname" name="surname" type="text" value="{data?.nUser?.surname ?? ''}" required />
	</div>
	

	<div>
		<label for="student_number">student_number</label>
		<input id="student_number" name="student_number" type="number" value="{data?.nUser?.student_number ?? ''}" required />
	</div>
	<div>
		<label for="student_year">student year</label>
		<select name="student_year" id="student_year" value="{data?.nUser?.student_year ?? ''}" required>
			<option value="First Year">First Year</option>
			<option value="Second Year">Second Year</option>
			<option value="Third Year">Third Year</option>
			<option value="Honours">Honours</option>
		  </select>
	</div>


		
	<button type="submit">Add</button>
</form>


<style>

	select{
		text-transform: none;
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
		padding: 9px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
</style>