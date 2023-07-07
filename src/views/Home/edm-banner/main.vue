<template>
    <swiper :modules="modules" :slides-per-view="1" :space-between="50" navigation :pagination="{ clickable: true }"
        :autoplay="{
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        }" :loop=true @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="banner in homeData.banner" :key="banner.id">
            <a href=":javascript" class="images">
                <img :src="banner.url" :alt="banner.title">
            </a>
        </swiper-slide>
    </swiper>
</template>
<script>
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useHome } from '../../../store/home'

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const homeData = useHome()
        const onSwiper = (swiper) => {
        };
        const onSlideChange = () => {
        };
        homeData.setBanner()
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, Pagination, Autoplay, A11y],
            homeData
        };
    },
};
</script>
<style lang="less" scoped>
.images {
    width: 100%;

    img {
        width: 100%;
        height: 560px;
    }
}
</style>