<script lang="ts">
  type ClickablePropsType = {
    onClick?: (event: MouseEvent) => void;
    onHover?: (event: MouseEvent) => void;
    disabled?: boolean;
    className?: string | Array<unknown>;
    ref?: HTMLElement;
    children: Function;
  }

  let { onClick, onHover, disabled, className, ref = $bindable(), children, ...restProps }: ClickablePropsType = $props();

  function handleClick(event: MouseEvent) {
    if (!disabled) {
      onClick?.(event);
    }
  }

  function handleMouseOver(event: MouseEvent) {
    if (!disabled) {
      onHover?.(event);
    }
  }
</script>

<style>
  .clickable {
    cursor: pointer;
  }
  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>

<div
  class:clickable={!disabled}
  class:disabled={disabled}
  on:click={handleClick}
  on:mouseover={handleMouseOver}
  class={className}
  bind:this={ref}
  {...restProps}
>
  {@render children?.()}
</div>