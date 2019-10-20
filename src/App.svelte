<script>
  import { Router, Route } from "svelte-routing";
  import Header from './Header.svelte'
  import Index from "./Index.svelte";
  import Scores from "./Scores.svelte";

  export let url = "";
</script>

<Header />

<Router url="{url}">
    <Route path="/" component={Index} />
	<Route path="/scores" component={Scores} />
</Router>