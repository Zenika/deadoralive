<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function start() {
        dispatch('start');
    }
</script>

<style>
    .rules {
        text-align: center;
    }
</style>

<div class="rules">
    <h2>Rules</h2>
    <p>You have 6.66 seconds to guess if a rockstar is dead or alive.</p>
    <p>For the first 3.33 seconds you have only the rockstar's picture, then you also have her/his name.</p>
    <p>The faster you go, the more points you earn.</p>
    <p>The longer your good answers streak, the more points you earn.</p>
    <p><button on:click={start}>OK, let's rock!</button></p>
</div>
