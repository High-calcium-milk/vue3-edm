<template >
    <div class="hotSong">
        <div class="hotTop">
            <h6>热门榜单</h6>
            <h5 @click="index(4)"><router-link to="/List">更多></router-link></h5>
        </div>
        <div class="hotBottom">
            <el-row :gutter="20">
                <el-col :span="8" align="middle" justify="cneter">
                    <el-col :span="12">
                        <p>飙升榜</p>
                    </el-col>
                    <div class="grid-content ep-bg-purple">
                        <ol>
                            <li v-for="(surgeSong, index) in homeData.hotSong.surgeSong" :key="surgeSong.id">
                                <span v-show="userData.user?.data && userData.musicName.includes(surgeSong.name)"
                                    @click="mitter.emit('addRemoveMusic', surgeSong.name)"
                                    class="iconfont icon-shixin"></span>
                                <span v-show="!userData.user?.data || !userData.musicName.includes(surgeSong.name)"
                                    @click="mitter.emit('addRemoveMusic', surgeSong.name)"
                                    class="iconfont icon-kongxin"></span>
                                <a @click.prevent="play([surgeSong.url, surgeSong.name])" href="">{{ index + 1 + '-' +
                                    surgeSong.name }}</a>
                            </li>
                        </ol>
                    </div>
                </el-col>
                <el-col :span="8" align="middle" justify="cneter">
                    <el-col :span="12">
                        <p>Top500</p>
                    </el-col>
                    <div class="grid-content ep-bg-purple">
                        <ol>
                            <li v-for="(topSong, index) in homeData.hotSong.topSong" :key="topSong.id">
                                <span v-show="userData.user?.data && userData.musicName.includes(topSong.name)"
                                    @click="mitter.emit('addRemoveMusic', topSong.name)"
                                    class="iconfont icon-shixin"></span>
                                <span v-show="!userData.user?.data || !userData.musicName.includes(topSong.name)"
                                    @click="mitter.emit('addRemoveMusic', topSong.name)"
                                    class="iconfont icon-kongxin"></span>
                                <a @click.prevent="play([topSong.url, topSong.name])" href="">{{ index + 1 + '-' +
                                    topSong.name }}</a>
                            </li>
                        </ol>
                    </div>
                </el-col>
                <el-col :span="8" align="middle" justify="cneter">
                    <el-col :span="12">
                        <p>抖音热歌榜</p>
                    </el-col>
                    <div class="grid-content ep-bg-purple">
                        <ol>
                            <li v-for="(dySong, index) in homeData.hotSong.dySong" :key="dySong.id">
                                <span v-show="userData.user?.data && userData.musicName.includes(dySong.name)"
                                    @click="mitter.emit('addRemoveMusic', dySong.name)" class="iconfont icon-shixin"></span>
                                <span v-show="!userData.user?.data || !userData.musicName.includes(dySong.name)"
                                    @click="mitter.emit('addRemoveMusic', dySong.name)"
                                    class="iconfont icon-kongxin"></span>
                                <a @click.prevent="play([dySong.url, dySong.name])" href="">{{ index + 1 + '-' + dySong.name
                                }}</a>
                            </li>
                        </ol>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script setup>
import { useHome } from '../../../store/home'
import { useUser } from '../../../store/user'
import mitter from '../../../mitt/main'
const index = (index) => {
    mitter.emit('index', index)
}
const homeData = useHome()
const userData = useUser()
const play = (arr) => {
    mitter.emit('play', [...arr])
}
homeData.setHotSong()
</script>
<style lang='less' scoped>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.hotSong {
    width: 80%;
    margin: 40px auto 0px;
    overflow: hidden;

    .hotTop {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h6 {
            font-size: 30px;
            font-weight: normal;
        }

        h5 {
            cursor: pointer;
            color: #666666;
            font-weight: 400;
            font-size: 14px;

            &:hover {
                color: rgb(219, 50, 163);
            }
        }
    }

    .hotBottom {
        margin: 30px 0px 50px;
        overflow: hidden;
        box-shadow: 0px 0px 0px 1px #e6e2e2;
        padding: 10px 0;

        p {
            margin: 8px 0;
            padding: 10px;
            border-radius: 30px;
            background-color: aqua;
            color: pink;
            text-align: center;
            font-size: 24px;
            font-weight: normal;
        }

        ol {
            margin: 15px auto 0;
            width: 50%;

            li {
                padding: 10px;
                margin: 5px 0;
                text-align: left;
                font-size: 16px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                span.icon-shixin,
                span.icon-kongxin {
                    display: inline-block;
                    cursor: pointer;
                    margin: 0 10px;
                    color: red;
                    font-size: 20px;
                }

                a {
                    color: #000000;
                }

                a:hover {
                    color: #c93a5e;
                }

                &:last-child {
                    margin-left: -6px;
                }
            }

        }
    }

}
</style>