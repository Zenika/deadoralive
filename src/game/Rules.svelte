<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let difficulty;

    function start() {
        dispatch('start');
    }
</script>

<style>
    .layer {
        background-color: rgba(0,0,0,0.4);
    }

    .rules {
        font-size: 1rem;
        width: 80%;
        z-index: 1;
    }

    button {
        margin-top: 1rem;
        padding: 2.4rem 4rem;
    }

    p {
        margin-bottom: 1rem;
    }

    p.hard {
        color: red;
    }
</style>

<div class="layer"></div>

<div class="rules">
    <p>You have 6.66 seconds to guess if a rockstar is dead or alive.</p>
    <p>For the first 3.33 seconds you have only the rockstar's picture, then you also have her/his name.</p>
    <p>The faster you go, the more points you earn.</p>
    <p>The longer your good answers streak, the more points you earn.</p>
    {#if difficulty === 'hard'}
        <p class="hard">Hard mode: Only the button's text is right, don't trust anything else!</p>
    {/if}
    <button on:click={start}>OK, let's rock!</button>
</div>
