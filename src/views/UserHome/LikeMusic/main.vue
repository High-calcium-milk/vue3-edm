<template >
    <ul v-if="userData.user?.data">
        <li>
            <p>歌曲</p>
            <p>歌手</p>
            <p>时长</p>
        </li>
        <li v-for="(item, index) in userData.user.data.likeMusic" :key="item._id">
            <div>
                <span @click="emiter.emit('addRemoveMusic', item.name)" class="iconfont icon-shixin"></span>
                <!-- <span @click="removeMusic(item.name)" class="iconfont icon-kongxin"></span> -->
                <span @click="play([item.url, item.name])">{{ `${index + 1} - ${item.name}` }}</span>
            </div>
            <i>{{ item.singer }}</i>
            <i>{{ item.time }}</i>
        </li>
    </ul>
</template>
<script setup>
import { reactive } from 'vue'
import emiter from '../../../mitt/main'
import { useUser } from '../../../store/user'
const userData = useUser()
const play = (arr) => {
    emiter.emit('play', [...arr])
}
</script>
<style lang='less' scoped>
ul {
    width: 100%;

    li:nth-child(n+2):hover {
        cursor: pointer;
        box-shadow: 0 0 0 0.5px #000;
        background-color: #e2e2e2;
    }

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        vertical-align: middle;
        margin: 5px 0;
        padding: 0px 10px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #000;
        transition: all .5s;

        div {
            display: flex;
            align-items: center;

            span {
                margin-left: 10px;
            }

            span:last-child {
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        span.icon-shixin {
            color: red;
            font-size: 20px;
        }

        span.icon-kongxin {
            font-size: 20px;
        }

        div span:last-child:hover {
            color: skyblue;
        }

        i:nth-child(2):hover {
            color: skyblue;
        }

        div,
        i {
            width: 300px;
            text-align: center;
        }

        div {
            text-align: left;
        }

        i:last-child {
            text-align: right;
        }

    }

}
</style>