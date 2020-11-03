import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from "./auth";

Vue.use(Vuex)
// Vue.mixin({
//   data: function() {
//     return {
//       drawer:false
//     }
//   }
// })

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
  },
  plugins: [createPersistedState()],
})
