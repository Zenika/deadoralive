<script>
	import { onMount } from 'svelte';
	import wtf from 'wtf_wikipedia';
	import Title from './Title.svelte';
	import Loader from './Loader.svelte';
	import Landing from './Landing.svelte';
	import Game from './game';

	let rockstars = [];
	let game = null;

	onMount(async () => {
		const fetchJSON = async (url) => {
			const res = await fetch(url);
			return res.json();
		};

		const prefetchImage = url => new Promise((resolve, reject) => {
			var preloadLink = document.createElement('link');
			preloadLink.rel = 'preload';
			preloadLink.as = 'image';
			preloadLink.href = url;
			preloadLink.onload = resolve;
			preloadLink.onerror = () => reject(Error('Error while prefetching image'));
			document.head.appendChild(preloadLink);
		});

		const fetchRockstar = async (title) => {
			const doc = await wtf.fetch(title);
			const infobox = doc.infobox(0);
			const image = doc.images(0).thumb();
			await prefetchImage(image);
			return {
				name: infobox.get('name').text(),
				dead: Boolean(infobox.get('death_date')),
				image,
			};
		};

		rockstars = (async () => {
			const titles = await fetchJSON(`rockstars.json`);
			return Promise.all(titles.map(fetchRockstar));
		})();
	});
</script>

<style>
	header {
		padding-top: 60px;
	}

	main {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
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
			<Game {rockstars} {game} />
		{:else}
			<Landing on:newGame={event => game = event.detail} />
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</main>
