// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

    {
        path: '/',
        name: 'index',
        component: BasicLayout,
        meta: { title: '首页' },
        redirect: '/dashboard/workplace',
        children: [
            // dashboard
            {
                path: 'dashboard',
                name: 'dashboard',
                redirect: '/dashboard/workplace',
                component: RouteView,
                hideChildrenInMenu: true,
                meta: { title: '信息统计', keepAlive: true, icon: bxAnaalyse, permission: ['INFO'] },
                children: [
                    {
                        path: 'workplace',
                        name: 'Workplace',
                        component: () =>
                            import('@/views/dashboard/Workplace'),
                        meta: { title: '信息统计', keepAlive: true, permission: ['INFO'] }
                    }
                ]
            },
            // 会员管理
            {
                path: 'huiyuan',
                name: 'huiyuan',
                redirect: '/huiyuan/single',
                component: PageView,
                meta: { title: '会员管理', keepAlive: true, icon: 'car', permission: ['MEMBER'] },
                children: [
                    {
                        path: '/huiyuan/single',
                        name: 'single',
                        component: () =>
                            import('@/views/huiyuan/index'),
                        meta: { title: '个人会员', keepAlive: true, permission: ['MEMBER:PERSON'] }
                    },
                    {
                        path: '/huiyuan/company',
                        name: 'company',
                        component: () =>
                            import('@/views/companyHuiyuan/index'),
                        meta: { title: '单位会员', keepAlive: true, permission: ['MEMBER:COMPANY'] }
                    },
                    {
                        path: '/huiyuan/Authentication',
                        name: 'Authentication',
                        component: () =>
                            import('@/views/huiyuanCf/index'),
                        meta: { title: '认证管理', keepAlive: true, permission: ['MEMBER:AUTH'] }
                    },
                    {
                        path: '/huiyuan/reply',
                        name: 'reply',
                        component: () =>
                            import('@/views/huiyuan/replayManage'),
                        meta: { title: '反馈管理', keepAlive: true, permission: ['MEMBER:FEEDBACK'] }
                    }
                ]
            },
            // 微信
            {
                path: 'weixin',
                name: 'weixin',
                redirect: '/weixin/index',
                component: PageView,
                meta: { title: '公众号', keepAlive: true, icon: 'wechat', permission: ['WECHAT'] },
                children: [
                    {
                        path: '/index',
                        name: 'weixinIndex',
                        component: () =>
                            import('@/views/weixin/index'),
                        meta: { title: '图文管理', keepAlive: true, permission: ['WECHAT:NEWS'] }
                    }
                ]
            },
            // other
            {
                path: '/other',
                name: 'otherPage',
                component: PageView,
                meta: { title: '系统管理', icon: 'user', permission: ['SYSTEM'] },
                redirect: '/other/icon-selector',
                children: [
                    {
                        path: '/other/list/user-list',
                        name: 'UserList',
                        component: () =>
                            import('@/views/userList/index'),
                        meta: { title: '用户管理', keepAlive: true, permission: ['SYSTEM:ADMIN'] }
                    },
                    {
                        path: '/other/list/role-list',
                        name: 'RoleList',
                        component: () =>
                            import('@/views/roleList/index'),
                        meta: { title: '角色管理', keepAlive: true, permission: ['SYSTEM:ROLE'] }
                    }

                ]
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [{
                path: 'login',
                name: 'login',
                component: () =>
                    import(/* webpackChunkName: "user" */ '@/views/user/Login')
            },
            {
                path: 'register',
                name: 'register',
                component: () =>
                    import(/* webpackChunkName: "user" */ '@/views/user/Register')
            },
            {
                path: 'register-result',
                name: 'registerResult',
                component: () =>
                    import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
            },
            {
                path: 'recover',
                name: 'recover',
                component: undefined
            }
        ]
    },

    {
        path: '/test',
        component: BlankLayout,
        redirect: '/test/home',
        children: [{
            path: 'home',
            name: 'TestHome',
            component: () =>
                import('@/views/Home')
        }]
    },

    {
        path: '/404',
        component: () =>
            import(/* webpackChunkName: "fail" */ '@/views/exception/404')
    }

]
