<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import shuffle from 'lodash/shuffle';

    const dispatch = createEventDispatcher();

    export let rockstar;
    export let difficulty;

    let maxtime = 6660;
    let timeout;
    let nameTimeout;
    let showName;
    let timer;
    let timerInterval;
    let toolate;
    let toolateTimeout;
    let buttons = [
        {
            value: false,
            class: "success",
            text: "Alive",
        },
        {
            value: true,
            class: "error",
            text: "Dead",
        },
        {
            value: true,
            class: "success",
            text: "Dead",
        },
        {
            value: false,
            class: "error",
            text: "Alive",
        },
        {
            value: false,
            class: "success",
            text: "Still not dead",
        },
        {
            value: true,
            class: "error",
            text: "Not alive anymore",
        },
        {
            value: false,
            class: "error",
            text: "Still not dead",
        },
        {
            value: true,
            class: "success",
            text: "Not alive anymore",
        },
    ];
    let buttonFirst = buttons[0];
    let buttonSecond = buttons[1];
    const clearAllTimeouts = () => {
        clearTimeout(timeout);
        clearTimeout(nameTimeout);
        clearInterval(timerInterval);
        clearTimeout(toolateTimeout);
    };

    onDestroy(clearAllTimeouts);

    $: if (rockstar) {
        if (difficulty === 'hard') {
            buttons = shuffle(buttons);
            buttonFirst = buttons.find(b => b.value === buttons[0].value);
            buttonSecond = buttons.find(b => b.value !== buttons[0].value);
        }
        clearAllTimeouts();
        showName = false;
        toolate = false;
        timer = maxtime;

        timeout = setTimeout(() => { toolate = true }, maxtime);
        toolateTimeout = setTimeout(() => dispatch('wrong'), maxtime + 1000);
        nameTimeout = setTimeout(() => { showName = true }, maxtime / 2);
        timerInterval = setInterval(() => { timer -= maxtime / 6 }, maxtime / 6);
    }

    const answer = (dead) => {
        if (!toolate) dispatch(dead === rockstar.dead ? 'right' : 'wrong', { timer });
    };

    const progressColor = () => {
        if (timer <= maxtime / 6) return "error"
        if (timer <= maxtime / 3 && timer >= maxtime / 6) return "warning"
    }
</script>

<style>
    .container {
        display: flex;
        width: 100%;
    }

    button {
        align-items: center;
        border: 0;
        display: flex;
        flex: 1;
        flex-basis: auto;
        flex-direction: column;
        justify-content: center;
    }

    button > img {
        margin-bottom: 2rem;
        object-fit: contain;
    }

    figure {
        margin: 0;
        position: relative;
    }

    figure > img {
        height: 400px;
        object-fit: cover;
        object-position: top;
        width: 400px;
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
    }

    figcaption {
        background: rgba(0,0,0,0.5);
        font-size: 20px;
        height: 0;
        position: absolute;
        left: 0;
        right: 0;
        opacity: 0;
        text-transform: uppercase;
        top: 0;
    }

    figcaption.active {
        height: 50px;
        padding: 1rem;
        opacity: 1;
        transition: all 1s;
    }

    progress {
        background-color: transparent;
        border: 0;
        position: absolute;
        bottom: 0;
        width: 100%;
        -webkit-appearance: none;
    }

    progress::-webkit-progress-bar {
        background-color: transparent;
    }

    progress::-webkit-progress-value,
    progress::-moz-progress-bar {
        background-color: #007f00;
    }

    progress.error::-webkit-progress-value,
    progress.error::-moz-progress-bar {
        background-color: #7f0000;
    }

    progress.warning::-webkit-progress-value,
    progress.warning::-moz-progress-bar {
        background-color: #ff6c23;
    }

    .progress-error {
        font-size: 18px;
        position: absolute;
        bottom: 0;
        right: 5px;
        z-index: 1;
    }
</style>

<div class="container">
    <button on:click={() => answer(buttonFirst.value)} class="{buttonFirst.class}">
        <img src="dead.png" alt="Dead">
        {buttonFirst.text}
    </button>
    <figure>
        <img src={rockstar.image.src} alt="Rockstar picture">
        <figcaption class:active={showName}>{rockstar.name}</figcaption>
    </figure>
    <button on:click={() => answer(buttonSecond.value)} class="{buttonSecond.class}">
        <img src="alive.png" alt="Alive">
        {buttonSecond.text}
    </button>
    {#if toolate}
        <span class="progress-error">Too late !</span>
        <progress class="error" value={maxtime - timer} max={maxtime}></progress>
    {:else}
        <progress class={progressColor} value={maxtime - timer} max={maxtime}></progress>
    {/if}
</div>
