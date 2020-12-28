import axios from "axios";

const state = {
  user: null,
  // color: '#DCE8F0',
  projects: [],
  files: [],
  fileView: null,
  lengthPages: 1,
  openDialogForm: false
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  user: (state) => state.user,
  // color: (state) => state.color,
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
    if (data.status === 'ok'){
        result = true;
    }
    return result;
  },

  async LogOut({ commit }, access_token) {
    let res = await axios.post("account/logout/", {}, {
      headers: {
        'Authorization': `token ${access_token}` 
      }
    });
    let user = null;
    commit("logout", user);
    localStorage.clear();
  },


  async CreateProject({commit}, object){
    await commit("setProjects", object);
    return {};

  }

};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  logout(state, user) {
    state.user = user;
    state.projects = [];
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
