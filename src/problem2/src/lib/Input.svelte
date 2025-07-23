<script module>
  export type InputTextboxType = {
    placeholder?: string;
    className?: string | Array<unknown>;
    value?: string;
    handleInput: Function;
  }
</script>

<script lang="ts">
  import "@styles/input.scss";

  let { placeholder, className, handleInput, value = $bindable(), ...restProps }: (InputTextboxType & any) = $props();
</script>

<div class="textBox__wrapper {className}">
  <input 
    type="text" 
    bind:value 
    placeholder={placeholder}
    on:input={handleInput}
    {...restProps}
  />
</div>