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
    .buttons {
        display: flex;
        margin-top: 2.5rem;
    }

    button:first-of-type {
        margin-right: 1rem;
    }

    form {
        display: flex;
        flex-direction: column;
        margin-top: 5rem;
        width: 50%;
    }

    form > input {
        background-color: var(--dark);
        border: 2px solid var(--light);
        color: var(--grey);
        font-family: var(--font);
        font-size: 1.2rem;
        height: 3.2rem;
        margin-bottom: 2.5rem;
        text-align: center;
        text-transform: uppercase;
    }

    form > input::placeholder {
        opacity: 1;
    }
</style>

<form on:submit|preventDefault={createNewGame}>
    <input type="text" placeholder="Your name" required bind:value={game.player.name}>
    <input type="email" placeholder="Your email address" required bind:value={game.player.email}>
    <span class="buttons">
        <button class="error" type="submit" on:click={() => game.difficulty = 'normal'}>Normal Game</button>
        <button class="success" type="submit" on:click={() => game.difficulty = 'hard'}>Hard Game</button>
    </span>
</form>
