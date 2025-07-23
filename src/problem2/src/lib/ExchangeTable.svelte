<script module>
  export type ExchangeTablePropsType = {
    tokenList: TokenListType[];
    itemPerView?: number;
  }
</script>

<script lang="ts">
  import '@styles/exchangeTable.scss';
  import Clickable from './Clickable.svelte';

  let { tokenList, itemPerView = 10 }: ExchangeTablePropsType = $props();

  let visibleTokenList = $state<TokenListType[]>([]);
  let pageIndex = $state<number>(1);

  const getTotalPage = () => Math.round(tokenList?.length / itemPerView)

  const updateTable = (direction: number) => {
    let nextPage = pageIndex + direction;
    nextPage = Math.max(1, Math.min(nextPage, getTotalPage()));
    pageIndex = nextPage;

    const start = (pageIndex - 1) * itemPerView;
    const end = start + itemPerView;
    visibleTokenList = tokenList.slice(start, end);
  }

  $effect(() => {
    if (Array.isArray(tokenList)) {
      visibleTokenList = tokenList.slice(0, itemPerView);
    }
  })
</script>

<div class="exchangeTable__container" id="exchange_table">
  <div class="exchangeTable__wrapper">
    <div class="exchangeTable__header">
      <h2>Coin to USD exchange rate</h2>
    </div>
    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th>USD</th>
        </tr>
      </thead>
      <tbody>
        {#each visibleTokenList as token}
          <tr>
            <td class="currency">
              <img src={token.download_url} alt={token.currency} />
              <span>{token.currency}</span>
            </td>
            <td>{token.price.toFixed(5)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="exchangeTable-footer">
      <span>Page {pageIndex} of {getTotalPage()}</span>
      <div>
        <Clickable className="footer-btn" onClick={() => updateTable(-1)}>Previous</Clickable>
        <Clickable className="footer-btn" onClick={() => updateTable(+1)}>Next</Clickable>
      </div>
    </div>
  </div>
</div>