<script>
    import { onMount } from 'svelte';
    import capitalize from 'lodash/capitalize';
    import { connected, getScoreBoard } from './firebase.js';
    
    const scores = {
        normal: [],
        hard: [],
    };

    const difficulties = ['normal', 'hard'];

    let difficulty = difficulties[0];

    const fetchScores = async () => {
        scores.normal = await getScoreBoard('normal');
        scores.hard = await getScoreBoard('hard');
    }

    let difficultyIndex = 0;
    const changeDifficulty = () => {
        difficultyIndex++;
        if (difficultyIndex >= difficulties.length) difficultyIndex = difficulties.length - difficultyIndex;
        difficulty = difficulties[difficultyIndex];
    }

    onMount(async () => {
        await connected;
        await fetchScores();
        setInterval(fetchScores, 20000);
        setInterval(changeDifficulty, 10000);
    })
</script>

<style>
    ol {
        margin: 2em auto;
    }
</style>

{#await connected}
    <p class="loader">Connecting...</p>
{:then connected}
    <h2>{capitalize(difficulty)}</h2>

    <ol>
        {#each scores[difficulty] as score}
            <li>{score.name} {score.score}</li>
        {/each}
    </ol>
{/await}