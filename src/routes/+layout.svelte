<script lang="ts">
	import "./global.css";
	import favicon from "../assets/favicon.svg";
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}