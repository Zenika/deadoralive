<script>
	import { onMount } from 'svelte';
	import wtf from 'wtf_wikipedia';
	import shuffle from 'lodash/shuffle';

	let rockstars = [];

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
			const titles = shuffle(await fetchJSON(`rockstars.json`));
			return Promise.all(titles.map(fetchRockstar));
		})();
	});
</script>

<h1>Dead or Alive</h1>
{#await rockstars}
	Loading rockstars...
{:then rockstars}
	<ul>
		{#each rockstars as rockstar}
			<li><img src={rockstar.image} alt={rockstar.name}> {rockstar.name} is {rockstar.dead ? 'dead' : 'alive'}</li>
		{/each}
	</ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
