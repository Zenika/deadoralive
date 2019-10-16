<script>
    export let game;
</script>

<style>
    .score {
        display: flex;
        padding: 2rem 2rem 1.5rem;
        width: 100%;
    }

    .score > div {
        display: flex;
        flex-basis: 100%;
        flex-direction: column;
        justify-content: flex-end;
        text-transform: uppercase;
    }

    .score span {
        font-size: 1.6rem;
        margin-top: 2rem;
    }
</style>

<div class="score">
    <div>Combo<span>{game.combo}</span></div>
    <div>Score<span>{game.score}</span></div>
    <div><span>{game.player.name}</span></div>
</div>
