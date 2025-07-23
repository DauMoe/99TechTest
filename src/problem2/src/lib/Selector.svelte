<script module>
  export type SelectorPropType = {
    options: TokenListType[];
    className?: string | Array<unknown>;
    selectedValue?: TokenListType;
  }
</script>

<script lang="ts">
  import "@styles/selector.scss";
  import ArrowDownBlack from '@assets/arrow_down_black.png';
  import Clickable from "./Clickable.svelte";
  import Input from "./Input.svelte";
  import { onDestroy, onMount } from "svelte";
  import { preventDrillingEvent } from "@utils";

  let { options, className, selectedValue = $bindable() }: SelectorPropType = $props();

  let showDropdown = $state<boolean>(false);
  let searchValue = $state<string>('');
  let listOptions = $state<TokenListType[]>([]);

  const triggerOptions = (e: MouseEvent) => {
    preventDrillingEvent(e);
    showDropdown = !showDropdown;
  }

  const closeDropdown = () => {
    showDropdown = false;
    searchValue = '';
    listOptions = options;
  }

  const onOptionPressed = (option: TokenListType) => {
    selectedValue = option;
    closeDropdown();
  }

  $effect(() => {
    if (options && !selectedValue) {
      selectedValue = options[0];
    }
  });

  $effect(() => {
    if (searchValue) {
      listOptions = options.filter(option => option.currency.toLowerCase().includes(searchValue.toLowerCase()))
    } else {
      listOptions = options;
    }
  });

  onMount(() => {
    window.addEventListener('click', closeDropdown);
  })

  onDestroy(() => {
    window.removeEventListener('click', closeDropdown);
  })
</script>

<div class={["selector_container", className]}>
  <Clickable className="selector_preview" onClick={triggerOptions}>
    <img src={selectedValue?.download_url} alt="icon" class="selected_icon" />
    <span>{selectedValue?.currency}</span>
    <img src={ArrowDownBlack} class="dropdown_arrow" alt="dropdown icon" />
  </Clickable>

  <Clickable className={["options_container", showDropdown && 'show_dropdown']} onClick={preventDrillingEvent}>
    <Input bind:value={searchValue} placeholder={"Search"} />
    <div class="options_wrapper">
      {#each listOptions as option, index (index)}
        <Clickable className="selector_preview option" onClick={() => onOptionPressed(option)}>
          <img src={option?.download_url} alt="icon" class="selected_icon" />
          <span>{option?.currency}</span>
        </Clickable>
      {/each}
    </div>
  </Clickable>
</div>
