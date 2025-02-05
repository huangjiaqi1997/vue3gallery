<script setup>
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'
/**
 * container hover => input, icon
 * input focus => container, icon
 * clickOutside
 */
const { dropVisible } = defineProps(['dropVisible'])

const inputValue = defineModel('inputValue')
const emits = defineEmits([
  'search',
  'focus',
  'blur',
  'input',
  'clear',
  'clickOutside'
])

const searchRef = useTemplateRef('searchRef')
const inputRef = useTemplateRef('inputRef')

onClickOutside(searchRef, (event) => {
  emits('clickOutside')
})

const onSearch = () => {
  inputRef.value.blur()

  emits('search')
}

const onFocus = () => {
  emits('focus')
}

const onBlur = () => {
  emits('blur')
}

const onInput = () => {
  emits('input', inputValue)
}

const onClear = () => {
  inputValue.value = ''

  emits('clear')
}
</script>
<template>
  <div ref="searchRef" class="relative">
    <div
      class="bg-zinc-100 border border-zinc-200 has-[input:focus]:bg-white has-[input:focus]:shadow-md flex items-center rounded-full group hover:bg-white hover:shadow-md duration-300 relative dark:hover:shadow-zinc-800 dark:hover:bg-zinc-800 dark:has-[input:focus]:shadow-zinc-800 dark:has-[input:focus]:bg-zinc-800 dark:bg-zinc-900 dark:border-zinc-700"
    >
      <!-- 搜索图标 -->
      <m-svg-icon
        class="h-1.5 w-1.5 ml-1.5 mr-1 fill-zinc-500 dark:fill-zinc-400"
        name="search"
      ></m-svg-icon>
      <!-- 仍然不垂直居中是字体问题 -->
      <!-- font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif; -->
      <input
        ref="inputRef"
        class="peer py-1 caret-zinc-500 tracking-wide font-semibold grow bg-zinc-100 text-base outline-none group-hover:bg-white font-['Helvetica'] focus:bg-white duration-300 dark:focus:bg-zinc-800 dark:group-hover:bg-zinc-800 dark:text-zinc-200 dark:bg-zinc-900"
        placeholder="搜索"
        type="text"
        v-model="inputValue"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.enter="onSearch"
        @input="onInput"
      />
      <!-- 清空图标 -->
      <m-svg-icon
        :class="{ 'opacity-100': inputValue }"
        class="h-1.5 w-1.5 cursor-pointer opacity-0 duration-300 fill-zinc-500 dark:fill-zinc-400"
        name="delete"
        @click="onClear"
      ></m-svg-icon>
      <!-- 分隔线 -->
      <div
        :class="{ 'opacity-100': inputValue }"
        class="peer-focus:opacity-100 w-[1px] h-1.5 mx-1 bg-zinc-400 opacity-0 group-hover:opacity-100 duration-300"
      ></div>
      <!-- 搜索按钮 -->
      <m-button
        :class="{ 'opacity-100': inputValue }"
        class="peer-focus:opacity-100 mr-[2px] opacity-0 group-hover:opacity-100 duration-300"
        type="primary"
        icon="search"
        circle
        @click="onSearch"
      ></m-button>
    </div>

    <Transition name="up-30">
      <div
        v-if="dropVisible && $slots.default"
        class="text-zinc-600 font-semibold overflow-auto z-20 max-h-[360px] text-base absolute top-5 left-0 w-full bg-white rounded-sm border border-zinc-200 shadow-md"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
