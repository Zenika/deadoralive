<script>
    export let game;
</script>

<style>
    .score {
        display: flex;
        padding: 2rem;
        width: 80%;
    }

    .score > div {
        display: flex;
        flex-basis: 100%;
        flex-direction: column;
        text-transform: uppercase;
    }

    .score span {
        font-size: 1.6rem;
        margin-top: 2rem;
    }
</style>

<div class="score">
    <div>Player<span>{game.player.name}</span></div>
    <div>Score<span>{game.score}</span></div>
    <div>Combo<span>{game.combo}</span></div>
</div>
