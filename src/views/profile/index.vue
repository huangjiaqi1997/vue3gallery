<script>
export default {
  name: 'profile'
}
const titles = [
  { name: '请选择职位', value: '', id: '' },
  { name: 'Python工程师', value: 'Python', id: 1 },
  { name: 'Web前端工程师', value: 'Web', id: 2 },
  { name: 'PHP开发工程师', value: 'PHP', id: 3 },
  { name: '软件测试工程师', value: 'Soft', id: 4 },
  { name: '产品经理', value: 'Manager', id: 5 },
  { name: '数据库工程师', value: 'Database', id: 6 },
  { name: 'UI设计师', value: 'UI', id: 7 },
  { name: '全栈工程师', value: 'FULL', id: 8 },
  { name: '算法工程师', value: 'Algorithm', id: 9 },
  { name: '架构师', value: 'Architecture', id: 10 }
]
const provinces = [
  { name: '请选择省', value: '', id: '' },
  { name: '北京', value: 'beijing', id: 1 },
  { name: '天津', value: 'tianjin', id: 2 }
]
const cities = {
  '': [{ name: '请选择市区', value: '', id: '' }],
  beijing: [
    { name: '请选择市区', value: '', id: '' },
    { name: '北京市区', value: 'beijing', id: 1 }
  ],
  tianjin: [
    { name: '请选择市区', value: '', id: '' },
    { name: '天津市', value: 'tianjin', id: 1 }
  ]
}
const districts = {
  '': [{ name: '请选择区县', value: '', id: '' }],
  beijing: [
    { name: '请选择区县', value: '', id: '' },
    { name: '东城区', value: 'dongcheng', id: 1 },
    { name: '西城区', value: 'xicheng', id: 2 },
    { name: '朝阳区', value: 'chaoyang', id: 3 },
    { name: '海淀区', value: 'haidian', id: 4 }
  ],
  tianjin: [
    { name: '请选择区县', value: '', id: '' },
    { name: '和平区', value: 'heping', id: 1 },
    { name: '河东区', value: 'hedong', id: 2 },
    { name: '河西区', value: 'hexi', id: 3 },
    { name: '南开区', value: 'nankai', id: 4 }
  ]
}
// 特殊处理
const homePageToLocation = (userInfo) => {
  const homePage = userInfo.homePage
  if (homePage) {
    const localArr = homePage.split(' ')
    return { province: localArr[0], city: localArr[1], district: localArr[2] }
  } else {
    return { province: '', city: '', district: '' }
  }
}
const locationToHomePage = (location) => Object.values(location).join(' ')

const filterUserInfo = (userInfo) => {
  const { nickname, title, company, homePage, introduction } = userInfo
  if (homePage === '') homePage = '   '
  return { nickname, title, company, homePage, introduction }
}
</script>
<script setup>
import { isMobile } from '@/utils/flexible'
import { computed, ref,  watch } from 'vue'
import { useStore } from 'vuex'
import AvatarUpload from './avatar-upload.vue'
import { Message } from '@/libs'
import {Confirm} from '@/libs'
import { useRouter } from 'vue-router'


const store = useStore()
const router = useRouter()

const storeUserInfo = computed(() => store.getters.userInfo)
const userInfo = ref({...storeUserInfo.value})
const avatar = ref(storeUserInfo.value.avatar)
const isSubmitLoading = ref(false)
const isSubmitDisabled = ref(true)
const isDialogVisible = ref(false)
// const location = ref(homePageToLocation(storeUserInfo.value)) // 特殊处理

// storeUserInfo变化 => userInfo 和 avatar 变化
// watch(storeUserInfo, () => {
//   userInfo.value = filterUserInfo(storeUserInfo.value)
//   avatar.value = storeUserInfo.value.avatar
//   location.value = homePageToLocation(storeUserInfo.value) // 特殊处理
// })
// 监听 userInfo 改变
watch(
  userInfo,
  (newVal, oldVal) => {
    if (newVal.avatar !== oldVal.avatar) {
      return
    }
    if (isSubmitDisabled.value) {
      isSubmitDisabled.value = false
    }
  },
  { deep: true }
)

const location = computed(() => {
  const homePage = userInfo.value.homePage
  if (homePage) {
    const localArr = homePage.split(' ')
    return { province: localArr[0], city: localArr[1], district: localArr[2] }
  } else {
    return { province: '', city: '', district: '' }
  }
})

