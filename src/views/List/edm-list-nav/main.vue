<template >
    <ul class="contain">
        <li :class="listData.currentHotSongName === '飙升榜' ? 'active' : ''" @click="getHotSong('飙升榜')">飆升榜</li>
        <li :class="listData.currentHotSongName === 'Top500' ? 'active' : ''" @click="getHotSong('Top500')">Top500</li>
        <li :class="listData.currentHotSongName === '抖音熱歌榜' ? 'active' : ''" @click="getHotSong('抖音热歌榜')">抖音熱歌榜</li>
        <li :class="listData.currentHotSongName === '新歌榜' ? 'active' : ''" @click="getHotSong('新歌榜')">新歌榜</li>
    </ul>
</template>
<script setup>
import { useList } from '../../../store/list'
const listData = useList()
const getHotSong = (key) => {
    listData.currentHotSongName = key
    listData.setCurrentHotSong(key)
}
</script>
<style lang='less' scoped>
.contain {
    width: 180px;
    font-size: 16px;
    box-shadow: 0px 0px 0px 0.5px #e6e2e2;

    .active {
        cursor: pointer;
        color: skyblue;
        background-color: #ededed;
    }

    li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 30px;

        &:hover {
            cursor: pointer;
            color: skyblue;
            background-color: #ededed;
        }
    }
}
</style>