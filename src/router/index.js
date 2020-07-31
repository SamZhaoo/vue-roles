import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import deepClone from '../assets/index'
/* eslint-disable*/
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: '',
		component: () => import('../views/login'),
	},
]
// 404路由
const notFoundRoutes = [
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/404'),
		hidden: true,
	},
	{ path: '*', redirect: '/404', hidden: true },
]

const routers = new VueRouter({
	routes,
})

const newRouters = [
	{
		path: '/home',
		name: 'home',
		component: () => import('../views/home'),
		children: [
			{
				path: 'red',
				name: 'red',
				component: () => import('../views/red'),
			},
			{
				path: 'yellow',
				name: 'yellow',
				meta: { role: 'b' },
				component: () => import('../views/yellow'),
			},
			{
				path: 'blue',
				name: 'blue',
				meta: { role: 'c' },
				component: () => import('../views/blue'),
			},
		],
	},
]

routers.beforeEach((to, from, next) => {
	// debugger
	if (store.state.roles) {
		if (store.state.routers.length != 0) {
			next()
		} else {
            // debugger
            let newchildren = []
            for(let item of newRouters[0].children){
                if(item.meta){
                    if(store.state.roles == item.meta.role||store.state.roles=='a'){
                        newchildren.push(item)
                    }
                } else {
                    newchildren.push(item)
                }
            }
			let routerArray = deepClone(newRouters) //深拷贝api数据
			routerArray[0].children = newchildren
            routers.addRoutes(routerArray) //添加动态路由
			store
				.dispatch('getRouters', routerArray)
				.then((res) => {
					next({ ...to })
				})
				.catch(() => {})
		}
	} else {
		next()
	}
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default routers
