import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
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
// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
         // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
         // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if(target.constructor===RegExp){
            result = target;
        }else {
         // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
     // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
     // 返回最终结果
    return result;
}
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
                    console.log(routers)
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
