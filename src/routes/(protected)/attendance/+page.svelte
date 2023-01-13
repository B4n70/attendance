<script lang="ts">
	import { page } from '$app/stores'
	import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'
	import { enhance } from '$app/forms'



	import type { ActionData, PageServerData } from './$types'
	export let form: ActionData
	export let data:PageServerData

	
	let scanning = false

let html5Qrcode
let scanvalue

let startTime = ''
let endTime = ''
let classAttName = ''

if (data.classes.length > 0){
	startTime = data.classes[0].startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
	endTime = data.classes[0].endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
	classAttName = data.classes[0].description
}

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


function onScanSuccess(decodedText, decodedResult) {
	alert(`Code matched = ${decodedText}`)
	scanvalue = decodedText    
}

function onScanFailure(error) {
	console.warn(`Code scan error = ${error}`)
}
const unixTime = date => Math.floor(date / 1000)


</script>


<pre>{JSON.stringify(data, null, 2)}</pre> 

{#if classAttName != ''}
	<h1>Attendance for <b>{classAttName}</b></h1>

	class times from {startTime} - class times from {endTime}
	<br />



	{#if data.user}
		<main>
			<reader id="reader"/>
			{#if scanning}
				<button on:click={stop}>stop</button>
			{:else}
				<button on:click={start}>start</button>
			{/if}
		</main>

		<form action="?/attendance" method="POST" use:enhance >
			<div>
				<label for="student_number">student number</label>
				<input bind:value={scanvalue} id="student_number" name="student_number" type="text" required />
				<input bind:value={classAttName} id="className" name="className" type="text" required />

			</div>

			<button type="submit">Send</button>
		</form>	





	{/if}

{/if}

{#if classAttName === ''}
Class attendance will start in ...

{unixTime(data.nextClass[0].startTime) - unixTime(new Date()) - 978307200}
<pre>{JSON.stringify(data, null, 2)}</pre>
{/if}

{#if data.user.role === 'ADMIN'}
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
        width: 100%;
        min-height: 500px;
        background-color: black;
    }

	</style>