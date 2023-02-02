<script lang="ts">
  import StudentCard from '../../../../component/StudentCard.svelte';

    import type { PageData } from './$types';
    import QrCode from "svelte-qrcode"

    import {page} from '$app/stores'
	export let data: PageData

    
</script>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<h1>Profile for {data.nUser.fname} {data.nUser.surname}  </h1>
<br />
<StudentCard user={data.nUser}></StudentCard>