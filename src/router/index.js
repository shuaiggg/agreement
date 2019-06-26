import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import signedList from '@/components/aside/signedList'
import classify from '@/components/aside/classify'
import agreement from '@/components/aside/agreement'
import signature from '@/components/aside/signature'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: "/login"
        },
        {
            path: '/login',
            name: 'login',
            component: login,
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            children: [{
                path: 'signedList',
                name: 'signedList',
                component: signedList,
                meta: { title: '签署管理' }
            }, {
                path: 'classify',
                name: 'classify',
                component: classify,
                meta: { title: '分类管理' }
            }, {
                path: 'agreement',
                name: 'agreement',
                component: agreement,
                meta: { title: '协议管理' }
            }, {
                path: 'signature',
                name: 'signature',
                component: signature,
                meta: { title: '签章管理' }
            }]
        }
    ]
})