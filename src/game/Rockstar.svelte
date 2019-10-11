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
            shuffle(buttons);
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
        timerInterval = setInterval(() => { timer -= 50 }, 50);
    }

    const answer = (dead) => {
        if (!toolate) dispatch(dead === rockstar.dead ? 'right' : 'wrong', { timer });
    };
</script>

<style>
    .container {
        display: flex;
        width: 100%;
    }

    button {
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
        height: 30px;
        padding: 1rem;
        opacity: 1;
        transition: all 1s;
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
<!--    <p>-->
<!--    {#if toolate}-->
<!--        <div>Too late !</div>-->
<!--    {:else}-->
<!--        <progress value={maxtime - timer} max={maxtime}></progress>-->
<!--    {/if}-->
<!--        </p>-->
</div>
