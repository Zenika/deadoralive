<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const newGame = () => ({
        player: {},
        score: 0,
        combo: 0,
        bestcombo: 0,
    });

    let game = newGame();

    function createNewGame() {
        dispatch('newGame', game);
        game = newGame();
    }
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
    }

    input {
        width: 520px;
        height: 56px;
        border: 2px solid #ffffff;
        background-color: #000000;
        box-sizing: border-box;
        font-family: 'Press Start 2P';
        color: #999999;
        text-align: center;
    }

    .buttons {
        display: flex;
        margin-top: 50px;
        justify-content: space-between;
    }

    button {
        margin-top: 50px;
        width: 250px;
        height: 112px;
        box-sizing: border-box;
        font-family: 'Press Start 2P';
        color: #ffffff;
        text-align: center;
        line-height: 32px;
    }

    button.normal {
        border: 4px solid #ffffff;
        background-color: #004000;
    }
    button.hard {
        border: 4px solid #ffffff;
        background-color: #400000;
    }
</style>

<form on:submit|preventDefault={createNewGame}>
    <input type="text" placeholder="Name" required bind:value={game.player.name}>
    <input type="email" placeholder="Email address" required bind:value={game.player.email}>
    <div class="buttons">
        <button type="submit" class="normal" on:click={() => game.difficulty = 'normal'}>Normal Game</button>
        <button type="submit" class="hard" on:click={() => game.difficulty = 'hard'}>Hard Game</button>
    </div>
</form>
