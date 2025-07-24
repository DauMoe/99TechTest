<script lang="ts">
  import '@styles/index.scss';
  import { ExchangeForm, ExchangeTable, Loading, setLoading } from '@lib/index';
  import { filterAvailableTokens } from '@handler/index';
  import { onDestroy, onMount, tick } from 'svelte';

  let tokenList = $state<(PriceSchema & TokenSchema)[]>();
  let timer = $state<number>();

  onMount(() => {
    setLoading(true);
    filterAvailableTokens()
      .then(data => {
        tokenList = data;
      })
      .finally(async () => {
        await tick();
        timer = setTimeout(() => setLoading(false), 1000);
      });
  });

  onDestroy(() => timer && clearTimeout(timer));
</script>

<Loading />

{#if tokenList}
  <ExchangeForm {tokenList} />
  <ExchangeTable {tokenList} />
{/if}
