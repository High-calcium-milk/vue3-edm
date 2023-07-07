<script setup>
import Header from "./components/Header/main.vue";
import Footer from "./components/Footer/main.vue";
import Main from "./components/Main/main.vue";
import mitter from './mitt/main'
import { addRemove } from './api/main'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useUser } from './store/user'
const userData = useUser()
const router = useRouter()
onMounted(() => {
  mitter.on('addRemoveMusic', async (music) => {
    const user = JSON.parse(localStorage.getItem('users'))
    if (user) {
      await addRemove(music, user.user)
      await userData.setUser({ user: user.user, password: user.password })
      mitter.emit('musicName')
    } else {
      alert('请先登录！')
      router.push('/logReg')
    }
  })
})
</script>

<template>
  <div class="common-layout body">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<style scoped lang='less'>
.body {}
</style>
