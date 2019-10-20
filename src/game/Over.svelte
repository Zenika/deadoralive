<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { isConnected, updatePlayer } from '../firebase';

    const dispatch = createEventDispatcher();

    export let game;

    let allowClearGame = false;

    onMount(async function() {
        if (isConnected()) {
            try {
                const { player, ...gameToSave } = game;
                allowClearGame = await updatePlayer({
                    ...player,
                    games: [
                        ...player.games,
                        gameToSave,
                    ]
                });
                allowClearGame = true;
            } catch (e) {
                console.error(e);
            }
        } else {
            allowClearGame = true;
        }
    });

    const clearGame = (keepPlayer) => dispatch('clearGame', { keepPlayer });
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
        margin-top: 1rem;
        width: 200px;
    }
    h2 {
        font-size: 3.5rem;
        font-weight: normal;
        margin-bottom: 3rem;
        margin-top: 0;
        text-transform: uppercase;
    }

    h3 {
        margin-top: 2em;
    }
</style>

<div class="layer"></div>

<div class="over">
    <h2>Game over</h2>
    <p>Well done {game.player.name || 'Player 1'} !</p>
    <p>Your score is {game.score}</p>
    <p>Your best combo is {game.bestcombo}</p>
    <p>You rock!</p>
    <h3>Play again ?</h3>
    <button on:click={() => clearGame(true)} disabled={!allowClearGame} class="success">Yes</button>
    <button on:click={() => clearGame(false)} disabled={!allowClearGame} class="error">No</button>
</div>
