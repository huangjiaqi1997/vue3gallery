<script setup>
import { computed, onMounted, ref, Transition, watch } from 'vue'
import { isMobile } from '@/utils/flexible'
import api from '@/api'
// import gsap from 'gsap'

const {
  item,
  clickPos,
  visible,
  withRequest = false
} = defineProps(['item', 'clickPos', 'visible', 'withRequest'])
const emits = defineEmits(['close'])
const detail = ref({})

// 请求图片详情
const getDetailData = async () => {
  const res = await api.getDetailById(item.id)
  detail.value = res
}

// 给 detail 赋值
watch(
  () => visible,
  () => {
    if (!visible) return

    if (!withRequest) detail.value = item
    else {
      detail.value = {}
      getDetailData()
    }
  },
  { immediate: true }
)

// css v-bind()
const getOriginPos = () => {
  // if (!clickPos.x) return
  // console.log('', visible)
  // const winWidth = window.innerWidth
  // const winHeight = window.innerHeight
  // const ctnOffsetLeft = (winWidth - winHeight * 1.61) / 2
  // const ctnOffsetTop = winHeight * 0.02
  // console.log(ctnOffsetLeft)

  // const x = parseInt(clickPos.x) - ctnOffsetLeft + 'px'
  // const y = parseInt(clickPos.y) - ctnOffsetTop + 'px'

  // console.log('x', x)
  // return `${x} ${y}`

  return `${clickPos.x} ${clickPos.y}`
}

// 关闭按钮
const handleCloseClick = () => emits('close')
// watch(
//   () => visible,
//   async () => {
//     if (visible) {
//       isVisible.value = true

//       await nextTick()
//       gsap.to('.fade', { opacity: 1, duration: 0.3 })
//       gsap.to('.scale', {
//         scale: 1,
//         transformOrigin: `${clickPos.x}px ${clickPos.y}px`,
//         duration: 0.3
//       })
//     } else {
//       gsap.to('.fade', {
//         opacity: 0,
//         duration: 0.3,
//         onComplete() {
//           isVisible.value = false
//         }
//       })
//       gsap.to('.scale', {
//         scale: 0.1,
//         transformOrigin: `${clickPos.x}px ${clickPos.y}px`,
//         duration: 0.3
//       })
//     }
//   }
// )
</script>