const onProvChange = (e) => {
  // location.value.city = ''
  // location.value.district = ''
  // location.value.province = e.target.value // 特殊处理
  
  userInfo.value.homePage = `${e.target.value}  `
}
const onCityChange = (e) => {
  // location.value.district = ''
  // location.value.city = e.target.value // 特殊处理
  const homePage = userInfo.value.homePage.replace(/\s.*/,` ${e.target.value} `)
  userInfo.value.homePage = homePage
}
const onDistChange = (e) => {
  const homePage = userInfo.value.homePage.replace(/\s$/,` ${e.target.value}`)
  userInfo.value.homePage = homePage
}


// 提交基本信息
const onSubmitInfo = async () => {
  isSubmitLoading.value = true
  await store.dispatch('updateUserInfo', userInfo.value)
  //   ...userInfo.value,
  //   avatar: storeUserInfo.value.avatar
  // })
  // 同步 storeUserInfo 变化
  userInfo.value = {...storeUserInfo.value}
  // location.value = homePageToLocation(storeUserInfo.value) // 特殊处理

  Message({ type: 'success', message: '资料修改成功！' })
  isSubmitDisabled.value = true
  isSubmitLoading.value = false
}

const handleAvatarClick = () => isDialogVisible.value = true
const handleDialogClose = () => {
  isDialogVisible.value = false
  avatar.value = storeUserInfo.value.avatar
}

const onLogoutClick = () => {
  Confirm({ content: '确定退出登录吗？'}).then(() => store.commit('logout'))
}
</script>

