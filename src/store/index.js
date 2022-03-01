import { createStore } from 'vuex'

export default createStore({
  state: {
    // 部分用于判定当前状态的id备份
    uid: 0,
    aid: 0,
    tid: 0,
    uidTemp: 0,

    // tabBar所需登陆判定，进入登录界面的默认页面，搜索内容暂存
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
