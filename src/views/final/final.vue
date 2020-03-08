<template>
    <div id="final" style="height: 100%;width:100%;">
        <div class="final-bg" id="final-bg" v-show="!hasImg">
            <div id="fakeImg">
                <div class="avatar-bg">
                    <!-- <img class="avartar-img" :src="imageUrl"/> -->
                    <van-image
                        fit="cover"
                        round
                        :src="imageUrl"
                    />
                    <div class="avatar-text-bg"></div>
                </div>
                <div class="name-bg">
                    <div class="name-class">{{name}}</div>
                </div>
            </div>
        </div>
        <img class="realImg" :src="dataURL" v-show="hasImg"/>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import axios from 'axios'
export default {
    data() {
        return {
            hasImg: false,
            dataURL: '',
            name: '',
            id: '',
            imageUrl: ''
        }
    },
    methods: {
        toImg() {
            var shareContent = document.querySelector('#final-bg');//需要截图的包裹的（原生的）DOM 对象
            var width = shareContent.offsetWidth; //获取dom 宽度
            var height = shareContent.offsetHeight; //获取dom 高度
            var canvas = document.createElement("canvas"); //创建一个canvas节点
            var scale = 1; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.getContext("2d").scale(scale,scale); //获取context,设置scale
            var opts = {
                scale:scale, // 添加的scale 参数
                canvas:canvas, //自定义 canvas
                width:width, //dom 原始宽度
                height:height, //dom 原始高度
                useCORS: true,
                proxy: 'http://www.nexusest.com/'
            }
            html2canvas(shareContent, opts)
            .then(canvas => {
                let imgUrl = canvas.toDataURL('image/png');
                this.dataURL = imgUrl;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.hasImg = true;
                    }, 3000)
                })
                
            })
        },
        getUser() {
            let params = {
                id: this.id
            }
            axios.post('http://www.nexusest.com/api/annual/user/getUser', params).then(res => {
                if (res && res.data && res.data.code === '200') {
                    let data = res.data.data;
                    this.name = `我是${data.name}`;
                    // 查询信息后，生成整体图片
                    if(data.imageUrl) {
                        this.$nextTick(() => {
                            let self = this;
                            let image = document.querySelector('.van-image__img');
                            image.setAttribute('crossOrigin', 'anonymous');
                            image.src = data.imageUrl;
                            image.onload = function(){
                                self.imageUrl = self.getBase64Image(image);
                                console.log(self.imageUrl);
                            }
                            this.toImg();
                        })
                    }
                } else {
                    //否则 Toast 提示
                    this.$toast.fail(res.data && (res.data.msg))
                }
            }).catch(err => {
                console.log(err)
                this.$toast.fail('系统异常')
            });
        },
        // 存储在服务器的图片url为绝对路径，需转化为base64，才可在html2canvas中正常显示
        getBase64Image(img) {  
            var canvas = document.createElement("canvas");  
            canvas.width = img.width;  
            canvas.height = img.height;  
            var ctx = canvas.getContext("2d");  
            ctx.drawImage(img, 0, 0, img.width, img.height);  
            var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
            var dataURL = canvas.toDataURL("image/"+ext);  
            return dataURL;  
        }  
    },
    mounted() {
        let id = localStorage.getItem('nexus-user-id');
        if(id) {
            this.id = id;
            // 如果有id， 则查询用户信息
            this.getUser();
        }
    }
}
</script>

<style lang='less'>
@import './final.less';
</style>