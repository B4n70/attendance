<script lang="ts">
    import type { PageData } from './$types';
    import QrScanner from 'qr-scanner'; // if installed via package and bundling with a module bundler like webpack or rollup


    export let data: PageData;


// To enforce the use of the new api with detailed scan results, call the constructor with an options object, see below.
const qrScanner = new QrScanner(
    videoElement,
    result => console.log('decoded qr code:', result),
    { /* your options or returnDetailedScanResult: true if you're not specifying any other options */ },
);

qrScanner.start();

</script>

<video autoplay="true" ></video>