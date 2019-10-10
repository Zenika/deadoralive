<script>
	import { onMount } from 'svelte'
	import wtf from 'wtf_wikipedia'
	import Header from './Header.svelte'
	import Landing from './Landing.svelte'
	import Game from './game'
	import titles from './rockstars'

	let rockstars = []
	// let game = null
	let game = { player: { name: "test" }, score: 0 };

	onMount(async () => {
		const prefetchImage = url => new Promise((resolve, reject) => {
			const image = new Image()
			image.onload = () => resolve(image)
			image.onerror = () => reject(Error('Error while prefetching image'))
			image.src = url
		})

		const fetchRockstar = async (title) => {
			const doc = await wtf.fetch(title)
			if (!doc) throw Error(`Unknown wikipedia page "${title}"`)

			const infobox = doc.infobox(0)

			const name = infobox.get('name')

			const imageObj = doc.images(0)
			if (!imageObj) throw Error(`"${title}" wikipedia page has no image`)

			const image = await prefetchImage(imageObj.thumb())

			return {
				name: name ? name.text() : title,
				dead: Boolean(infobox.get('death_date')),
				image,
			}
		}

		rockstars = Promise.all(titles.map(fetchRockstar))
	})

	const clearGame = () => game = null
</script>

<Header />

<main>
	{#await rockstars}
		<p class="loader">Loading rockstars...</p>
	{:then rockstars}
		{#if game}
			<Game {rockstars} {game} on:clearGame={clearGame} />
		{:else}
			<Landing on:newGame={event => game = event.detail} />
		{/if}
	{:catch error}
		<p class="error">{error.message}</p>
	{/await}
</main>
