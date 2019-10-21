<script>
    import { link } from 'svelte-routing';
    import shuffle from 'lodash/shuffle';

    const contributors = shuffle([
        {name: "Nicolas Lepage", role:"Developer", img: "https://nantes.zenika.com/cache/team/0Byd-LUeERubiX2o2LVp4MnZlTDA.png"},
        {name: "Pierre-Yves Aillet", role:"Developer", img: "https://nantes.zenika.com/cache/team/1AyIeKTqgpYMbzeRC1l-dnFhA5jYwCW36.png"},
        {name: "Patrice de Saint Steban", role:"Developer", img: "https://nantes.zenika.com/cache/team/14ditTU3D9Sy3FKfyZa3HFGUJkye2LJSo.png"},
        {name: "Séverine Luzeau", role:"Content creator", img: "https://nantes.zenika.com/cache/team/1kYpLTVo7VHt9w0szKiJxoaXGHEe7U1Oj.png"},
        {name: "Jérémy Lejeune", role:"Content creator", img: "https://nantes.zenika.com/cache/team/1Lfp_HTb0_JJJ_RWo6tskfMsqlwCplnUb.png"},
        {name: "Mireille Campourcy", role:"Developer", img: "https://nantes.zenika.com/img/logo-white.png"},
        {name: "Stéphane Cohan", role:"UI/UX Designer", img: "https://nantes.zenika.com/cache/team/1sbLYgjxoLpukgBoq8hDusnvd0O9SePvM.png"},
        {name: "Marie Viley", role:"GDPR consultant", img: "https://nantes.zenika.com/cache/team/1DkQkDel4tMfcuRsFi6vRvWTjvAo-ScI3.png"},
    ]);
</script>

<style>
    .credits {
        padding: 2em;
        text-align: left;
        width: 100%;
    }

    h1 {
        text-align: center;
    }

    h2 {
        margin-top: 3em;
    }

    .svelteLogo {
        width: 150px;
    }

    .contributor {
        display: flex;
        align-items: center;
    }

    .contributor > img {
        width: 150px;
        border-radius: 50%;
        margin-right: 2em; 
    }
</style>

<div class="credits">
<p>
    <a href="/" use:link>&lt; Retour</a>
</p>

  <h1>Crédits</h1>

  <h2>Made with</h2>

    <p><a href="https://svelte.dev/"><img src="https://svelte.dev/svelte-logo-horizontal.svg" alt="Svelte" class="svelteLogo" target="_blank"></a></p>
    <p><a href="https://github.com/sveltejs/template" target="_blank">Svelte app template</a></p>
    <p>Wikipedia markup parser: <a href="https://github.com/spencermountain/wtf_wikipedia" target="_blank">wtf_wikipedia</a></p>

<h2>Contributors</h2>

{#each contributors as contributor}
 <p class="contributor"><img src={contributor.img} alt={contributor.name}>{contributor.name}: {contributor.role}</p>
{/each}

  </div>
