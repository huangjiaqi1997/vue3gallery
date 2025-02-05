<script setup>
/**
 * 一：只传 图标：
 * 二：只传 文字（插槽）
 * 三：图标 + 文字
 */
import { computed, ref, useSlots, watch } from 'vue'
import SvgIcon from './svg-icon.vue'

// type: normal primary
// size: medium small
const { type, size, icon, loading, disabled, circle } = defineProps({
  type: { default: 'normal' },
  size: { default: 'medium' },
  icon: { type: String },
  loading: { type: Boolean },
  disabled: { type: Boolean },
  circle: { type: Boolean }
})
const emits = defineEmits(['click'])

const slots = useSlots()

const disableOrNot = computed(() => (disabled ? 'disable' : 'enable'))
const iconBtnOrNot = computed(() =>
  icon && !slots.default ? 'iconBtn' : 'noIconBtn'
)
const circleOrNot = computed(() => (circle ? 'circle' : 'noCircle'))

const styles = {
  color: {
    enable: {
      normal: {
        button:
          'bg-white text-zinc-800 border border-zinc-200 hover:bg-zinc-100 active:bg-zinc-200 dark:hover:bg-zinc-700 dark:active:bg-zinc-900 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700',
        icon: 'fill-zinc-800 dark:fill-zinc-200'
      },
      primary: {
        button:
          'bg-[#41b883] text-white border border-[#3baa79] hover:bg-[#47c88e] active:bg-[#3baa79]',
        icon: 'fill-white'
      },
      info: {
        button:
          'bg-zinc-200 text-zinc-900 border border-zinc-300 hover:bg-zinc-100 active:bg-zinc-300',
        icon: 'fill-zinc-900'
      }
    },
    disable: {
      normal: {
        button:
          'bg-white text-zinc-500 border border-zinc-100 dark:bg-zinc-900 dark:text-zinc-500 dark:border-zinc-800 cursor-not-allowed',
        icon: 'fill-zinc-500 dark:fill-zinc-100'
      },
      primary: {
        button:
          'bg-[#7eceaa] text-white border border-[#7acea9] cursor-not-allowed',
        icon: 'fill-white'
      },
      info: {
        button:
          'bg-zinc-100 text-zinc-600 border border-zinc-300 cursor-not-allowed',
        icon: 'fill-zinc-600'
      }
    }
  },
  size: {
    noIconBtn: {
      medium: {
        button: 'text-base py-1 px-[0.4rem]',
        icon: 'h-1.5 w-1.5 mr-0.5'
      },
      small: {
        button: 'text-sm py-[0.15rem] px-[0.3rem]',
        icon: 'h-[0.35rem] w-[0.35rem] mr-[0.1rem]'
      },
      large: {
        button: 'text-base py-1 px-[0.4rem]',
        icon: 'h-2 w-2 mr-0.5'
      }
    },
    iconBtn: {
      medium: {
        button: 'text-base p-1',
        icon: 'h-1.5 w-1.5'
      },
      small: {
        button: 'text-sm p-[0.15rem]',
        icon: 'h-[0.35rem] w-[0.35rem]'
      },
      large: {
        button: 'text-base p-1',
        icon: 'h-2 w-2'
      }
    }
  },
  radius: {
    noCircle: 'rounded-sm',
    circle: 'rounded-full'
  }
}

const handClick = () => {
  if (loading) return
  emits('click')
}
</script>

<template>
  <button
    class="flex items-center leading-[1] justify-center duration-300"
    :class="[
      styles['color'][disableOrNot][type]['button'],
      styles['size'][iconBtnOrNot][size]['button'],
      styles['radius'][circleOrNot]
    ]"
    :disabled="disabled"
    @click.stop="handClick"
  >
    <SvgIcon
      v-if="loading"
      class="mr-0.5 animate-spin"
      :class="[
        styles['color'][disableOrNot][type]['icon'],
        styles['size']['noIconBtn'][size]['icon']
      ]"
      name="infinite-load"
    ></SvgIcon>
    <SvgIcon
      v-if="icon"
      :class="[
        styles['color'][disableOrNot][type]['icon'],
        styles['size'][iconBtnOrNot][size]['icon']
      ]"
      :name="icon"
    ></SvgIcon>
    <slot></slot>
  </button>
</template>

<style scoped></style>
