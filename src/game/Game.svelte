<script>
    import flatten from 'lodash/fp/flatten';
    import flow from 'lodash/fp/flow';
    import map from 'lodash/fp/map';
    import partition from 'lodash/fp/partition';
    import shuffle from 'lodash/fp/shuffle';
    import take from 'lodash/fp/take';
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
        gameRockstars = flow(
            shuffle,
            partition('dead'),
            map(take(10)),
            flatten,
            shuffle,
        )(rockstars);
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


