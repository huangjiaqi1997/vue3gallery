<script setup>
import { getVipCombos } from '@/api/user'
import { isMobile } from '@/utils/flexible'
import { computed, ref } from 'vue'

const combos = ref([])
const currentItem = ref({})
const time = ref(52 * 60 * 1000)
const popupVisible = ref(false)
const isCountDownFinish = ref(false)

getVipCombos().then((res) => {
  combos.value = res
  currentItem.value = res[0]
})

const onItemClick = (item) => {
  currentItem.value = item
}

const handleCountFinish = () => {
  isCountDownFinish.value = true
}
const onAlipayClick = () => {}
</script>

<template>
  <div class="h-full w-full overflow-y-auto bg-zinc-100">
    <!-- navbar -->
    <m-navbar v-if="isMobile">精选会员</m-navbar>

    <div
      class="xl:max-w-screen-lg w-full bg-white xl:border border-none border-zinc-200 mx-auto xl:px-3 px-1 py-3 xl:my-1 my-0 xl:rounded text-center text-base"
    >
      <!-- 标题 -->
      <div class="text-[#ca8a04] tracking-widest text-2xl font-bold my-1">
        精选VIP
      </div>
      <div class="text-lg text-[#ebb819] mb-4">升级精选VIP，畅想所有内容</div>

      <!-- 套餐 -->
      <div class="w-full overflow-x-scroll mb-1">
        <div class="flex text-[#854d0e] my-1">
          <div
            @click="() => onItemClick(item)"
            v-for="item in combos"
            :key="item.id"
            :class="{
              'border-[#fdba74]  bg-[#fff7ed]': currentItem.id === item.id
            }"
            class="relative flex-shrink-0 xl:w-14 w-10 hover:border-[#fdba74] hover:bg-[#fff7ed] duration-300 cursor-pointer py-2 mr-1 rounded border border-zinc-200"
          >
            <div class="mb-1">{{ item.title }}</div>
            <div class="font-bold mb-1">
              ￥ <span class="text-xl">{{ item.price }}</span>
            </div>
            <div class="text-sm line-through text-[#ebb819]">
              ￥{{ item.oldPrice }}
            </div>
            <!-- 热销标签 -->
            <div
              v-if="item.isHot"
              class="bg-gradient-to-tr from-[#fdba74] to-[#fff7ed] absolute top-[-0.3rem] right-0 rounded-tr rounded-bl text-xs px-1 py-0.5"
            >
              热销
            </div>
          </div>
        </div>
      </div>
      <!-- 提示 -->
      <div class="xl:h-5 h-2 text-sm text-left text-zinc-500">
        {{ currentItem.desc }}
      </div>

      <div class="w-full xl:relative fixed bottom-0 left-0">
        <!-- 倒计时 -->
        <div
          v-if="!isCountDownFinish"
          class="text-[#dc2626] border-[#fdba74] bg-[#fff7ed] p-0.5 xl:border border-t xl:rounded-sm text-sm font-bold"
        >
          <m-svg-icon
            class="w-1.5 h-1.5 inline-block mr-0.5"
            fillClass="fill-[#dc2626]"
            name="countdown"
          ></m-svg-icon>
          <span class="align-middle"
            >限时特惠 | 距离优惠结束仅剩
            <m-count-down
              v-model="time"
              format="HH:mm:ss"
              @finish="handleCountFinish"
            ></m-count-down
          ></span>
        </div>
        <!-- 支付 -->
        <div v-if="!isMobile" class="border border-zinc-200 rounded p-2 mt-1">
          <div class="mb-4">
            支付金额：<span class="text-lg text-[#ea580c] font-semibold"
              >￥</span
            ><span class="text-2xl text-[#ea580c] font-semibold mb-2">{{
              currentItem.price
            }}</span>
          </div>
          <m-button
            @click="onAlipayClick"
            class="mx-auto px-5"
            type="normal"
            size="large"
          >
            <m-svg-icon class="w-4 h-4 mr-1" name="zhi-fu-bao"></m-svg-icon>
            <span class="text-xl">支付宝</span>
          </m-button>
        </div>

        <div
          v-else
          class="px-1 py-1 text-xs flex justify-between items-center text-left"
        >
          <!-- 左 -->
          <div class="mt-[-5px]">
            <div>
              券后合计：<span class="text-base text-[#dc2626] font-semibold"
                >￥</span
              ><span class="text-lg text-[#dc2626] font-semibold">{{
                currentItem.price
              }}</span>
            </div>
            <div class="text-[#dc2626]">优惠券：限时立减 ￥ 10</div>
          </div>
          <!-- 右 -->
          <m-button @click="() => (popupVisible = true)" type="primary"
            >立即开通</m-button
          >
        </div>
      </div>
    </div>

    <m-popup
      @close="() => (popupVisible = false)"
      :visible="popupVisible"
      height="50%"
    >
      <div class="">
        <div class="text-lg font-semibold border-b border-zinc-200 px-1.5 py-2">
          选择支付方式
        </div>
        <div
          @click="onAlipayClick"
          class="active:bg-zinc-200 duration-300 flex items-center px-1.5 py-2"
        >
          <m-svg-icon class="w-3 h-3 mr-1" name="zhi-fu-bao"></m-svg-icon>
          <span class="text-lg">支付宝</span>
        </div>
      </div>
    </m-popup>
  </div>
</template>

<style scoped></style>
