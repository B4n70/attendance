<script>
	import { createTodoStore } from './todos.js';
	import TodoList from './TodoList.svelte';

	const todos = createTodoStore([
		{ done: true, description: '6pm first session' },
		{ done: true, description: '7pm Second Session' },
		{ done: true, description: '9pm Last Session' },
		{ done: false, description: '1st Semester Exams' },
		{ done: false, description: '2nd Semester Exams' },
		{ done: false, description: '3rd Semester Exams' },
		{ done: false, description: '4th Semester Exams' },

	]);
</script>

<div class="board">
	<input
		placeholder="Add Class Times?"
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				todos.add(e.currentTarget.value);
				e.currentTarget.value = '';
			}
		}}
	/>

	<div class="todo">
		<h2>Available</h2>
		<TodoList store={todos} filter={(t) => !t.done} />
	</div>

	<div class="done">
		<h2>Expected Classes</h2>
		<TodoList store={todos} filter={(t) => t.done} />
	</div>
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 1em;
		max-width: 36em;
		margin: 0 auto;
	}

	.board > input {
		font-size: 1.4em;
		grid-column: 1/3;
		border-radius: 5px;
		background: #f4f4f4;
		padding: 0.5em;
		border: none;
	}

	h2 {
		font-size: 2em;
		font-weight: 200;
	}

	.todo {
		--label: #222;
		--filter: drop-shadow(2px 3px 6px rgba(0,0,0,0.1));
	}

	.done {
		--label: #999;
		--filter: none;
	}
</style>
