<script>
    import { createEventDispatcher, onDestroy } from 'svelte';

    const dispatch = createEventDispatcher();

    export let rockstar;

    let timeout;
    let nameTimeout;
    let showName;
    let timer;
    let timerInterval;

    const clearAllTimeouts = () => {
        clearTimeout(timeout);
        clearTimeout(nameTimeout);
        clearInterval(timerInterval);
    };

    onDestroy(clearAllTimeouts);

    $: if (rockstar) {
        clearAllTimeouts();
        showName = false;
        timer = 6660;

        timeout = setTimeout(() => dispatch('wrong'), 6660);
        nameTimeout = setTimeout(() => { showName = true }, 3330);
        timerInterval = setInterval(() => { timer -= 50 }, 50);
    }

    const answer = (dead) => {
        dispatch(dead === rockstar.dead ? 'right' : 'wrong');
    };
</script>

<style>
    .container {
        text-align: center;
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        justify-content: space-evenly;
    }

    .rockstar {
        width: 40%;
    }

    .rockstar img {
        height: auto;
        width: 30vh;
    }

    .container > button {
        width: 25%;
        color: #ffffff;
    }

    button.dead {
        background-color: #520000;
    }

    button.alive {
        background-color: #273800;
    }
</style>

<div class="container">
    <button on:click={() => answer(true)} class="dead">Dead</button>
    <div class="rockstar">
        <p><progress value={6660 - timer} max="6660"></progress></p>
        <p><img src={rockstar.image.src} alt="Rockstar picture"></p>
        <p style="visibility: {showName ? 'visible' : 'hidden'}">{rockstar.name}</p>
    </div>
    <button on:click={() => answer(false)} class="alive">Alive</button>
</div>