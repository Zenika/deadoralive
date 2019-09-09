<script>
    import Rules from './Rules.svelte'

    export let game;
    export let rockstars;

    let rockstar;
</script>

<style>
    .header {
        display: flex;
        padding: .5em 1em;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;
    }

    .game {
        flex-grow: 1;
    }
</style>

<div class="header">
    <div>Player: {game.player.name}</div>
    <div>Score: {game.score}</div>
</div>

<div class="game">
    {#if rockstar}
        TODO
    {:else}
        <Rules on:start={() => rockstar = {}} />
    {/if}
</div>
