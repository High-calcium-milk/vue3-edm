<template >
    <div class="container">
        <div class="top">
            <p>天天音乐</p>
            <label for="text">登录：<input v-model="user" type=" text" name="text" id="text" /></label>
            <label for="password">密码：<input v-model="password" type="password" name="password" id="password" /></label>
        </div>
        <div class="buttom">
            <button @click="logReg">登录/注册</button>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import emiter from '../../mitt/main'
import { useUser } from '../../store/user'
const userData = useUser()
const user = ref()
const password = ref('')
const router = useRouter()
const list = ref({})
const logReg = async () => {
    if (user.value.trim() === '' || password.value.trim() === '') {
        alert('不能为空')
        return
    }
    await userData.setUser({ user: user.value, password: password.value })
    if (userData.user.msg === '密码正确') {
        alert('登陆成功！')
        emiter.emit('log', userData.user.data)
        router.push('/home')
    } else if (userData.user.msg === '密码错误') {
        alert('密码错误！')
    } else if (userData.user.msg === '注册成功') {
        alert('注册并登录成功！')
        emiter.emit('log', userData.user.data)
        router.push('/home')
    }
}
</script>
<style lang='less' scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 200px auto;
    width: 400px;
    height: 300px;
    background-color: skyblue;
    border-radius: 10px;

    .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        vertical-align: middle;
        width: 100%;
        height: 230px;

        p {
            font-size: 20px;
            font-weight: 700;
            color: rgb(231, 108, 26);
        }
    }

    .buttom {
        display: flex;
        justify-content: center;
        align-items: start;
        width: 100%;
        height: 70px;
    }

    label {
        font-size: 16px;
        line-height: 30px;
    }

    button {
        cursor: pointer;
        text-align: center;
        font-size: 16px;
        border: 1px solid skyblue;
        width: 100px;
        height: 40px;
        line-height: 40px;
        border-radius: 10px;

        &:hover {
            background-color: rgb(238, 172, 221);
        }
    }

    input {
        padding: 5px 10px;
        border: 1px solid #000;
        border-radius: 15px;
        width: 200px;
        height: 30px;
    }
}
</style>