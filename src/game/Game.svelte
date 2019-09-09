<script>
    import shuffle from 'lodash/shuffle';
    import Rules from './Rules.svelte';
    import Header from './Header.svelte';
    import Rockstar from './Rockstar.svelte'

    export let game;
    export let rockstars;
    let over = false;

    let gameRockstars;
    let rockstar;

    function start() {
        gameRockstars = shuffle(rockstars);
        next();
    }

    function next() {
        if (!gameRockstars.length) over = true;

        rockstar = gameRockstars.shift();
    }
</script>

<style>
    .game {
        flex-grow: 1;
    }
</style>

{#if over}
    <h2>GAME OVER</h2>
{:else}
    <Header {game} />

    <div class="game">
        {#if rockstar}
            <Rockstar {rockstar} />
        {:else}
            <Rules on:start={start} />
        {/if}
    </div>
{/if}


