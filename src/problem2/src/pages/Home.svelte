<script lang="ts">
  import '@styles/index.scss';
  import { ExchangeForm, ExchangeTable, Loading, setLoading } from '@lib/index';
  import { filterAvailableTokens } from '@handler/index';
  import { onDestroy, onMount } from 'svelte';

  let tokenList = $state<(PriceSchema & TokenSchema)[]>();
  let timer = $state<number | null>(null);

  onMount(() => {
    setLoading(true);
    filterAvailableTokens().then(data => {
      tokenList = data
    });
    timer = setTimeout(() => setLoading(false), 2000);
  });

  onDestroy(() => !!timer && clearTimeout(timer));
</script>

<Loading />

{#if tokenList}
  <ExchangeForm {tokenList} />
  <ExchangeTable {tokenList} />
{/if}
