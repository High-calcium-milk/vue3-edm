<template >
    <ul class="searchTop">
        <li class="active">单曲</li>
        <li>歌单</li>
        <li>MV</li>
    </ul>
    <ul class="searchBottom">
        <li>搜索到 <span class="skyBlue">"{{ key }}"</span> 的结果</li>
        <li>
            <span>歌曲名</span>
            <span>专辑</span>
            <span>时长</span>
        </li>
        <li @click="play($event, [music.url, music.name])" v-for="music in searchMusicData" :key="music.id">
            <i> <span v-show="userData.user?.data && userData.musicName.includes(music.name)"
                    class="iconfont icon-shixin"></span>
                <span v-show="!userData.user?.data || !userData.musicName.includes(music.name)"
                    class="iconfont icon-kongxin"></span> {{ music.name
                    }}</i>
            <i>{{ music.album }}</i>
            <i>{{ music.time }}</i>
        </li>
    </ul>
</template>
<script setup>
import emiter from '../../mitt/main'
import { getSearchMusic } from '../../api/main'
import { ref } from 'vue'
import { useUser } from '../../store/user'
const userData = useUser()
const key = ref('')
const searchMusicData = ref([])
const play = (e, arr) => {
    if (e.target.nodeName === 'SPAN') {
        emiter.emit('addRemoveMusic', arr[1])
    } else {
        emiter.emit('play', arr)
    }
}
emiter.on('search', async (newValue) => {
    key.value = newValue
    let result = await getSearchMusic(newValue)
    searchMusicData.value = result
})
</script>
<style lang='less' scoped>
.searchTop {
    display: flex;
    position: relative;
    font-size: 20px;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 0.5px;
        width: 100%;
        background-color: #ededed;
    }

    .active {
        color: skyblue;
        line-height: 58px;
        border-bottom: 2px solid skyblue;
    }

    li {
        cursor: pointer;
        line-height: 60px;
        height: 60px;
        padding: 0 40px;

        &:hover {
            color: skyblue;
            line-height: 58px;
        }

    }
}

.searchBottom {
    margin-top: 30px;
    padding: 0px 50px;
    font-size: 16px;

    span {
        color: #c5c3c3;
    }

    .skyBlue {
        color: skyblue;
    }

    li:nth-child(n+3) {
        span {
            font-size: 20px;
            margin-right: 10px;
            color: red;
        }

        &:hover {
            background-color: #e0e3e4;
        }

        i:hover {
            cursor: pointer;
            color: skyblue;
        }

        i:nth-child(3n) {
            cursor: default;
            color: rgb(0, 0, 0);
        }

        i {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    li:nth-child(n+2) {
        display: flex;
        justify-content: space-between;
        padding: 15px 10px;

        i {
            width: 300px;

            &:nth-child(2) {
                text-align: center;
            }

            &:last-child {
                text-align: right;
            }
        }
    }
}
</style>