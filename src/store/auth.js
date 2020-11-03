import axios from "axios";

const state = {
  user: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
};

const actions = {
  async Register({dispatch}, form) {
    await axios.post('account/registration/', form)
    let UserForm = new FormData()
    UserForm.append('username', form.username)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },

  async LogIn({commit}, user) {
    let res = await axios.post("account/authentication/", user);
    if (res.data.valid){
        await commit("setUser", user.get("username"));
    }
    return res.data.valid
  },

  async LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },

};

const mutations = {
  setUser(state, username) {
    state.user = username;
  },

  logout(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
