import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/main.vue'
import List from '../views/List/main.vue'
import Search from '../views/Search/main.vue'
import LogReg from '../views/LogReg/main.vue'
import Echart from '../views/Echart/main.vue'
import UserHome from '../views/UserHome/main.vue'
import LikeMusic from '../views/UserHome/LikeMusic/main.vue'
import Change from '../views/UserHome/Change/main.vue'
const routes = [
    {
        path: '/Home',
        component: Home
    },
    {
        path: '/List',
        component: List
    },
    {
        name: 'Search',
        path: `/Search/:val`,
        component: Search
    },
    {
        path: '/LogReg',
        component: LogReg
    },
    {
        path: '/echart',
        component: Echart
    },
    {
        path: '/UserHome',
        component: UserHome,
        children: [
            {
                name: 'LikeMusic',
                path: '/UserHome/LikeMusic',
                component: LikeMusic,
            },
            {
                name: 'Change',
                path: '/UserHome/Change',
                component: Change,
            },
        ]
    },
    {
        path: '/',
        redirect: '/Home'
    }
]
export default createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

