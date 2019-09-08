<script>
	import { onMount } from 'svelte';
	import wtf from 'wtf_wikipedia';
	import shuffle from 'lodash/shuffle';

	let rockstars = [];

	onMount(async () => {
		const fetchJSON = async (url) => {
			const res = await fetch(url);
			return res.json();
		}

		rockstars = (async () => {
			const titles = shuffle(await fetchJSON(`rockstars.json`));
			const docs = await Promise.all(titles.map(title => wtf.fetch(title)));
			return docs
				.map(doc => ({
					infobox: doc.infobox(0),
					image: doc.images(0),
				}))
				.map(({ infobox, image }) => ({
					name: infobox.get('name').text(),
					dead: Boolean(infobox.get('death_date')),
					image: image.thumb(),
				}));
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
