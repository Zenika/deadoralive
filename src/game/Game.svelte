<script>
    import shuffle from 'lodash/shuffle';
    import take from 'lodash/take';
    import Rules from './Rules.svelte';
    import Score from './Score.svelte';
    import Rockstar from './Rockstar.svelte';
    import Over from './Over.svelte';

    export let game;
    export let rockstars;
    let over = false;

    let gameRockstars;
    let rockstar;

    const next = () => {
        if (!gameRockstars.length) over = true;
        rockstar = gameRockstars.shift();
    };

    const start = () => {
        const shuffledRockstars = shuffle(rockstars);
        const deadRockstars = take(shuffledRockstars.filter(r => r.dead), 10);
        const aliveRockstars = take(shuffledRockstars.filter(r => !r.dead), 10);
        gameRockstars = shuffle(deadRockstars.concat(aliveRockstars));
        next();
    };

    const right = (evt) => {
        game.combo++;
        game.bestcombo = Math.max(game.combo, game.bestcombo);
        game.score += (evt.detail.timer / 10) + (game.combo * 100);
        next();
    };

    const wrong = () => {
        game.combo = 0;
        next();
    };
</script>

{#if over}
    <Over {game} on:clearGame />
{:else if rockstar}
    <Rockstar {rockstar} difficulty={game.difficulty} on:right={right} on:wrong={wrong} />
    <Score {game} />
{:else}
    <Rules on:start={start} />
{/if}


