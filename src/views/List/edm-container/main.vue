<template >
    <p><i>天天音樂</i>----{{ listData.currentHotSongName }} <span>{{ '2023 - 05 - 09' }}更新</span></p>
    <ul>
        <li @click="play($event, [song.url, song.name])" v-for="(song, index) in listData.currentHotSong" :key="song.id">
            <span class="no"><span v-show="userData.user?.data && userData.musicName.includes(song.name)"
                    class="iconfont icon-shixin"></span>
                <span v-show="!userData.user?.data || !userData.musicName.includes(song.name)"
                    class="iconfont icon-kongxin"></span>{{ index + 1 }} - {{ song.name }}</span>
            <span>{{ song.time }}</span>
        </li>
    </ul>
</template>
<script setup>
import { useList } from '../../../store/list'
import { ref } from 'vue'
import emiter from '../../../mitt/main'
import { useUser } from '../../../store/user'
const userData = useUser()
const play = (e, arr) => {
    if (e.target.nodeName === 'SPAN' && e.target.className !== 'no') {
        emiter.emit('addRemoveMusic', arr[1])
    } else {
        emiter.emit('play', arr)
    }
}

const listData = useList()
listData.setCurrentHotSong()
</script>
<style lang='less' scoped>
p {
    position: relative;
    padding: 20px 0;
    font-size: 30px;

    i {
        color: pink;
        font-weight: 700;
    }

    span {
        font-size: 16px;
    }

    &::after {
        position: absolute;
        content: "";
        background-color: #666;
        width: 200%;
        height: 1px;
        left: -50%;
        bottom: 0px;
        transform: scale(0.5);
    }
}

ul {
    margin-top: 20px;

    li {
        display: flex;
        padding: 5px 20px;
        justify-content: space-between;
        font-size: 16px;
        line-height: 40px;

        &:hover {
            cursor: pointer;
            color: skyblue;
            background-color: #ededed;
        }

        span:first-child span {
            margin-right: 10px;
            font-size: 20px;
            color: red;
        }
    }
}
</style>