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

    .player_name, .score {
        font-family: Art Dystopia;
        font-weight: normal;
    }
</style>

<div class="header">
    <div>Player: <span class="player_name">{game.player.name}</span></div>
    <div>Score: <span class="score">{game.score}</span></div>
</div>

<div class="game">
    {#if rockstar}
        TODO
    {:else}
        <Rules on:start={() => rockstar = {}} />
    {/if}
</div>
