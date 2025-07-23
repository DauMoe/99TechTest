<script lang="ts">
  import ExchangeForm from '@lib/ExchangeForm.svelte';
  import '@styles/index.scss';
  import { onMount } from 'svelte';
  import { filterAvailableTokens } from './handler';

  let tokenList = $state<(PriceSchema & TokenSchema)[]>([]);

  onMount(() => {
    filterAvailableTokens().then(data => {
      console.log("Data", data);
      tokenList = data
    });
  });
</script>

<ExchangeForm {tokenList} />
