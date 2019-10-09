<script>
    import { createEventDispatcher, onDestroy } from 'svelte';

    const dispatch = createEventDispatcher();

    export let rockstar;

    let maxtime = 6660;
    let timeout;
    let nameTimeout;
    let showName;
    let timer;
    let timerInterval;
    let toolate;
    let toolateTimeout;

    const clearAllTimeouts = () => {
        clearTimeout(timeout);
        clearTimeout(nameTimeout);
        clearInterval(timerInterval);
        clearTimeout(toolateTimeout);
    };

    onDestroy(clearAllTimeouts);

    $: if (rockstar) {
        clearAllTimeouts();
        showName = false;
        toolate = false;
        timer = maxtime;

        timeout = setTimeout(() => { toolate = true }, maxtime);
        toolateTimeout = setTimeout(() => dispatch('wrong'), maxtime + 1000);
        nameTimeout = setTimeout(() => { showName = true }, maxtime / 2);
        timerInterval = setInterval(() => { timer -= 50 }, 50);
    }

    const answer = (dead) => {
        if (!toolate) dispatch(dead === rockstar.dead ? 'right' : 'wrong', { timer });
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
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
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
        <p>
        {#if toolate}
            <div>Too late !</div>
        {:else}
            <progress value={maxtime - timer} max={maxtime}></progress>
        {/if}
        </p>
        <p><img src={rockstar.image.src} alt="Rockstar picture"></p>
        <p style="visibility: {showName ? 'visible' : 'hidden'}">{rockstar.name}</p>
    </div>
    <button on:click={() => answer(false)} class="alive">Alive</button>
</div>
