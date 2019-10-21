<script>
	import rockstars from './rockstars'
</script>

{#await rockstars}
	<p class="loader">Loading rockstars...</p>
{:then rockstars}
	{#each rockstars as rockstar}
    <p><img src={rockstar.image.src} alt="Rockstar picture"> {rockstar.name} {rockstar.dead ? 'Dead' : 'Alive'}</p>
    {/each}
{:catch error}
	<p class="error">{error.message}</p>
{/await}