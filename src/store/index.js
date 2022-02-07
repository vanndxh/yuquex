import { createStore } from 'vuex'

export default createStore({
  state: {
    uid: null,
    aid: null,
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
