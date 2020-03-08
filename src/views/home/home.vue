<template>
    <div class="home-bg">
        <!-- <transition>
            <router-view></router-view>
        </transition> -->
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide>
                <home-page1></home-page1>
            </swiper-slide>
            <swiper-slide>
                <home-page2></home-page2>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import homePage1 from './homePage1.vue';
import homePage2 from './homePage2.vue';
export default {
    data() {
        return {
            swiperOption: {
                direction: 'vertical',
                height: window.innerHeight,
                notNextTick: true,
                noSwiping : true
            }
        }
    },
    components: {
        swiper, 
        swiperSlide,
        homePage1, 
        homePage2
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {},
    mounted() {
        let id = localStorage.getItem('nexus-user-id');
        if(id) {
            // 存在id，则直接跳转至结果页
            this.$router.push({name: 'final'})
        }
    }
}
</script>

<style lang='less'>
@import './home.less';
</style>