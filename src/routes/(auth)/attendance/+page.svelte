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
	//startTime = data.classes[0].startTime.toLocaleTimeString().substring(0, 5)
	startTime = data.classes[0].startTime.toISOString().split('T')[1].substring(0, 5)
	//endTime = data.classes[0].endTime.toLocaleTimeString().substring(0, 5)
	endTime = data.classes[0].endTime.toISOString().split('T')[1].substring(0, 5)

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
	alert(`Code matched = ${decodedText}`)
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
	
	const d = new Date()
	const today = new Date(d.getTime() - d.getTimezoneOffset()*60000);
	let theTime = ''
	theTime = today.toISOString().split('T')[1].substring(0, 5)

	let nextClassTime
	let NextClassIn = ''
	let tdate = ''

	//setInterval(() => {
		//redirect(303, '/attendance')
	//}, 1000)

if(data?.nextClass[0]?.startTime){
	//nextClassTime = data.nextClass[0].startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
	nextClassTime = data.nextClass[0].startTime.toISOString().split('T')[1].substring(0, 5)
    NextClassIn = hoursToNextClass(nextClassTime, theTime)
}
  	tdate = today.toISOString().split('T')[0];
    
 
</script>

  <pre>{JSON.stringify(data, null, 2)}</pre>  
<!--
{#if classAttName != ''}
	{#if data.user}   -->
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
				<!-- <label for="student_number">student number</label> -->
				<input bind:value={scanvalue} id="student_number" name="student_number" type="hidden" required />
				<!-- <input bind:value={classAttName} id="className" name="className" type="text" required />
				<input bind:value={startTime} id="startTime" name="startTime" type="text" required />
				<input bind:value={endTime} id="endTime" name="endTime" type="text" required />
				<button type="submit">Send</button>
				 -->
			</div>
		
		</form>	

		<h1>Attendance for <b>{classAttName}</b></h1>

		class times from {startTime} - class times from {endTime}
		<br />
<!-- 
	{/if}

{/if}
-->
{#if form?.retUser}
	<div id="overlay">
		<div class="innerModal">
			<div class="width50">
				<h2>User Details</h2>

				<img src="{form?.retUser.avatar}" width="80%" alt="avatar" /> <br />
				Name: {form?.retUser.fname}  {form?.retUser.surname} <br />
				Student Number: {form?.retUser.student_number}<br />
				Student year: {form?.retUser.student_year} <br />
		    </div> 	

			<div class="width50">
                <h3>Clock: {theTime} - {tdate} </h3> <br />
				<h2>Class Details</h2>
                <br />
				{#each form?.className as cn, i}
				    <hr />
					Class: {cn} <br />
					Signed: {form?.InOrOut[i]} <br />
					{#if form?.InOrOut[i] == 'In'}
					    {#if form?.InOrOut[i-1] == 'Out'}
						Time: {endTime} <br />
						{:else}
						Time: {startTime} <br />
						{/if}
						Date: {tdate} <br />
					{/if}
					{#if form?.InOrOut[i] == 'Out'}
						Time: {endTime} <br />
						Date: {tdate} <br />
					{/if}
					<hr />
				{/each}
			</div> 	
			<div class="clear"></div>
            <div id="disclaimer">if the above dates and times are not correct, please report this to administration</div>
		</div>
	</div>

<script>
	setTimeout(function(){
	document.getElementById("overlay").style.display = "none";
	location.reload();
	},20000);
</script>

{/if}

{#if classAttName === ''}
Class attendance will start ...

{NextClassIn}

{/if}



<style>
	h2{font-size: 26px;
		font-weight: 300;}
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}
    reader {
        width: 100%;
        min-height: 100px;
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
		width:80%;
		min-height:300px;
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
	.width50{
		width:47%;
		float:left;
		padding:1%;
	}
	hr{height:2px;border-width:0;color:gray;background-color:gray}
    #disclaimer{
		width:100%; text-align:center; color:red;font-style: italic; font-size:14px;
	}
	.clear{clear:both;height:1px;}

	</style>