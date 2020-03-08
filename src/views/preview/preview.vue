<template>
    <div class="preview-bg">
        <van-uploader
            :after-read="afterRead"
            :before-read="beforeRead"
            :max-count="1">
            <div class="poster-bg"></div>
        </van-uploader>
        <div class="text-bg"></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            name: decodeURIComponent(this.$route.params.name) || '',
            department: decodeURIComponent(this.$route.params.department) || '',
            id: '',
            imageUrl: '',
        }
    },
    methods: {
        // 上传前校验
        beforeRead(file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                this.$toast('请上传 jpg/png 格式图片');
                return false;
            }
            let isLt2M = file.size / 1024 / 1024 <= 2;
            if (!isLt2M) {
                this.$toast('图片大小1M以内');
                return false
            }
            return true;
        },
        // 上传后调用接口
        afterRead(file) {
            this.uploadImg(file.file)
        },
        // 上传图片
        uploadImg(file) {
            console.log(file)
            //new 一个FormData格式的参数
            let params = new FormData()
            params.append('file', file)
            let config = {
                headers: { //添加请求头
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('http://www.nexusest.com/api/annual/image/uploadImage', params, config).then(res => {
                console.log(res)
                if (res.data && res.data.code === '200') {
                    this.imageUrl = res.data.data;
                    this.saveUser();
                } else {
                    //否则 Toast 提示
                    this.$toast.fail(res.data && (res.data.msg))
                }
            }).catch(err => {
                this.$toast.fail('系统异常')
            });
        },
        saveUser() {
            let params = {
                name: this.name,
                department: this.department,
                imageUrl: this.imageUrl
            }
            axios.post('http://www.nexusest.com/api/annual/user/saveUser', params).then(res => {
                if (res && res.data && res.data.code === '200') {
                    // 上传成功，获取用户id
                    let id = res.data.data;
                    localStorage.setItem('nexus-user-id', id)
                    // 跳转结果页
                    this.$router.push({name: 'final'})
                } else {
                    //否则 Toast 提示
                    this.$toast.fail(res.data && (res.data.msg))
                }
            }).catch(err => {
                this.$toast.fail('系统异常')
            });
        }
    }
}
</script>

<style lang='less'>
@import './preview.less';
</style>