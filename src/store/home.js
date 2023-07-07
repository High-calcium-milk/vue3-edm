import { defineStore } from 'pinia'
import { getHotSinger, getBanner, getHotSong } from '../api/main.js'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useHome = defineStore('home', {
    state: () => {
        return {
            hotSinger: [],
            hotSong: [],
            banner: []
        }
    },
    actions: {
        async setHotSinger(key = '华语') {
            let result = await getHotSinger(key)
            this.hotSinger = result
        },
        async setBanner() {
            let result = await getBanner()
            this.banner = result
        },
        async setHotSong() {
            let result = await getHotSong()
            this.hotSong = result
        },
    },
})