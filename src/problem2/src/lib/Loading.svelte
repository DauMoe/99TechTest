<script module>
  import { writable } from "svelte/store";
  const loadingStore = writable<boolean>(false);
  export const setLoading = (isLoading: boolean) => loadingStore.set(isLoading);
  export type LoadingProps = {
    className?: string | Array<unknown>
  }
</script>

<script lang="ts">
  import '@styles/loading.scss';

  let { className }: LoadingProps = $props();

  let isLoading = $state<boolean>();

  loadingStore.subscribe(value => isLoading = value);
</script>

<div class={["loading", isLoading && 'show', className]}>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>