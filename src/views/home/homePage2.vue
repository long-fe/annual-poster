<template>
    <div class="big-bg">
        <submit-box></submit-box>
    </div>
</template>

<script>
import submitBox from '../submit/submit.vue'
// import 'vant/lib/button/style';
export default {
    data() {
        return {
            showSubmitFlag: true,
            windowWidth: '',
            windowHeight: '',
        }
    },
    components: {
        submitBox
    },
    methods: {
        showSubmit() {
            this.showSubmitFlag = true;
        },
        resizeWindow() {
            this.windowHeight = document.documentElement.clientHeight;
            this.windowWidth = document.documentElement.clientWidth;
            window.onload = () => {
                if(document.querySelector('.big-bg')) {
                    document.querySelector('.big-bg').style.height = this.windowHeight;
                }
            }
            window.resizeTo(this.windowWidth ,this.windowHeight)
        }
    },
    mounted() {
        this.resizeWindow()
    }
}
</script>

<style lang='less'>
@import './home.less';
</style>