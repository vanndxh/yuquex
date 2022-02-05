import { createStore } from 'vuex'

export default createStore({
  state: {
    uid: null,
    pass: "",
    aid: null,
    tid: null,
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
