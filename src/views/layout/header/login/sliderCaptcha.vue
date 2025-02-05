<script setup>
import '@/vendor/SliderCaptcha/src/disk/longbow.slidercaptcha.js'
import '@/vendor/SliderCaptcha/src/lib/font-awesome/css/font-awesome.min.css'
import '@/vendor/SliderCaptcha/src/disk/slidercaptcha.css'
import { onMounted } from 'vue'
// import { verifyCaptcha } from '@/api/user'

const emits = defineEmits(['finish', 'close'])
let captcha = null

const finish = (result) => {
  const timer = setTimeout(function () {
    clearTimeout(timer)
    captcha.reset()
    emits('finish', result)
  }, 500)
}

const handleClose = () => emits('close')

onMounted(() => {
  captcha = sliderCaptcha({
    id: 'captcha',
    setSrc: 'https://picsum.photos/300/200',
    onSuccess: (arr) => {
      finish(true)
    },
    onFail: () => finish(false)
    // remoteUrl: '/sys/captcha'
    // verify: async (arr, url) => {
    //   const res = await verifyCaptcha({ behavior: arr })
    //   console.log('res', res)
    // }
  })
})
</script>

<template>
  <div class="container-fluid bg-white">
    <div class="form-row">
      <div class="col-12">
        <div class="slidercaptcha card">
          <div class="card-header">
            <span>请完成安全验证!</span>
            <!-- 关闭图标 -->
            <m-svg-icon
              name="close"
              class="group w-1.5 h-1.5 cursor-pointer absolute right-1.5 top-1.5"
              fillClass="fill-zinc-400 group-hover:fill-zinc-600 duration-300"
              @click="handleClose()"
            ></m-svg-icon>
          </div>
          <div class="card-body">
            <div id="captcha"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slidercaptcha {
  margin: 0 auto;
  width: 314px;
  height: 286px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.125);
  margin-top: 40px;
  font-size: 0.4rem;
}

.slidercaptcha .card-body {
  padding: 0.4rem;
}

.slidercaptcha canvas:first-child {
  border-radius: 4px;
  border: 1px solid #e6e8eb;
}

.slidercaptcha.card .card-header {
  background-image: none;
  background-color: rgba(0, 0, 0, 0.03);
}

.slidercaptcha.card {
  margin-top: 0;
}
.refreshIcon {
  right: 0.6rem;
  top: -1.34rem;
}

.sliderContainer {
  margin-top: 0.2rem;
}
</style>
