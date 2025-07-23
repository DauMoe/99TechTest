<script module>
  export type InputTextboxType = {
    placeholder?: string;
    className?: string;
    value?: string;
  }
</script>

<script lang="ts">
  import "@styles/input.scss";

  let { placeholder, className, value = $bindable(), ...restProps }: InputTextboxType = $props();
</script>

<div class="textBox__wrapper {className}">
  <input 
    type="text" 
    bind:value 
    placeholder={placeholder}
    {...restProps}
  />
</div>