import Vue from 'vue'
import Vuex from 'vuex'
import apiData from '../api/index'
/* eslint-disable*/
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		roles: sessionStorage.getItem('roles'),
		routers: [],
	},
	mutations: {
		get_roles(state, val) {
			state.roles = val
		},
		get_routers(state, val) {
			state.routers = val
		},
	},
	actions: {
		getRoles({ commit }, val) {
			let data = {}
			let a = apiData.map((item) => {
				if (val.name === item.username) {
					sessionStorage.setItem('roles', item.role)
					commit('get_roles', item.role)
					return (data = {
						username: item.username,
						introduce: item.introduce,
					})
				}
				return data
			})
		},
		getRouters({ commit }, val) {
			commit('get_routers', val)
		},
		Logout({ commit, state }) {
			commit('get_roles', '')
			commit('get_routers', [])
			sessionStorage.removeItem('roles')
		},
	},
	modules: {},
})
