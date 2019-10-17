<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { isConnected, storeScore } from '../firebase';

    const dispatch = createEventDispatcher();

    export let game;

    let allowNewGame = false;

    onMount(async function() {
        if (isConnected()) {
            allowNewGame = await storeScore(game);
        } else {
            allowNewGame = true;
        }
    })

    const newGame = () => dispatch('clearGame')
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

    button {
        margin-top: 4rem;
    }
    h2 {
        font-size: 3.5rem;
        font-weight: normal;
        margin-bottom: 3rem;
        text-transform: uppercase;
    }
</style>

<div class="layer"></div>

<div class="over">
    <h2>Game over</h2>
    <p>Well done {game.player.name || 'Player 1'} !</p>
    <p>Your score is {game.score}</p>
    <p>Your best combo is {game.bestcombo}</p>
    <p>You rock!</p>
    {#if allowNewGame}
        <button on:click={newGame}>New Game</button>
    {/if}
</div>
