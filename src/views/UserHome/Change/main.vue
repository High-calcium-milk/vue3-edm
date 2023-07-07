<template >
    <div class="container" v-if="userData.user?.data">
        <p>用户名：<span>{{ userData.user.data.name }}</span></p>
        <p>账号：<span>{{ userData.user.data.user }}</span></p>
        <button @click="change(1)">修改密码</button>
        <button @click="change(2)">修改用户名</button>
        <label v-show="cut === 1" for="">原密码：<input v-model="oldPw" type="password" /></label>
        <label v-show="cut === 1" for="">新密码：<input v-model="newPw" type="password" /></label>
        <label v-show="cut === 1" for="">确认密码：<input v-model="notarizePw" type="password" /></label>
        <label v-show="cut === 2" for="">用户名：<input v-model="user" type="text" /></label>
        <button @click="notarize" v-show="cut === 1 || cut === 2">确认</button>
        <button @click="change(0)" v-show="cut === 1 || cut === 2">取消修改</button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUser } from '../../../store/user'
import { changeName, changePW } from '../../../api/main'
import { useRouter } from 'vue-router'
import emiter from '../../../mitt/main'
const cut = ref(0)
const oldPw = ref('')
const newPw = ref('')
const notarizePw = ref('')
const user = ref('')
const userData = useUser()
const router = useRouter()
const change = (index) => {
    cut.value = index
}
const notarize = async () => {
    if (cut.value === 1 && (oldPw.value === '' || newPw.value === '' || notarizePw.value === '')) {
        alert('输入为空!')
        return
    }
    if (cut.value === 1) {
        if (oldPw.value !== userData.user.data.password) {
            alert('原密码不一致！')
            oldPw.value = ''
            newPw.value = ''
            notarizePw.value = ''
            return
        } else if (newPw.value !== notarizePw.value) {
            alert('新密码与确认密码不一致！')
            oldPw.value = ''
            newPw.value = ''
            notarizePw.value = ''
            return
        }
        if (confirm('确认修改吗！')) {
            changePW(userData.user.data.user, { password: newPw.value })
            alert('修改完成，请重新登录！')
            userData.user = []
            localStorage.removeItem('users')
            router.push('/LogReg')
            emiter.emit('exit')
        }
    } else {
        if (user.value.trim() === '') {
            alert('用户名不能为空！')
            return
        }
        if (confirm('确认修改吗！')) {
            const result = await changeName(userData.user.data.user, { name: user.value })
            userData.user.data.name = result.name
            user.value = ''
            cut.value = 0
        }
    }
}
</script>

<style lang='less' scoped>
.container {
    display: flex;
    flex-direction: column;
    font-size: 20px;

    P,
    label {
        margin-bottom: 20px;
        font-weight: 700;
    }

    button {
        margin-bottom: 20px;
        width: 90px;
        height: 40px;
    }

    label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 300px;

        input {
            padding: 0 8px;
            width: 200px;
            height: 30px;
            border: 1px solid #000;
            border-radius: 10px;
        }
    }

}
</style>