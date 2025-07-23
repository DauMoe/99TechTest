<script lang="ts">
  import "@styles/exchangeForm.scss";
  import Input from "./Input.svelte";
  import Selector from "./Selector.svelte";
  import Clickable from "./Clickable.svelte";
  import SwapIcon from '@assets/swap_arrow.png';

  let { tokenList } = $props();

  let sourceToken = $state('0');
  let outputToken = $state('0');

  const swapToken = () => {

  }
</script>

<div class="exchangeForm__container">
  <div class="exchangeForm__wrapper">
    <h1>Token exchange calculator</h1>
    <div class="token__container">
      <Input bind:value={sourceToken} />
      <Selector options={tokenList} className="exchangeForm__selection" />
    </div>

    <Clickable className="swapper_btn" onClick={swapToken}>
      <img src={SwapIcon} width="40" alt="swap icon" />
    </Clickable>

    <div class="token__container">
      <Input bind:value={outputToken} />
      <Selector options={tokenList} className="exchangeForm__selection" />
    </div>
  </div>
</div>