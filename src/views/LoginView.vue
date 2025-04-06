<!--
 * @Author: siwuxie
 * @Date: 2025-04-05 11:29:34
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-06 01:55:05
 * @FilePath: \bilibili-music\src\views\LoginView.vue
 * @Description: 登录页面
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
-->
<template>
  <div class="login-container">
    <el-card class="login-box">
      <div class="header">
        <h1 class="title">Bilibili Music</h1>
        <div class="subtitle">开启你的音乐之旅</div>
      </div>

      <el-button
        type="primary"
        native-type="submit"
        size="large"
        class="login-btn"
        @click="handleLogin"
      >
        立即登录
      </el-button>

      <el-dialog v-model="showQrDialog" title="" width="320" align-center>
        <div class="qr-container">
          <qrcode-vue :value="qrUrl" :size="200" level="H" />
        </div>
        <template #footer>
          <div class="dialog-footer">
            <p>请使用 Bilibili 手机客户端扫码登录</p>
            <div class="footer-btns">
              <el-button type="primary" class="half-btn" @click="refreshQrCode"> 刷新 </el-button>
              <el-button type="primary" class="half-btn" @click="closeDialog"> 关闭 </el-button>
            </div>
          </div>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import QrcodeVue from 'qrcode.vue'
import { useAuthStore } from '@/stores/authStore'
import { ElMessage } from 'element-plus'
import { generateLoginQrCode, checkLoginQrCodeStatus, getLoginInfo } from '@/api/bilibili'

const router = useRouter()
const userStore = useUserStore()
// =============================================================================>
const authStore = useAuthStore()
const showQrDialog = ref(false)
const qrUrl = ref('')
const qrCodeKey = ref('')
let timer = null

/**
 * 登录
 */
const handleLogin = async () => {
  try {
    // const qrData = await generateQrCode()
    // qrCodeKey.value = qrData.qrcode_key
    // qrUrl.value = qrData.url
    // showQrDialog.value = true
    // startPolling()

    await getLoginUserInfo()
  } catch (error) {
    console.error('生成二维码失败:', error)
    alert('登录初始化失败，请重试')
  }
}
/**
 * 获取登录用户信息
 */
const getLoginUserInfo = async () => {
  const authData = authStore.getAuthData()
  console.log('获取鉴权信息:', authData)
  const response = await getLoginInfo(authData.SESSDATA)
  console.log('获取登录信息:', response)
  if (response.code !== 0) throw new Error(response.message)

  console.log('登录信息:', response.data)
  return response.data
}

