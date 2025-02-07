<script setup>
const { isChecked } = defineProps(['isChecked'])
const emits = defineEmits(['change'])

const onChange = () => emits('change')
</script>

<template>
  <label
    class="relative inline-block w-3 h-1.5 rounded-[0.5rem] border-1 border-zinc-200 duration-300 box-content bg-zinc-200 has-[:checked]:bg-main cursor-pointer"
  >
    <input
      class="hidden peer"
      type="checkbox"
      :checked="isChecked"
      @change="onChange"
    />
    <div
      class="absolute h-1.5 w-1.5 rounded-full bg-white border-1 border-zinc-200 duration-300 shadow-md peer-[:checked]:right-0"
    ></div>
  </label>
</template>

<style scoped></style>
