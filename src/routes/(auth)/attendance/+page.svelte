<script lang="ts">
	import { page } from '$app/stores'
	import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'
	import { enhance } from '$app/forms'

	import type { ActionData, PageServerData } from './$types'
	export let form: ActionData
	export let data:PageServerData

	
</script>

  <pre>{JSON.stringify(data, null, 2)}</pre>  
<!--
{#if classAttName != ''}
	{#if data.user}   -->
	



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