onMounted(async () => {
  try {
    const userInfo = await getLoginUserInfo()
    console.log('用户信息:', userInfo)
    if (userInfo.code === 0) {
      userStore.setUserInfo(userInfo.data)
      router.push({ name: 'home' })
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
})

/**
 * 生成登录二维码
 */
const generateQrCode = async () => {
  const response = await generateLoginQrCode()
  console.log('生成二维码:', response)
  if (response.code !== 0) throw new Error(response.message)

  console.log('二维码数据:', response.data)
  return response.data

  // const response = {
  //   code: 0,
  //   message: '0',
  //   ttl: 1,
  //   data: {
  //     url: 'https://account.bilibili.com/h5/account-h5/auth/scan-web?navhide=1&callback=close&qrcode_key=c79f1747e190e8955c8cb11e8b7f8c20&from=',
  //     qrcode_key: 'c79f1747e190e8955c8cb11e8b7f8c20',
  //   },
  // }
  // console.log('二维码数据:', response.data)
  // return response.data
}

/**
 * 轮询二维码登录状态
 {
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "url": "",
        "refresh_token": "",
        "timestamp": 0,
        "code": 86101,
        "message": "未扫码"
    }
  }
 *
 {
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "url": "",
        "refresh_token": "",
        "timestamp": 0,
        "code": 86090,
        "message": "二维码已扫码未确认"
    }
 }
 *
 {
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "url": "https://passport.biligame.com/x/passport-login/web/crossDomain?DedeUserID=3546881900677957\u0026DedeUserID__ckMd5=329da8731c69eda0\u0026Expires=1759418388\u0026SESSDATA=d0e5bf82,1759418388,47191*42CjCrHhtWL1OZzF5YFLo7WYKVz5-ot4zP3kVJ1b7zIlQ5kI6Js_I80PAcb9yehD4_qTASVnBkcERHb0NrYmYxZUwwQ28zTElxb2NDaEVDc1VmRUFsZWZSZnQzV2loNjJkblF1a0hiOXNudzJCMVZPMlhnSnpQbnZzZEJKWW1HRTZ2aTdQZy1wRzZBIIEC\u0026bili_jct=b0bc25d67baf622287dc0489acc76ca2\u0026gourl=https%3A%2F%2Fwww.bilibili.com\u0026first_domain=.bilibili.com",
        "refresh_token": "4ff32b34a46503e10c68fe627810aa42",
        "timestamp": 1743866388315,
        "code": 0,
        "message": ""
    }
  }
 *
 {
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "url": "",
        "refresh_token": "",
        "timestamp": 0,
        "code": 86038,
        "message": "二维码已失效"
    }
 }
 * @param {string} qrcodeKey 二维码的key
 */
const startPolling = () => {
  timer = setInterval(async () => {
    try {
      const res = await checkLoginQrCodeStatus(qrCodeKey.value)
      console.log('轮询结果:', res)
      const { code, message, data } = res
      if (code === 0) {
        const { url, refresh_token, code: checkCode, message: checkMessage } = data
        if (checkCode === 0) {
          // 保存登录状态
          authStore.saveAuthData({
            url,
            refresh_token,
          })

          clearInterval(timer)
          closeDialog()
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          // if (form.value.username && form.value.password) {
          //   userStore.login(form.value)
          //   router.push({ name: 'home' })
          // }
        } else if (checkCode === 86090) {
          console.log('二维码已扫码未确认')
        } else if (checkCode === 86101) {
          console.log('还未扫码:', message)
        } else if (checkCode === 86038) {
          console.warn(checkMessage)
          ElMessage({
            message: checkMessage,
            type: 'warning',
          })
        } else {
          console.warn('二维码登录状态:', checkMessage)
          ElMessage({
            message: checkMessage,
            type: 'error',
          })
          clearInterval(timer)
          closeDialog()
        }
      } else {
        console.warn('二维码登录状态:', message)
        clearInterval(timer)
      }
    } catch (error) {
      console.error('轮询错误:', error)
      ElMessage({
        message: '登录异常，请重试' + error,
        type: 'error',
      })
      clearInterval(timer)
    }
  }, 3000)
}

/**
 * 刷新二维码
 */
const refreshQrCode = async () => {
  try {
    const qrData = await generateQrCode()
    qrCodeKey.value = qrData.qrcode_key
    qrUrl.value = qrData.url
  } catch (error) {
    console.error('刷新二维码失败:', error)
    alert('刷新二维码失败，请重试')
  }
}

/**
 * 关闭二维码登录对话框
 */
const closeDialog = () => {
  showQrDialog.value = false
  clearInterval(timer)
}
</script>

<style scoped lang="scss">
.qr-container {
  text-align: center;
  padding: 20px;
}

.dialog-footer {
  text-align: center;
  .footer-btns {
    display: flex;
    justify-content: space-between;
    padding: 6px 0px;

    .half-btn {
      width: 100%;
      text-align: center;
    }
  }
}

.login-container {
  background: var(--current-secondary);
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 20%;

  .login-box {
    width: 90%;
    max-width: 450px;
    transition: all 0.3s;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .header {
    text-align: center;
    margin-bottom: 30px;
  }

  .title {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 8px;
  }

  .subtitle {
    color: var(--current-text);
    opacity: 0.8;
  }

  .login-form {
    padding: 0 20px;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    .login-box {
      width: 95%;
      margin: 20px;
    }

    .title {
      font-size: 1.5rem;
    }
  }
}
</style>
