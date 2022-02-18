import { createStore } from 'vuex'

export default createStore({
  state: {
    uid: 0,
    aid: 0,
    tid: 0,
    uidTemp: 0,
    pass: "",

    isLogged: false,
    choice: "signin",
    searchData: [],

    axios: require('axios'),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
