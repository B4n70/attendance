<script>
	export let data


</script>
<!-- <pre>{JSON.stringify(data, null, 2)}</pre>-->
<div class="board">

</div>

<form action="?/add_time" method="POST" use:enhance class="sform">
	<div class="inlineForm">
		<label for="description">Description</label>
		<input id="description" name="description" type="text" required />
	</div>

	<div class="inlineForm">
		<label for="startTime">Start Time</label>
		<input id="startTime" name="startTime" type="time" required />
	</div>

	<div class="inlineForm">
		<label for="endTime">End Time</label>
		<input id="endTime" name="endTime" type="time" required />
	</div>

	
	<button type="submit">Add Class Time</button>
</form>

<table>
	<tr><th>Class</th><th>Start Time</th><th>End Time</th></tr>
{#if data.user}
{#each data.classes as tclass}
	<tr><td>{tclass.description}</td><td>{tclass.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td><td>{tclass.endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td></tr>
{/each}

{/if}
</table>


<style>
	.sform{
		width: 100%
	}
	.inlineForm {
		float: left;
		width: 30%;

	}
</style>