<template>
<div
  class="h-full w-full bg-zinc-100 overflow-auto text-base font-semibold font-['Helvetica']"
  >
  <m-navbar v-if="isMobile">我的资料</m-navbar>
  <div class="border border-zinc-200 xl:max-w-screen-lg xl:mx-auto xl:mt-1 bg-white rounded xl:p-4 p-2">
      <!-- 标题 -->
      <div v-if="!isMobile" class="font-semibold text-center mb-3">
        编辑个人信息
      </div>

      <!-- 内容 -->
      <div class="xl:flex">
        <!-- 头像 -->
        <div class="xl:w-[25%] flex flex-col xl:items-center">
          <div class="font-semibold mb-1.5">头像</div>

          <div class="flex xl:flex-col flex-row items-center">
            <div
              class="group overflow-hidden relative xl:h-12 xl:w-12 h-8 w-8 xl:mr-0 mr-1 rounded-full border-4 border-zinc-200 mb-1.5"
            >
              <img
                ref="imageRef"
                class="w-full h-full rounded-full"
                :src="avatar"
              />
              <div
                @click="handleAvatarClick"
                class="xl:group-hover:opacity-100 opacity-0 cursor-pointer text-xs leading-[3rem] opacity-1 duration-300 absolute w-full h-full left-0 top-0 bg-zinc-800/40 text-center text-white"
              >
                更换头像
              </div>
            </div>
            <div class="w-[50%] text-sm xl:text-center text-left text-zinc-400 mb-2.5">
              支持 jpg、png、jpeg 格式大小 5M 以内的图片
            </div>
          </div>
          <!-- <div class="flex justify-center mb-2.5">
          <label @click="onRandomClick" class="text-main cursor-pointer mr-2"
            >换一换</label
          >
          <label for="avatar" class="text-main cursor-pointer">上传头像</label>
          <input
            @change="onFileChange"
            ref="fileRef"
            class="hidden"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png/jpeg"
          />
        </div>

        <div class="flex">
          <m-button
            :disabled="isAvatarSubmitDisabled"
            @click="onSubmitAvatar"
            class="mr-2"
            type="primary"
            >保存</m-button
          >
          <m-button @click="onCancelAvatar" class="" type="info">取消</m-button> -->
          <!-- </div> -->
        </div>
        <!-- 信息 -->
        <div class="xl:w-[75%]">
          <!-- 昵称 -->
          <div class="mb-2.5 flex xl:flex-row flex-col xl:items-center">
            <label class="w-10 xl:text-right xl:mb-0 mb-1" for="nickname">昵称：</label
            ><input
              placeholder="请输入昵称"
              v-model="userInfo.nickname"
              class="flex-grow focus:outline focus:outline-main p-1 bg-zinc-100 outline-none focus:bg-white duration-200 rounded-sm"
              type="text"
              minlength="2"
              maxlength="18"
            />
          </div>
          <!-- 职位 -->
          <div class="mb-2.5 flex xl:flex-row flex-col xl:items-center">
            <label class="w-10 xl:text-right xl:mb-0 mb-1" for="title">职位：</label>
            <select
              v-model="userInfo.title"
              name="title"
              id=""
              class="cursor-pointer flex-grow focus:outline focus:outline-main p-1 bg-zinc-100 outline-none focus:bg-white duration-200 rounded-sm"
            >
              <option
                v-for="title in titles"
                :key="title.id"
                :value="title.value"
              >
                {{ title.name }}
              </option>
            </select>
          </div>
          <!-- 性别 -->
          <div class="mb-2.5 flex xl:flex-row flex-col xl:items-center">
            <label class="w-10 xl:text-right xl:mb-0 mb-1" for="gender">性别：</label>
            <div>
              <input
                checked
                class="mx-1"
                name="gender"
                type="radio"
                id="male"
                value="male"
              /><label class="cursor-pointer" for="male">男</label>
              <input
                class="mx-1"
                name="gender"
                type="radio"
                id="female"
                value="female"
              /><label class="cursor-pointer" for="female">女</label>
            </div>
          </div>
          <!-- 地区 -->
          <div
            class="mb-2.5 flex xl:flex-row flex-col xl:items-center"
          >
            <label class=" w-10 xl:text-right xl:mb-0 mb-1" for="nickname"
              >所在地区：</label
            >
            <div class="flex flex-grow">
              <select
                :value="location.province"
                @change="onProvChange"
                name="province"
                id=""
                class="w-full xl:mb-0 mr-1 focus:outline focus:outline-main p-1 bg-zinc-100 outline-none focus:bg-white duration-200 rounded-sm"
              >
                <option
                  v-for="prov in provinces"
                  :key="prov.id"
                  :value="prov.value"
                >
                  {{ prov.name }}
                </option>
              </select>
              <select
                :value="location.city"
                @change="onCityChange"
                name="city"
                id=""
                class="w-full xl:mb-0 xl:mr-1 focus:outline focus:outline-main p-1 bg-zinc-100 outline-none focus:bg-white duration-200 rounded-sm"
              >
                <option
                  v-for="city in cities[location.province]"
                  :key="city.id"
                  :value="city.value"
                >
                  {{ city.name }}
                </option>
              </select>
              <select
                :value="location.district"
                @change="onDistChange"
                name="district"
                id=""
                class="w-full  focus:outline focus:outline-main p-1 bg-zinc-100 outline-none focus:bg-white duration-200 rounded-sm"
              >
                <option
                  v-for="district in districts[location.city]"
                  :key="district.id"
                  :value="district.value"
                >
                  {{ district.name }}
                </option>
              </select>
            </div>
          </div>
          <!-- 日期 -->
          <div class="mb-2.5 flex xl:flex-row flex-col xl:items-center">
            <label class="w-10 xl:text-right xl:mb-0 mb-1" for="brithday">出生日期：</label>
            <input
              v-model="userInfo.company"
              class="flex-grow focus:outline focus:outline-main p-1 bg-zinc-100 outline-none focus:bg-white duration-200 rounded-sm"
              type="date"
              id=""
              name="brithday"
            />
          </div>
          <!-- 介绍 -->
          <div class="mb-2.5 flex xl:flex-row flex-col"xl:>
            <label class="w-10 xl:text-right xl:mb-0 mb-1" for="nickname">个性签名：</label
            ><textarea
              v-model="userInfo.introduction"
              rows="4"
              class="flex-grow focus:outline focus:outline-main p-1 bg-zinc-100 outline-none focus:bg-white duration-200 rounded-sm"
              type="text"
            />
          </div>
          <!-- 提交 -->
          <div>
            <m-button
              :style="[isMobile?{width: '100%'}:{}]"
              :disabled="isSubmitDisabled"
              :loading="isSubmitLoading"
              @click="onSubmitInfo"
              class="mx-auto"
              type="primary"
              >保存修改</m-button
            >
            <m-button
              v-if="isMobile"
              style="width: 100%"
              @click="onLogoutClick"
              class="mx-auto mt-1"
              type="info"
              >退出登录</m-button
            >
          </div>
        </div>
      </div>
    </div>
    <AvatarUpload :visible="isDialogVisible" :userInfo="storeUserInfo"  @close="handleDialogClose"></AvatarUpload>
  </div>

</template>

<style scoped></style>
