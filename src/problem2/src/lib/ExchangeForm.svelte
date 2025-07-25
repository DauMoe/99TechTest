<script module>
  export type ExchangeFormPropsTypes = {
    tokenList: TokenListType[];
  }
</script>

<script lang="ts">
  import "@styles/exchangeForm.scss";
  import Input from "./Input.svelte";
  import Selector from "./Selector.svelte";
  import Clickable from "./Clickable.svelte";
  import SwapIcon from '@assets/swap_arrow.png';
  import ArrowDown from '@assets/arrow_down_black.png';

  let { tokenList }: ExchangeFormPropsTypes = $props();

  let selectedSourceToken = $state<TokenListType>();
  let selectedOutputToken = $state<TokenListType>();

  let mountOfSourceToken = $state(0);
  let mountOfOutputToken = $state(0);

  let swapRef = $state<HTMLDivElement>();
  let tokenRate = $state<number>(0);
  let rotate = $state<boolean>(false);
  let toUSDollar = $state<number>(0);

  const converter = (input: number) => tokenRate * input;

  const swapToken = () => {
    const tempSrcToken = selectedSourceToken;
    const tempOutToken = selectedOutputToken;

    selectedSourceToken = tempOutToken;
    selectedOutputToken = tempSrcToken;

    if (swapRef) {
      swapRef.style.transform = rotate ? 'rotate(0deg)' : 'rotate(360deg)';
      rotate = !rotate;
    }
  }

  $effect(() => {
    if (Array.isArray(tokenList) && tokenList.length > 2) {
      selectedSourceToken = tokenList[0];
      selectedOutputToken = tokenList[1];
    }
  });

  $effect(() => {
    if (selectedSourceToken?.price && selectedOutputToken?.price) {
      tokenRate = selectedSourceToken?.price / selectedOutputToken?.price;
    }
  });

  $effect(() => {
    if (selectedOutputToken && mountOfSourceToken) {
      toUSDollar = +(selectedOutputToken?.price * tokenRate * mountOfSourceToken).toFixed(3);
    }
  })

  const handleInput = (e: unknown) => {
    //@ts-ignore
    const value = e.target.value;
    const numValue = Number.parseFloat(value)
    mountOfSourceToken = numValue;
    mountOfOutputToken = converter(numValue);
  }
</script>

<div class="exchangeForm__container">
  <div class="exchangeForm__wrapper">
    <div class="exchangeForm">
      <h1>Exchange Calculator</h1>
      <div class="token__container">
        <Input
          value={mountOfSourceToken} 
          type="number" 
          min="0" 
          inputmode="numeric" 
          pattern="[0-9]*"
          {handleInput}
        />
        <Selector 
          bind:selectedValue={selectedSourceToken} 
          className="exchangeForm__selection"
          options={tokenList} 
        />
      </div>

      <Clickable bind:ref={swapRef} className="swapper_btn" onClick={swapToken}>
        <img src={SwapIcon} width="40" alt="swap icon" class="visible" />
      </Clickable>

      <div class="token__container">
        <Input 
          value={tokenRate * mountOfSourceToken}
          type="number" 
          min="0" 
          inputmode="numeric" 
          pattern="[0-9]*"
          disabled
        />
        <Selector 
          bind:selectedValue={selectedOutputToken} 
          className="exchangeForm__selection" 
          options={tokenList} 
        />
      </div>
      <p class="exchange_usd">&asymp; <b>${toUSDollar}</b></p>

      <div class="exchange_rate_text">
        <b>1 {selectedSourceToken?.currency} = {tokenRate?.toFixed(4)} {selectedOutputToken?.currency}</b>
      </div>
    </div>
  </div>
</div>

<div class="moveDown">
  <a href="#exchange_table">Coin to USD exchange rate</a>
  <img src={ArrowDown} alt="arrow down"/>
</div>
