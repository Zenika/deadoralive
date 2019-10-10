<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function start() {
        dispatch('start');
    }
</script>

<style>
    .rules {
        font-size: 1.3rem;
        width: 72%;
    }

    button {
        margin-top: 2rem;
        padding: 2.4rem 4rem;
    }

    p {
        margin-bottom: 2rem;
    }
</style>

<div class="rules">
    <p>You have 6.66 seconds to guess if a rockstar is dead or alive.</p>
    <p>For the first 3.33 seconds you have only the rockstar's picture, then you also have her/his name.</p>
    <p>The faster you go, the more points you earn.</p>
    <p>The longer your good answers streak, the more points you earn.</p>
    <button on:click={start}>OK, let's rock!</button>
</div>
