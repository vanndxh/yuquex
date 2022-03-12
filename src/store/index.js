import { createStore } from 'vuex'

export default createStore({
  state: {
    // id相关
    uid: 0,
    aid: 0,
    tid: 0,
    uidTemp: 0,

    // tabBar相关
    isLogged: false,
    choice: "signin",
    searchData: [],


    // axios
    axios: require('axios'),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
