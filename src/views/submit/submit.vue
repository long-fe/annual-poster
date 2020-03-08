<template>
    <div class="submit-bg">
        <div class="submit-box">
            <van-field
                v-model="name"
                clearable
                label="姓名"
                left-icon="user-circle-o"
                placeholder="请输入姓名"
            />
            <van-field
                v-model="department"
                clearable
                label="部门"
                left-icon="home-o"
                placeholder="请输入部门"
            />
            <van-button type="info" @click="submit">提交</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            department: '',
        }
    },
    methods: {
        submit() {
            if(!this.name) {
                this.$toast('请填写您的姓名');
                return
            }
            this.$router.push({
                name: 'preview',
                params: {
                    name: encodeURIComponent(this.name),
                    department: encodeURIComponent(this.department)
                }
            })
        }
    }
}
</script>

<style lang='less'>
@import './submit.less';
</style>