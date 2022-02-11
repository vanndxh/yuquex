import { createStore } from 'vuex'

export default createStore({
  state: {
    uid: 0,
    aid: 0,
    tid: null,
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
