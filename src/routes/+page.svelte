<script lang="ts">
    import Game from "$lib/Game.svelte";
    import Preview from "$lib/Preview.svelte";
    
    let inGame = $state(false);
</script>

<div class="bg-animation"></div>
<div class="min-h-screen w-full max-w-4xl mx-auto p-4 select-none flex flex-col justify-center">
    <div class="mx-auto rounded-2xl shadow-xl shadow-[rgba(0,0,0,0.1)]">
        {#if inGame}
            <Game bind:inGame/>
        {:else}
            <Preview bind:inGame/>
        {/if}
    </div>
</div>