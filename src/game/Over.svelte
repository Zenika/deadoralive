<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { storeScore } from '../firebase';

    const dispatch = createEventDispatcher();

    export let game;

    let scoreSaved = false;

    onMount(async function() {
        scoreSaved = await storeScore(game);
    })

    const clearGame = () => dispatch('clearGame')
</script>

<style>
    .layer {
        background-color: rgba(0,0,0,0.4);
    }

    .over {
        z-index: 1;
    }

    p {
        margin-bottom: 2rem;
        text-align: center;
    }
</style>

<div class="layer"></div>

<div class="over">
    <p>Well done {game.player.name} !</p>
    <p>Your score is {game.score}</p>
    <p>Your best combo is {game.bestcombo}</p>
    <p>You rock!</p>
    {#if scoreSaved}
        <button on:click={clearGame}>New Game</button>
    {/if}
</div>
