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
        const [normal, hard] = await Promise.all([
            getScoreBoard('normal'),
            getScoreBoard('hard'),
        ]);
        scores.normal = normal;
        scores.hard = hard;
        console.log(scores);
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
        font-size: 16px;
    }
</style>

<h2>{capitalize(difficulty)}</h2>

<ol>
    {#each scores[difficulty] as score}
        <li>{score.name} {score.score}</li>
    {/each}
</ol>
