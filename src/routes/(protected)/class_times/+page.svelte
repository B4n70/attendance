<script>
	import { time_ranges_to_array } from "svelte/internal"


	export let data

</script>
<!-- <pre>{JSON.stringify(data, null, 2)}</pre>-->
<div class="container">
	<div class="row">
		<div class="col-sm">
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

				<div class="inlineForm">
					<label for="startDate">Start Date</label>
					<input id="startDate" name="startDate" type="date" required />
				</div>
				<div class="inlineForm">
					<label for="endDate">End Date</label>
					<input id="endDate" name="endDate" type="date" required />
				</div>

				<div>
					<label for="repeating">repeating</label>
					<select name="repeating" id="repeating" required>
						<!-- <option value="none">none</option> -->
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="biweekly">BiWeekly</option>
						<!-- <option value="monthly">monthly</option>  -->
					</select>
				</div>
				<button type="submit">Add Class Time</button>
			</form>
		</div>

		<div class="col-sm">
			<table>
				<tr><th>Class</th><th>Start Time</th><th>End Time</th><th>Repeating</th></tr>
			{#if data.user}
			{#each data.classes as tclass}
				<tr>
					<td>{tclass.description}</td>
					<td>{tclass.startTime.toISOString().split('T')[1].substring(0,5)}</td>
					<td>{tclass.endTime.toISOString().split('T')[1].substring(0,5)}</td>
					<td>{tclass.repeating}</td>
				</tr>
			{/each}
			
			{/if}
			</table>
		</div>
	</div>
</div>

<style>
	.sform{
		width: 100%
	}

	.inlineForm {
		float: left;
		width: 30%;

	}

	select{
	text-transform: none;
    float: left;
    display: block;
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
