<script>
	import { onMount } from 'svelte';
	import wtf from 'wtf_wikipedia';
	import JSON5 from 'json5';
	import Title from './Title.svelte';
	import Loader from './Loader.svelte';
	import Landing from './Landing.svelte';
	import Game from './game';

	let rockstars = [];
	let game = null;
	// let game = { player: { name: "test" }, score: 0 };

	onMount(async () => {
		const fetchJSON = async (url) => {
			const res = await fetch(url);
			return JSON5.parse(await res.text());
		};

		const prefetchImage = url => new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = () => resolve(image);
			image.onerror = () => reject(Error('Error while prefetching image'));
			image.src = url;
		});

		const fetchRockstar = async (title) => {
			const doc = await wtf.fetch(title);
			if (!doc) throw Error(`Unknown wikipedia page "${title}"`);

			const infobox = doc.infobox(0);

			const name = infobox.get('name');

			const imageObj = doc.images(0);
			if (!imageObj) throw Error(`"${title}" wikipedia page has no image`);

			const image = await prefetchImage(imageObj.thumb());

			return {
				name: name ? name.text() : title,
				dead: Boolean(infobox.get('death_date')),
				image,
			};
		};

		rockstars = (async () => {
			const titles = await fetchJSON(`rockstars.json5`);
			return Promise.all(titles.map(fetchRockstar));
		})();
	});

	const clearGame = () => game = null;
</script>

<style>
	header {
		padding-top: 30px;
	}

	main {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-direction: column;
	}
</style>

<header>
	<Title />
</header>

<main>
	{#await rockstars}
		<Loader />
	{:then rockstars}
		{#if game}
			<Game {rockstars} {game} on:clearGame={clearGame} />
		{:else}
			<Landing on:newGame={event => game = event.detail} />
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</main>
