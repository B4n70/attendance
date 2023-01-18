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
	start()
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
	//alert(`Code matched = ${decodedText}`)
	scanvalue = decodedText    

	setTimeout(function(){
		document.getElementById("submitAttendance").submit();
	},500);

}

function onScanFailure(error) {
	console.warn(`Code scan error = ${error}`)
}

const hoursToNextClass = (nextClassTime, time) => {
	        var relative = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
	        const nextClass = Date.parse(`2001-01-01T${nextClassTime}`);
	        const current = Date.parse(`2001-01-01T${time}`);
	        let result = (nextClass - current) / 1000 / 60; // Minutes
	        return relative.format(result, 'minutes');
	    };
	
	let today = new Date();
	let theTime
	let nextClassTime
	let NextClassIn

	//setInterval(() => {
		//redirect(303, '/attendance')
	//}, 1000)
	
	theTime = today.toLocaleTimeString().substring(0, 5);
	nextClassTime = data.nextClass[0].startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
	NextClassIn = hoursToNextClass(nextClassTime, theTime)
 

</script>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

{#if classAttName != ''}
	<h1>Attendance for <b>{classAttName}</b></h1>

	class times from {startTime} - class times from {endTime}
	<br />

	{#if data.user}
		<main>
			<reader id="reader"/>
			<!--
			{#if scanning}
				<button on:click={stop}>stop</button>
			{:else}
				<button on:click={start}>start</button>
			{/if}

			-->
		</main>

		<form action="?/attendance" id="submitAttendance" method="POST" use:enhance >
			<div>
				<label for="student_number">student number</label>
				<input bind:value={scanvalue} id="student_number" name="student_number" type="text" required />
				<input bind:value={classAttName} id="className" name="className" type="text" required />
				<input bind:value={startTime} id="startTime" name="startTime" type="text" required />
				<input bind:value={endTime} id="endTime" name="endTime" type="text" required />

			</div>

			<button type="submit">Send</button>
		</form>	


        


	{/if}

{/if}


{#if form?.signInName}
	<div id="overlay">
		<div class="innerModal">
			{form?.signInName}, class {form?.className} just signed {form?.InOrOut} 
		</div>
	</div>
<script>
	setTimeout(function(){
	document.getElementById("overlay").style.display = "none";
	location.reload();
	},1500);
</script>

{/if}

{#if classAttName === ''}
Class attendance will start ...

{NextClassIn}

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
	#overlay{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2000px;
		background: rgba(0, 0, 0, 0.5);
	}

	.innerModal{
		width:50%;
		height:200px;
		border: solid 1px #555;
		background-color: #eee;
		box-shadow: 10px -10px 5px  rgba(0,0,0,0.6);
		-moz-box-shadow: 10px -10px 5px  rgba(0,0,0,0.6);
		-webkit-box-shadow: 10px -10px 5px  rgba(0,0,0,0.6);
		-o-box-shadow: 10px -10px 5px  rgba(0,0,0,0.6);
		border-radius:10px;
		margin: 200px auto;
		padding: 20px;
		color:#000;
	}

	</style>