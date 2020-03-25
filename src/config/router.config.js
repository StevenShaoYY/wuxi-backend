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
                meta: { title: '信息统计', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
                children: [
                    {
                        path: 'workplace',
                        name: 'Workplace',
                        component: () =>
                            import('@/views/dashboard/Workplace'),
                        meta: { title: '信息统计', keepAlive: true, permission: ['dashboard'] }
                    }
                ]
            },
            // 会员管理
            {
                path: 'huiyuan',
                name: 'huiyuan',
                redirect: '/huiyuan/single',
                component: RouteView,
                meta: { title: '会员管理', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
                children: [
                    {
                        path: '/huiyuan/single',
                        name: 'single',
                        component: () =>
                            import('@/views/huiyuan/single'),
                        meta: { title: '个人会员', keepAlive: true, permission: ['dashboard'] }
                    },
                    {
                        path: '/huiyuan/company',
                        name: 'company',
                        component: () =>
                            import('@/views/list/TableList'),
                        meta: { title: '单位会员', keepAlive: true, permission: ['dashboard'] }
                    },
                    {
                        path: '/huiyuan/Authentication',
                        name: 'Authentication',
                        component: () =>
                            import('@/views/list/TableList'),
                        meta: { title: '认证管理', keepAlive: true, permission: ['dashboard'] }
                    },
                    {
                        path: '/huiyuan/reply',
                        name: 'reply',
                        component: () =>
                            import('@/views/list/TableList'),
                        meta: { title: '反馈管理', keepAlive: true, permission: ['dashboard'] }
                    }
                ]
            },
            // 微信
            {
                path: 'weixin',
                name: 'weixin',
                redirect: '/weixin/index',
                component: RouteView,
                meta: { title: '公众号', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
                children: [
                    {
                        path: 'http://www.baidu.com',
                        name: 'weixin',
                        meta: { title: '图文管理', target: '_blank' }
                    }
                ]
            },
            // other
            {
                path: '/other',
                name: 'otherPage',
                component: PageView,
                meta: { title: '系统管理', icon: 'slack', permission: ['dashboard'] },
                redirect: '/other/icon-selector',
                children: [
                    {
                        path: '/other/list/user-list',
                        name: 'UserList',
                        component: () =>
                            import('@/views/other/UserList'),
                        meta: { title: '用户列表', keepAlive: true }
                    },
                    {
                        path: '/other/list/role-list',
                        name: 'RoleList',
                        component: () =>
                            import('@/views/other/RoleList'),
                        meta: { title: '角色列表', keepAlive: true }
                    },
                    {
                        path: '/other/list/system-role',
                        name: 'SystemRole',
                        component: () =>
                            import('@/views/role/RoleList'),
                        meta: { title: '角色列表2', keepAlive: true }
                    },
                    {
                        path: '/other/list/permission-list',
                        name: 'PermissionList',
                        component: () =>
                            import('@/views/other/PermissionList'),
                        meta: { title: '权限列表', keepAlive: true }
                    }

                ]
            },
            // forms
            {
                path: '/form',
                redirect: '/form/base-form',
                component: PageView,
                meta: { title: '表单页', icon: 'form', permission: ['dashboard'] },
                children: [{
                        path: '/form/base-form',
                        name: 'BaseForm',
                        component: () =>
                            import('@/views/form/BasicForm'),
                        meta: { title: '基础表单', keepAlive: true, permission: ['dashboard'] }
                    },
                    {
                        path: '/form/step-form',
                        name: 'StepForm',
                        component: () =>
                            import('@/views/form/stepForm/StepForm'),
                        meta: { title: '分步表单', keepAlive: true, permission: ['dashboard'] }
                    },
                    {
                        path: '/form/advanced-form',
                        name: 'AdvanceForm',
                        component: () =>
                            import('@/views/form/advancedForm/AdvancedForm'),
                        meta: { title: '高级表单', keepAlive: true, permission: ['dashboard'] }
                    }
                ]
            },

            // list
            {
                path: '/list',
                name: 'list',
                component: PageView,
                redirect: '/list/table-list',
                meta: { title: '列表页', icon: 'table', permission: ['dashboard'] },
                children: [{
                        path: '/list/table-list/:pageNo([1-9]\\d*)?',
                        name: 'TableListWrapper',
                        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
                        component: () =>
                            import('@/views/list/TableList'),
                        meta: { title: '查询表格', keepAlive: true, permission: ['dashboard'] }
                    },
                    {
                        path: '/list/basic-list',
                        name: 'BasicList',
                        component: () =>
                            import('@/views/list/StandardList'),
                        meta: { title: '标准列表', keepAlive: true, permission: ['dashboard'] }
                    },
                    {
                        path: '/list/card',
                        name: 'CardList',
                        component: () =>
                            import('@/views/list/CardList'),
                        meta: { title: '卡片列表', keepAlive: true, permission: ['dashboard'] }
                    },
                    {
                        path: '/list/search',
                        name: 'SearchList',
                        component: () =>
                            import('@/views/list/search/SearchLayout'),
                        redirect: '/list/search/article',
                        meta: { title: '搜索列表', keepAlive: true, permission: ['dashboard'] },
                        children: [{
                                path: '/list/search/article',
                                name: 'SearchArticles',
                                component: () =>
                                    import('../views/list/search/Article'),
                                meta: { title: '搜索列表（文章）', permission: ['dashboard'] }
                            },
                            {
                                path: '/list/search/project',
                                name: 'SearchProjects',
                                component: () =>
                                    import('../views/list/search/Projects'),
                                meta: { title: '搜索列表（项目）', permission: ['dashboard'] }
                            },
                            {
                                path: '/list/search/application',
                                name: 'SearchApplications',
                                component: () =>
                                    import('../views/list/search/Applications'),
                                meta: { title: '搜索列表（应用）', permission: ['dashboard'] }
                            }
                        ]
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
