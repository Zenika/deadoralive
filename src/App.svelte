<script>
  import { Router, Route } from "svelte-routing";
  import Header from './Header.svelte'
  import Index from "./Index.svelte";
  import Scores from "./Scores.svelte";
  import LegalNotice from "./LegalNotice.svelte";
  import Credits from './Credits.svelte';
  import Rockstars from './Rockstars.svelte';
  import { connected } from './firebase.js';

  export let url = "";
</script>

<Header />

<main>
  {#await connected}
    <p class="loader">Connecting...</p>
  {:then connected}
    <Router url="{url}">
      <Route path="/" component={Index} />
      <Route path="/scores" component={Scores} />
      <Route path="/legalNotice" component={LegalNotice} />
      <Route path="/credits" component={Credits} />
      <Route path="/666" component={Rockstars} />
    </Router>
  {:catch error}
    <p class="error">{error.message}</p>
  {/await}
</main>
