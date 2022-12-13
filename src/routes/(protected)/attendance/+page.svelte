<script lang="ts">
	import { page } from '$app/stores'
	import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'
	import { enhance } from '$app/forms'

	import type { ActionData } from './$types'
	export let form: ActionData

	let scanning = false

let html5Qrcode

onMount(init)

function init() {
	html5Qrcode = new Html5Qrcode('reader')
}

function start() {
	html5Qrcode.start(
		{ facingMode: 'environment' },
		{
			fps: 10,
			qrbox: { width: 600, height: 600 },
		},
		onScanSuccess,
		onScanFailure
	)
	scanning = true
}

async function stop() {
	await html5Qrcode.stop()
	scanning = false
}

let value


function onScanSuccess(decodedText, decodedResult) {
	alert(`Code matched = ${decodedText}`)
	value = decodedText
    
}

function onScanFailure(error) {
	console.warn(`Code scan error = ${error}`)
}
</script>



<h1>Attendance</h1>

{#if $page.data.user}
    <main>
		<reader id="reader"/>
		{#if scanning}
			<button on:click={stop}>stop</button>
		{:else}
			<button on:click={start}>start</button>
		{/if}
	</main>

	<form action="?/attendance" method="POST" use:enhance>
		<div>
			<label for="student_number">student number</label>
			<input bind:value id="student_number" name="student_number" type="text" required />
		</div>

		<button type="submit">Send</button>
	</form>	





{/if}

{#if $page.data.user.role === 'ADMIN'}
	<form action="/logout" method="POST">
		<button type="submit">Log out</button>
	</form>
{/if}


<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}
	reader {
		width: 700px;
		min-height: 700px;
		background-color: black;
	}
	</style>