<template>
  <!-- <Teleport to="body">
    <div
      v-show="isVisible && !isMobile"
      class="fade backdrop-blur-3xl opacity-0 z-20 absolute top-0 left-0 w-screen h-screen bg-zinc-800/40"
    ></div>

    <m-svg-icon
      @click="handleCloseClick"
      class="fade z-30 cursor-pointer absolute top-2 right-2 w-3 h-3 p-0.5 hover:bg-zinc-100 duration-200 rounded-sm"
      name="close"
      fillClass="fill-zinc-800"
    ></m-svg-icon>

    <div
      v-show="isVisible"
      class="scale scale-0 flex items-center justify-center z-20 absolute top-0 left-0 w-screen h-screen bg-transparent"
    >
      <div class="h-screen xl:h-[96vh] z-20 bg-white xl:flex xl:rounded">
        <m-navbar
          v-if="isMobile"
          leftIcon="back"
          leftText="返回"
          rightIcon="share"
          @leftClick="handleCloseClick"
          @rightClick=""
        >
          {{ item.title }}
        </m-navbar>

        <img
          class="xl:rounded-l h-[130vw] xl:h-[96vh] w-screen xl:w-[96vh] object-cover"
          :src="item.photo"
        />
        <div class="w-screen xl:w-[55vh] py-2 px-2">
          <div v-if="!isMobile" class="flex justify-between mb-2">
            <m-button icon="share">分享</m-button>
            <m-button icon="heart">喜欢</m-button>
          </div>
          <div class="text-xl font-semibold mb-2">
            {{ item.title }}
          </div>
          <div class="flex items-center">
            <img
              class="w-3 h-3 mr-1 rounded-full inline-block"
              :src="item.avatar"
            />
            <span
              class="text-base align-middle text-zinc-600 inline-block"
            >
              {{ item.author }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Teleport> -->
  <Teleport to="body">
    <!-- 蒙版 -->
    <Transition name="fade">
      <div
        v-if="visible && !isMobile"
        class="flex items-center justify-center backdrop-blur-3xl z-20 absolute top-0 left-0 w-screen h-screen bg-zinc-800/40"
      >
        <!-- <div class="content h-screen xl:h-[96vh] z-20 bg-white xl:flex xl:rounded">
          <m-navbar
            v-if="isMobile"
            leftIcon="back"
            leftText="返回"
            rightIcon="share"
            @leftClick="handleCloseClick"
            @rightClick=""
          >
            {{ detail.title }}
          </m-navbar>

          <img
            :style="{ opacity: detail.photo ? 100 : 0 }"
            class="duration-200 xl:rounded-l h-[130vw] xl:h-[96vh] w-screen xl:w-[96vh] object-cover"
            :src="detail.photo"
          />
          <div class="w-screen xl:w-[55vh] py-2 px-2">
            <div v-if="!isMobile" class="flex justify-between mb-2">
              <m-button icon="share">分享</m-button>
              <m-button icon="heart">喜欢</m-button>
            </div>
            <div class="text-xl font-semibold mb-2">
              {{ detail.title }}
            </div>
            <div class="flex items-center">
              <img
                :style="{ opacity: detail.photo ? 100 : 0 }"
                class="w-3 h-3 mr-1 rounded-full inline-block"
                :src="detail.avatar"
              />
              <span class="text-base align-middle text-zinc-600 inline-block">
                {{ detail.author }}
              </span>
            </div>
          </div>
        </div> -->
      </div>
    </Transition>

    <Transition name="fade">
      <m-svg-icon
        v-show="visible && !isMobile"
        @click="handleCloseClick"
        class="z-30 cursor-pointer absolute top-2 right-2 w-3 h-3 p-0.5 hover:bg-zinc-100 duration-200 rounded-sm"
        name="close"
        fillClass="fill-zinc-800"
      ></m-svg-icon>
    </Transition>

    <!-- 内容 -->
    <!-- -translate 对百分比宽度设置、scale动画有影响 -->
    <!-- 法一：用 w-screen h-screen 的透明遮罩层包裹 但关闭按钮无法点击-->
    <!-- 法二  absolute top-[2vh] bottom-[2vh] left-[15vw] right-[15vw] 但内部div无法撑开 -->
    <!-- 若是宽高固定，使用 绝对定位 + -margin -->
    <Transition name="scale">
      <div
        v-show="visible"
        class="flex items-center justify-center z-20 absolute top-0 left-0 w-screen h-screen bg-transparent"
      >
        <!-- 内容 -->
        <div
          class="overflow-y-auto h-screen xl:h-[96vh] z-20 bg-white xl:flex xl:rounded"
        >
          <m-navbar
            v-if="isMobile"
            :sticky="true"
            @leftClick="handleCloseClick"
            @rightClick=""
          >
            {{ detail.title }}
            <template #right>
              <m-svg-icon class="w-2 h-2" name="share"></m-svg-icon>
            </template>
          </m-navbar>

          <img
            :style="{ opacity: detail.photo ? 100 : 0 }"
            class="duration-200 xl:rounded-l xl:h-[96vh] w-screen xl:w-[96vh] object-cover"
            :src="detail.photo"
          />
          <div class="w-screen xl:w-[55vh] py-2 px-2">
            <div v-if="!isMobile" class="flex justify-between mb-2">
              <m-button icon="share">分享</m-button>
              <m-button icon="heart">喜欢</m-button>
            </div>
            <div class="text-xl font-semibold mb-2">
              {{ detail.title }}
            </div>
            <div class="flex items-center">
              <img
                :style="{ opacity: detail.photo ? 100 : 0 }"
                class="w-3 h-3 mr-1 rounded-full inline-block"
                :src="detail.avatar"
              />
              <span class="text-base align-middle text-zinc-600 inline-block">
                {{ detail.author }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter-to,
.scale-leave-from {
  transform-origin: v-bind(getOriginPos());
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform-origin: v-bind(getOriginPos());
  transform: scale(0.2);
}
</style>
