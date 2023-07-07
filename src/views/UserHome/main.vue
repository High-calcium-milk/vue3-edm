<template >
    <div class="container">
        <ul class="nav">
            <li :class="active === '个人喜爱' ? 'active' : ''" @click="change('个人喜爱')">
                <router-link :to="{ name: 'LikeMusic' }">个人喜爱音乐</router-link>
            </li>
            <li :class="active === '个人资料' ? 'active' : ''" @click="change('个人资料')">
                <router-link :to="{ name: 'Change' }">修改个人资料</router-link>
            </li>
        </ul>
        <div class="context">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
const active = ref('个人喜爱')
const route = useRoute()
const change = (text) => {
    active.value = text
}
onMounted(() => {
    if (route.path === '/UserHome/Change') {
        active.value = '个人资料'
    }

})
</script>
<style lang='less' scoped>
.container {
    display: flex;
    margin: 0 auto;
    width: 1200px;
}

.nav {
    box-shadow: 0 0 0 .5px #000;
    width: 200px;
    height: 150px;
    line-height: 50px;

    li {
        margin: 0 0 5px;
        padding: 0 10px;
        font-size: 16px;
        text-align: center;

        a {
            display: inline-block;
            width: 100%;
            color: rgb(0, 0, 0);
        }

        &:hover {
            cursor: pointer;
            background-color: #a5a4a4;
        }

        &.active {
            cursor: pointer;
            background-color: #a5a4a4;
        }
    }
}

.context {
    padding: 0 20px;
    width: 1000px;
}
</style>