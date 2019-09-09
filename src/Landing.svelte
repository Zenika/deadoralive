<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let game = { player: {} };
    
    function createNewGame(e) {
        dispatch('newGame', game);
        game = { player: {} };
    }
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
    }
</style>

<form on:submit|preventDefault={createNewGame}>
    <input type="text" placeholder="Name" required bind:value={game.player.name}>
    <input type="email" placeholder="Email address" required bind:value={game.player.email}>
    <select required bind:value={game.difficulty}>
        <option value="">Difficulty</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
    </select>
    <button type="submit">Start</button>
</form>
