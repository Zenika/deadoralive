<script>
    export let rockstar;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const answer = (dead) => {
        dispatch(dead === rockstar.dead ? 'right' : 'wrong');
    };
</script>

<style>
    .rockstar {
        text-align: center;
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        justify-content: space-evenly;
    }

    .rockstar > button {
        width: 200px;
    }
</style>

<div class="rockstar">
    <button on:click={() => answer(true)}>Dead</button>
    <div>
        <img src={rockstar.image} alt="Rockstar picture" height="400">
        <p>{rockstar.name}</p>
    </div>
    <button on:click={() => answer(false)}>Alive</button>
</div>