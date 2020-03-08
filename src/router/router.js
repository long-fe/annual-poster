// 加载子组件
import HOME from '@/views/home/home.vue'
import homePage1 from '@/views/home/homePage1.vue'
import homePage2 from '@/views/home/homePage2.vue'
import FINAL from '@/views/final/final.vue'
import PREVIEW from '@/views/preview/preview.vue'

const routes = [
    {
        path: '/',
        redirect: '/home' 
    },
    {
        path: '/home',
        name: 'home',
        component: HOME,
        children: [
            {
                path: 'homePage1',
                name: 'homePage1',
                component: homePage1
            },
            {
                path: 'homePage2',
                name: 'homePage2',
                component: homePage2
            }
        ]
    },
    {
        path: '/final',
        name: 'final',
        component: FINAL,
        children: []
    },
    {
        path: '/preview/:name/:department',
        name: 'preview',
        component: PREVIEW,
        children: []
    }
]

export default routes