import { defineStore } from 'pinia'
import { getList } from '../api/main.js'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useList = defineStore('list', {
    state: () => {
        return {
            currentHotSongName: '飙升榜',
            currentHotSong: []
        }
    },
    actions: {
        async setCurrentHotSong(key = '飙升榜') {
            let result = await getList(key)
            this.currentHotSong = result
        },
    },
})