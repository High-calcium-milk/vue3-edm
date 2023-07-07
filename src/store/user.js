import { defineStore } from 'pinia'
import { setUser } from '../api/main.js'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUser = defineStore('user', {
    state: () => {
        return {
            user: [{}]
        }
    },
    actions: {
        async setUser(key) {
            let result = await setUser(key)
            this.user = result
        },
    },
    getters: {
        musicName: (state) => {
            return state.user.data.likeMusic.map((item) => {
                return item.name
            })
        }
    }
})