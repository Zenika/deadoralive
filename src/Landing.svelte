<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { isConnected, getPlayer, createPlayer, updatePlayer } from './firebase.js';

    const dispatch = createEventDispatcher();

    const connected = isConnected();

    export let player;

    let game;
    let email = '';

    onMount(() => {
        game = {
            player: player || {},
            score: 0,
            combo: 0,
            bestcombo: 0,
        };
    });

    function preventEnter(e) {
        if (e.key === 'Enter') e.preventDefault();
    }

    function setDifficulty(difficulty) {
        game.difficulty = difficulty;
    }

    let creatingPlayer = false;
    async function setEmail() {
        let player = await getPlayer(email);
        if (!player) {
            creatingPlayer = true;
            player = await createPlayer({
                email,
                newsletters: [],
                games: [],
            });
        }
        game.player = player;
    }

    let updatingPlayer = false;
    async function newGame() {
        updatingPlayer = true;
        console.log(game)
        await updatePlayer(game.player);
        dispatch('newGame', game);
    }
</script>

<style>
    .buttons {
        display: flex;
        margin-top: 2rem;
    }

    button:first-of-type {
        margin-right: 1rem;
    }

    form {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        width: 60%;
    }

    form > input {
        background-color: var(--dark);
        border: 2px solid var(--light);
        color: var(--light);
        font-family: var(--font);
        font-size: 1.2rem;
        height: 3.2rem;
        margin-bottom: 2rem;
        text-align: center;
        text-transform: uppercase;
    }

    form > input::placeholder {
        color: var(--light-grey);
        opacity: 1;
    }

    .legalNotice {
        position: absolute;
        bottom: 10px;
        left: 10px;
        font-size: 12px;
    }

    .gdpr {
        color: var(--light-grey);
        margin-top: 5em;
        font-size: 8px;
        width: 80%;
    }

    .newsletters {
        font-size: 12px;
    }

    .newsletters .checkboxes {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
</style>

{#if connected}
{#if game && game.player.email}
<form on:submit|preventDefault={newGame}>
    <input type="text" placeholder="Your name" required bind:value={game.player.name} on:keypress={preventEnter}>
    <p class="newsletters">
        Vous souhaitez recevoir des informations liées à :<br><br>
        <span class="checkboxes">
            <span>
                <input type="checkbox" bind:group={game.player.newsletters} value="formations" id="newsletter-formations">
                <label for="newsletter-formations">Nos formations</label>
            </span>
            <span>
                <input type="checkbox" bind:group={game.player.newsletters} value="actualites" id="newsletter-actualites">
                <label for="newsletter-actualites">Nos actualités et événements</label>
            </span>
            <span>
                <input type="checkbox" bind:group={game.player.newsletters} value="recrutement" id="newsletter-recrutement">
                <label for="newsletter-recrutement">Le recrutement</label>
            </span>
        </span>
    </p>
    <span class="buttons">
        <button class="success" type="submit" on:click={() => setDifficulty('normal')}>Normal Game</button>
        <button class="error" type="submit" on:click={() => setDifficulty('hard')}>Hard Game</button>
    </span>
</form>
{:else}
<form on:submit|preventDefault={setEmail}>
    <input type="email" placeholder="Your email address" required bind:value={email} disabled={creatingPlayer}>
    <span class="buttons">
        <button class="success" type="submit" disabled={creatingPlayer}>Play</button>
    </span>
</form>
{/if}

<p class="gdpr">
    Les informations recueillies sur ce formulaire font l’objet d’un traitement informatique destiné à la gestion du jeu concours "Dead or Alive". Les données sont uniquement destinées au service "Développement" de Zenika, ayant son siège social 10 rue de Milan 75009 Paris. Elles seront conservées pendant 6 mois.<br>
    Si vous avez coché les cases pour être recontacté par Zenika, vos informations feront l’objet d’un traitement informatique destiné à la gestion du recrutement, marketing et/ou commerce. Les données sont uniquement destinées à ces services de Zenika, ayant son siège social 10 rue de Milan 75009 Paris. Elles seront conservées pendant 2 ans.<br>
    Conformément à la Loi « Informatique et Libertés » n°78-17 du 06 Janvier 1978 modifiée et au Règlement Général sur la Protection des Données, vous disposez d’un droit d’accès aux données vous concernant ou pouvez demander leur effacement. Vous disposez également d'un droit d’opposition, d’un droit de rectification, d’un droit à la portabilité et d’un droit à la limitation du traitement de vos données. Pour exercer ces droits ou pour toute question sur le traitement de vos données, sous réserve de justifier de votre identité, vous pouvez contacter notre délégué à la protection des données (DPO) : mydata@zenika.com. Si vous estimez après nous avoir contactés que vos droits ne sont pas respectés, vous pourrez à tout moment saisir l’autorité de contrôle (CNIL).
</p>
{:else}
<form on:submit|preventDefault={() => dispatch('newGame', game)}>
    <span class="buttons">
        <button class="success" type="submit" on:click={() => setDifficulty('normal')}>Normal Game</button>
        <button class="error" type="submit" on:click={() => setDifficulty('hard')}>Hard Game</button>
    </span>
</form>
{/if}

<a class="legalNotice" href="legalNotice.html">Mentions légales</a>
