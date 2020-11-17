import axios from "axios";

const state = {
  user: null,
  color: '#DCE8F0',
  projects: []
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  stateUser: (state) => state.user,
  color: (state) => state.color,
  projects: (state) => state.projects,
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
        result = data.valid;
        let access_token = data.user.token
        res = await axios.get('projects/', {
          headers: {
            'Authorization': `token ${access_token}` 
          }
        });
        await commit("setProjects", res.data);
    }
    return result;
  },

  async PasswordRecovery({commit}, object) {
    let result = false;
    let res = await axios.post("account/recovery-password/", object);
    let data = res.data
    console.log(data);
    if (data.status === 'ok'){
        result = true;
    }
    return result;
  },

  async LogOut({ commit }) {
    // let res = await axios.post("account/logout/");
    let user = null;
    commit("logout", user);
  },

  async Projects({commit}, access_token) {
    console.log(access_token);
    let res = await axios.get('projects/', {
      headers: {
        'Authorization': `token ${access_token}` 
      }
    });
    await commit("setProjects", data.user);
    return res.data;

  },

};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  logout(state, user) {
    state.user = user;
  },
  setProjects(state, object){
    state.projects = object;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
