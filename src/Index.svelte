<script>
	import Landing from './Landing.svelte'
	import Game from './game'
	import rockstars from './rockstars'

	let game = null
	let player = null

	const clearGame = ({ detail: { keepPlayer } }) => {
		player = keepPlayer ? game.player : null;
		game = null;
	}
</script>

{#await rockstars}
	<p class="loader">Loading rockstars...</p>
{:then rockstars}
	{#if game}
		<Game {rockstars} {game} on:clearGame={clearGame} />
	{:else}
		<Landing on:newGame={event => game = event.detail} {player} />
	{/if}
{:catch error}
	<p class="error">{error.message}</p>
{/await}
