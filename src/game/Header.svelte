<script>
    export let game;
</script>

<style>
    .header {
        display: flex;
        padding: .5em 1em;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;
    }

    .player_name, .score {
        font-family: Art Dystopia;
        font-weight: normal;
    }
</style>

<div class="header">
    <div>Player: <span class="player_name">{game.player.name}</span></div>
    <div>Score: <span class="score">{game.score}</span></div>
    <div>Combo: <span class="score">{game.combo}</span></div>
</div>
