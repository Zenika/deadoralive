<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const newGame = () => ({
        player: {},
        score: 0,
        combo: 0,
        bestcombo: 0,
    });

    let game = newGame();

    function createNewGame() {
        dispatch('newGame', game);
        game = newGame();
    }
</script>

<style>
    .buttons {
        display: flex;
        margin-top: 2.5rem;
    }

    button:first-of-type {
        margin-right: 1rem;
    }

    form {
        display: flex;
        flex-direction: column;
        margin-top: 5rem;
        width: 50%;
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
    }

    .gdpr {
        color: var(--light-grey);
        margin-top: 5em;
        font-size: 8px;
        width: 60%;
    }
</style>

<form on:submit|preventDefault={createNewGame}>
    <input type="text" placeholder="Your name" required bind:value={game.player.name}>
    <input type="email" placeholder="Your email address" required bind:value={game.player.email}>
    <span class="buttons">
        <button class="success" type="submit" on:click={() => game.difficulty = 'normal'}>Normal Game</button>
        <button class="error" type="submit" on:click={() => game.difficulty = 'hard'}>Hard Game</button>
    </span>
</form>
<p class="gdpr">
Les informations recueillies sur ce formulaire font l’objet d’un traitement informatique destiné à la gestion du jeu concours "Dead or Alive". Les données sont uniquement destinées au service "Développement" de Zenika, ayant son siège social 10 rue de Milan 75009 Paris. Elles seront conservées pendant 6 mois.<br>
Si vous avez coché les cases pour être recontacté par Zenika, vos informations feront l’objet d’un traitement informatique destiné à la gestion du recrutement, marketing et/ou commerce. Les données sont uniquement destinées à ces services de Zenika, ayant son siège social 10 rue de Milan 75009 Paris. Elles seront conservées pendant 2 ans.<br>
Conformément à la Loi « Informatique et Libertés » n°78-17 du 06 Janvier 1978 modifiée et au Règlement Général sur la Protection des Données, vous disposez d’un droit d’accès aux données vous concernant ou pouvez demander leur effacement. Vous disposez également d'un droit d’opposition, d’un droit de rectification, d’un droit à la portabilité et d’un droit à la limitation du traitement de vos données. Pour exercer ces droits ou pour toute question sur le traitement de vos données, sous réserve de justifier de votre identité, vous pouvez contacter notre délégué à la protection des données (DPO) : mydata@zenika.com. Si vous estimez après nous avoir contactés que vos droits ne sont pas respectés, vous pourrez à tout moment saisir l’autorité de contrôle (CNIL).
</p>
<div>
    <a class="legalNotice" href="legalNotice.html">Mentions légales</a>
</div>