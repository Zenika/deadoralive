<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import sample from 'lodash/sample';
    import shuffle from 'lodash/shuffle';
    import ProgressBar from "./ProgressBar.svelte";

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
    let answers = [false, true];
    let buttons;

    const buttonText = dead => {
        if (difficulty === 'hard') {
            return sample(
                dead ? [
                    'Dead',
                    'Not alive anymore',
                    'R.I.P.',
                    // FIXME add some more
                ] : [
                    'Alive',
                    'Still not dead',
                    'Still breathing',
                    // FIXME add some more
                ]
            );
        }
        return dead ? 'Dead' : 'Alive';
    };

    const buttonClass = dead => {
        if (difficulty === 'hard') return sample(['error', 'success']);
        return dead ? 'error' : 'success';
    };

    const buttonImage = dead => {
        if (difficulty === 'hard') return sample(['dead.png', 'alive.png']);
        return dead ? 'dead.png' : 'alive.png';
    };

    const buttonAnswer = i => {
        return () => answer(buttons[i]);
    };

    const clearAllTimeouts = () => {
        clearTimeout(timeout);
        clearTimeout(nameTimeout);
        clearInterval(timerInterval);
        clearTimeout(toolateTimeout);
    };

    onDestroy(clearAllTimeouts);

    $: if (rockstar) {
        if (difficulty === 'hard') answers = shuffle(answers);

        buttons = answers.map(dead => ({
            text: buttonText(dead),
            class: buttonClass(dead),
            image: buttonImage(dead),
        }));

        clearAllTimeouts();
        showName = false;
        toolate = false;
        timer = maxtime;

        timeout = setTimeout(() => {
            toolate = true;
            clearInterval(timerInterval);
            timer = 0;
        }, maxtime);
        toolateTimeout = setTimeout(() => dispatch('wrong'), maxtime + 1000);
        nameTimeout = setTimeout(() => { showName = true }, maxtime / 2);
        timerInterval = setInterval(() => { timer -= 50 }, 50);
    }

    const answer = (dead) => {
        if (!toolate) dispatch(dead === rockstar.dead ? 'right' : 'wrong', {timer});
    };

    const progressColor = () => {
        if (timer <= maxtime / 6) return "error";
        if (timer <= maxtime / 3 && timer >= maxtime / 6) return "warning";
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
        height: 300px;
        line-height: 1.4;
        justify-content: center;
        min-width: 33.5%
    }

    button > img {
        margin-bottom: 1rem;
        object-fit: contain;
    }

    figure {
        background-color: var(--dark);
        margin: 0;
        position: relative;
    }

    figure > img {
        height: 300px;
        object-fit: cover;
        object-position: top;
        width: 300px;
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
        height: 65px;
        padding: 1rem;
        opacity: 1;
        transition: all 1s;
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
    <button on:click={() => answer(answers[0])} class={buttons[0].class}>
        <img src={buttons[0].image} alt={buttons[0].text}>
        {buttons[0].text}
    </button>
    <figure>
        <img src={rockstar.image.src} alt="Rockstar picture">
        <figcaption class:active={showName}>{rockstar.name}</figcaption>
    </figure>
    <button on:click={() => answer(answers[1])} class={buttons[1].class}>
        <img src={buttons[1].image} alt={buttons[1].text}>
        {buttons[1].text}
    </button>
    {#if toolate}
        <span class="progress-error">Too late !</span>
    {/if}
    <ProgressBar {timer} {maxtime} error={toolate} />
</div>
