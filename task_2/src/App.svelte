<script>
  // import { onMount, onDestroy } from 'svelte';
  // import { readable } from 'svelte/store';
  // import { exchanger } from './store/store'
  import Exchanger from "./components/exchanger.svelte"
  let items = []
  // const unsubscribe = currencies.subscribe((value) => {
  //   items = value
  // })
</script>

<main>
  <div class="wrapper">
    <h1>aymichaels exchange</h1>
    <div class="selectWrapper">
      <Exchanger />
    </div>

    
  </div> 
</main>

<style>
  .selectWrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

</style>
