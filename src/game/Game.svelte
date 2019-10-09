<script>
    import shuffle from 'lodash/shuffle';
    import take from 'lodash/take';
    import Rules from './Rules.svelte';
    import Header from './Header.svelte';
    import Rockstar from './Rockstar.svelte';
    import Over from './Over.svelte';

    export let game;
    export let rockstars;
    let over = false;

    let gameRockstars;
    let rockstar;

    const next = () => {
        if (!gameRockstars.length) over = true;
        rockstar = gameRockstars.shift();
    };

    const start = () => {
        gameRockstars = take(shuffle(rockstars), 20);
        next();
    };

    const right = (evt) => {
        game.combo++;
        game.bestcombo = Math.max(game.combo, game.bestcombo);
        game.score += (evt.detail.timer / 10) + (game.combo * 100);
        next();
    };

    const wrong = () => {
        game.combo = 0;
        next();
    };
</script>

<style>
    .game {
        flex-grow: 1;
        width: 100%;
        box-sizing: border-box;
        padding: 0 1em;
    }
</style>

{#if over}
    <Over {game} on:clearGame />
{:else}
    <Header {game} />

    <div class="game">
        {#if rockstar}
            <Rockstar {rockstar} {game} on:right={right} on:wrong={wrong} />
        {:else}
            <Rules on:start={start} />
        {/if}
    </div>
{/if}


