<script setup>
import { Search, UserFilled } from '@element-plus/icons-vue'
import { ref, toRef, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import emiter from '../../mitt/main'
import { useUser } from '../../store/user';
const activeIndex = ref('1')
const input = ref('')
const router = useRouter()
const log = ref(false)
const showUser = ref(false)
const userData = useUser()
const handleSelect = (key, keyPath) => {

}
onMounted(() => {
  const users = JSON.parse(localStorage.getItem('users'))
  if (users) {
    userData.setUser({ user: users.user, password: users.password })
    log.value = true
  }
})
emiter.on('log', (data) => {
  log.value = true
  localStorage.setItem('users', JSON.stringify({ user: data.user, password: data.password }))
})
emiter.on('index', (index) => {
  activeIndex.value = index
})
emiter.on('exit', () => {
  activeIndex.value = '8'
  log.value = false
})
const change = () => {
  if (input.value === '') {
    alert('不能为空')
    return
  }
  setTimeout(() => { emiter.emit('search', input.value) }, 1000)
  if (router.currentRoute.value.name === "Search") return
  router.push({
    path: `/Search/${input.value}`
  })
}
const exit = () => {
  if (confirm('确认退出吗！')) {
    log.value = false
    activeIndex.value = '1'
    localStorage.removeItem('users')
    userData.user = []
    router.push('/Home')
  }
}
</script>

<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="1"><router-link to="/Home">首页</router-link></el-menu-item>
        <el-input type="serach" v-model="input" class="ipt" size="small" placeholder="搜索音乐" :prefix-icon="Search"
          @keyup.enter.native="change" />
        <el-menu-item index="4"><router-link to="/List">榜单</router-link></el-menu-item>
        <el-menu-item index="5"><router-link to="/echart">图</router-link></el-menu-item>
        <el-menu-item index="6">歌单</el-menu-item>
        <el-menu-item index="8" v-if="log === false"><router-link to="/LogReg">登录/注册</router-link></el-menu-item>
        <div @mouseenter="showUser = true" @mouseleave="showUser = false" v-if="log === true" class="demo-type">
          <el-avatar :icon="UserFilled" />
          <ul v-show="showUser">
            <li @click="activeIndex = '9'"><router-link :to="{ name: 'LikeMusic' }">个人中心</router-link></li>
            <li @click="exit">退出</li>
          </ul>
        </div>
        <el-menu-item index="9" v-if="userData?.user?.data">{{ userData?.user?.data?.name }}</el-menu-item>
      </el-menu>
    </el-header>
  </el-container>
</template>

<style scoped lang='less'>
.demo-type {
  display: flex;
  position: relative;
  align-items: center;

  &>ul {
    // display: none;
    position: absolute;
    bottom: -75px;
    left: -30px;
    width: 100px;
    font-size: 16px;
    background-color: black;
    z-index: 99;

    li {
      text-align: center;
      height: 40px;
      line-height: 40px;
      color: aliceblue;
      padding: 5px;

      a {
        color: aliceblue;
      }

      &:hover {
        cursor: pointer;
        background-color: #666;
        color: #fff;
      }
    }
  }

  // &:hover>ul {
  //   display: block;
  // }
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
}

.ipt {
  width: 25%;
  height: 30px;
  margin-top: 12px;
  margin-left: 60px;
}
</style>
