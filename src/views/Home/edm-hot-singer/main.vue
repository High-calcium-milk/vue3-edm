<template >
    <div class="hotSinger">
        <div class="hotTop">
            <div>
                <el-row align='middle'>
                    <el-col :span="10">
                        <h6>热门歌手</h6>
                    </el-col>
                    <el-col :span="4">
                        <h5 :class="key === '华语' ? 'active' : ''" @mouseenter="getHotSinger('华语')">华语</h5>
                    </el-col>
                    <el-col :span="4">
                        <h5 :class="key === '欧美' ? 'active' : ''" @mouseenter="getHotSinger('欧美')">欧美</h5>
                    </el-col>
                    <el-col :span="4">
                        <h5 :class="key === '日韩' ? 'active' : ''" @mouseenter="getHotSinger('日韩')">日韩</h5>
                    </el-col>
                </el-row>
            </div>
            <span>更多></span>
        </div>
        <div class="hotBottom">
            <el-row :gutter="20" justify="space-between">
                <el-col :span="4" v-for="singer in homeData.hotSinger" :key="singer.id">
                    <div class="grid-content ep-bg-purple people">
                        <img :src="singer.url" :alt="singer.name">
                    </div>
                    <p>{{ singer.name }}</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useHome } from '../../../store/home'
const homeData = useHome()
const key = ref('华语')
const getHotSinger = (newKey) => {
    if (key.value === newKey) return
    key.value = newKey
    homeData.setHotSinger(newKey);
}
homeData.setHotSinger();

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

.hotSinger {
    margin: 40px auto;
    overflow: hidden;
    width: 80%;

    .hotTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        div {
            width: 50%;
        }

        span {
            color: #666666;
            font-weight: 400;
            font-size: 14px;
            cursor: pointer;

            &:hover {
                color: rgb(219, 50, 163);
            }
        }

        h6 {
            font-size: 30px;
            font-weight: normal;
        }

        h5 {

            cursor: pointer;
            width: 50px;
            height: 30px;
            padding: 0 5px;
            text-align: center;
            line-height: 30px;
            font-weight: 400;
            font-size: 16px;
            color: #666666;
            border-radius: 20px;

        }

        .active {
            background-color: rgb(0, 162, 255);
            border-radius: 20px;
            color: #ffffff;
        }
    }

    .hotBottom {
        margin: 20px 0;
        padding: 20px;
        box-shadow: 0px 0px 0px 1px #e6e2e2;

        .people {
            cursor: pointer;
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 200px;
                transition: all .3s;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }

        p {
            font-size: 18px;
            height: 36px;
            line-height: 36px;
            width: 200px;
            text-align: center;
            cursor: pointer;

            &:hover {
                color: #d6526f;
            }
        }
    }


}
</style>