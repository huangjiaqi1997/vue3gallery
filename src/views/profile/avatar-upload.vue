<script setup>
import { ref, watch, useTemplateRef } from 'vue'
import { getSts, scr2blob, uploadImage } from '@/api/upload'
import OSS from 'ali-oss'
import { useStore } from 'vuex'
import { Message } from '@/libs'

const { visible, userInfo } = defineProps(['visible', 'userInfo'])
const emits = defineEmits(['close'])

const store = useStore()
const avatar = ref(userInfo.avatar)
const isSubmitDisabled = ref(true)
const isSubmitLoading = ref(false)
const fileRef = useTemplateRef('fileRef')
const file = ref('')

watch(avatar, () => {
  if (isSubmitDisabled.value) isSubmitDisabled.value = false
})

// 获取随机头像
const onRandomClick = async () => {
  // https://picsum.photos/200/200/?image= + Math.round(Math.random() * 20)
  const url = '/?image=' + Math.round(Math.random() * 20)
  const res = await scr2blob(url)
  file.value = res
  avatar.value = URL.createObjectURL(res)
}

// 获取阿里云上传凭证
const getCredentials = async () => {
  const res = await getSts()
  return res.Credentials
}

// 获取OSS实例
const getOSSClient = async () => {
  const { AccessKeyId, AccessKeySecret, SecurityToken } = await getCredentials()
  return new OSS({
    region: 'oss-cn-beijing',
    bucket: 'imooc-front',
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    stsToken: SecurityToken,
    refreshSTSToken: async () => {
      const { accessKeyId, accessKeySecret, stsToken } = await getCredentials()
      return { accessKeyId, accessKeySecret, stsToken }
    },
    refreshSTSTokenInterval: 5 * 1000
  })
}

// 上传到阿里云
let OSSClient = null
const uploadToOSS = async (filePath, file) => {
  !OSSClient && (OSSClient = await getOSSClient())
  const result = await OSSClient.put(filePath, file)
  return result.url
}

// 点击上传获取 fileURL
const onUploadClick = async () => {
  file.value = fileRef.value.files[0]
  avatar.value = URL.createObjectURL(file.value)
}

// 阿里云上传 + 更新用户信息
const onSubmit = async () => {
  isSubmitLoading.value = true
  const url = await uploadToOSS(
    `images/${userInfo.username}/${new Date().getTime()}.png`,
    file.value
  )

  await store.dispatch('updateUserInfo', {
    ...userInfo,
    avatar: url
  })
  isSubmitLoading.value = false
  Message({ type: 'success', message: '头像修改成功！' })
  emits('close')
}

const resetState = () => {
  avatar.value = userInfo.avatar
}

const handleClose = () => {
  emits('close')
  resetState()
}
</script>

<template>
  <m-dialog :visible="visible" @close="handleClose">
    <div
      class="xl:w-[450px] w-screen xl:h-auto h-screen xl:rounded xl:p-3 p-8 flex flex-col items-center bg-white text-base"
    >
      <div class="font-semibold mb-2.5">更换头像</div>

      <div
        class="xl:h-16 xl:w-16 h-12 w-12 rounded-full border-4 border-zinc-200 mb-2.5"
      >
        <img ref="imageRef" class="w-full h-full rounded-full" :src="avatar" />
      </div>

      <div class="flex justify-center mb-2.5">
        <label @click="onRandomClick" class="text-main cursor-pointer mr-2"
          >换一换</label
        >
        <label for="avatar" class="text-main cursor-pointer">上传头像</label>
        <input
          @change="onUploadClick"
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
          :loading="isSubmitLoading"
          :disabled="isSubmitDisabled"
          @click="onSubmit"
          class="mr-2"
          type="primary"
          >确定</m-button
        >
        <m-button @click="handleClose" class="" type="info">取消</m-button>
      </div>
    </div>
  </m-dialog>
</template>

<style scoped></style>
