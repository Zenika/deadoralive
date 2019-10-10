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
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 30px;
    }

    button {
        margin-top: 48px;
        width: 520px;
        height: 112px;
        border: 4px solid #ffffff;
        background-color: #333333;
        box-sizing: border-box;
        font-family: 'Press Start 2P';
        color: #ffffff;
        text-align: center;
        line-height: 32px;
        padding: 0 125px;
        font-size: 0.6em;
    }
</style>

<div class="rules">
    <div>
        <p>You have 6.66 seconds to guess if a rockstar is dead or alive.</p>
        <p>For the first 3.33 seconds you have only the rockstar's picture, then you also have her/his name.</p>
        <p>The faster you go, the more points you earn.</p>
        <p>The longer your good answers streak, the more points you earn.</p>
        <p><button on:click={start}>OK, let's rock!</button></p>
    </div>
</div>
