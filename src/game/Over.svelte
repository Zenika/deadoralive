<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let game;

    const clearGame = () => dispatch('clearGame')
</script>

<style>
    .over {
        text-align: center;
    }
</style>

<div class="over">
    <h2>Game Over</h2>
    <p>
        Well done {game.player.name}, your score is {game.score}.
        <br>
        Your best combo is {game.bestcombo}.
        <br>
        You rock!
    </p>
    <p>
        <button on:click={clearGame}>New Game</button>
    </p>
</div>
