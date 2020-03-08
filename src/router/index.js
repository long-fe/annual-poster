import Vue from 'vue'
// 引入router
import Router from 'vue-router'
// 引入路由
import routes from './router.js'
// 使用路由
Vue.use(Router)

// 全局路由守卫
// router.beforeEach((to, from, next) =>{
    
// })

// 暴露路由接口
export default new Router({
    mode: 'history',
    routes,
    base: '/annual/'
})