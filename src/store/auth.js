import axios from "axios";

const state = {
  user: null,
  color: '#DCE8F0'
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  stateUser: (state) => state.user,
  color: (state) => state.color,
};

const actions = {
  async Register({commit},form) {
    let res = await axios.post('account/registration/', form);
    let data = res.data;
    let result = false;
    if (data.status == 'ok'){
      result = true;
    }
    return result;

  },

  async LogIn({commit}, user) {
    let result = false;
    let res = await axios.post("account/authentication/", user);
    let data = res.data
    if (data.valid){
        await commit("setUser", data.user);
        result = data.valid
    }
    return result;
  },

  async LogOut({ commit }) {
    // let res = await axios.post("account/logout/");
    let user = null;
    commit("logout", user);
  }

};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  logout(state, user) {
    state.user = user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
