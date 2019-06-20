import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: 'SET_USER' // 用户信息
}

const state = { // 需要维护的状态
  isAutnenticated: false,  // 是否认证
  user: {},  // 存储用户信息
  id:'iGigi',//存储id信息
  eComment:'111',//评论邮箱
  dianzan:0,//点赞数
}

const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user,
  id: state=>state.id,
  eComment: state=>state.eComment,
  dianzan: state=>state.dianzan,
}

const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated)
      state.isAutnenticated = isAutnenticated
    else
      state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user)
      state.user = user
    else
      state.user = {}
  },
  chg(state,n)
  {
    state.id=n;
  },
  echa(state,n)
  {
    state.eComment=n;
  },
  dz(state,n)
  {
    state.dianzan=n;
  }
}

const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_IS_AUTNENTIATED, false)
    commit(types.SET_USER, null)
  },
  chg1(context,n)
  {
    context.commit('chg',n);
  },
  echa1(context,n)
  {
    context.commit('echa',n);
  },
  dz1(context,n)
  {
    context.commit('dz',n);
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
