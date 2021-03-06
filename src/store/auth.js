import axios from "axios";
import { uploadFiles } from "../functions";

const state = {
  user: null,
  projects: [],
  recentProjects: [],
  files: [],
  lengthPages: 1,
  inputFiles: []
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  user: (state) => state.user,
  token: (state) => state.user.token,
  projects: (state) => state.projects,
  recentProjects: (state) => state.recentProjects,
  recentFiles: (state) => state.recentFiles,
  files: (state) => state.files,
  lengthPages: (state) => state.lengthPages,
};

const actions = {

  async Register({commit}, form) {
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
        res = await axios.get('recent/projects/', {
          headers: {
            'Authorization': `token ${access_token}` 
          }
        });
        await commit("setRecentProjects", res.data);

        res = await axios.get('recent/files/', {
          headers: {
            'Authorization': `token ${access_token}` 
          }
        });
        console.log(res.data)
        await commit("setRecentFiles", res.data);
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

  async LogOut({ commit }, token) {
    let res = await axios.post("account/logout/", {}, 
      {
        headers: {
          'Authorization': `token ${token}` 
        }
    });
    let user = null;
    commit("logout", user);
    localStorage.clear();
    sessionStorage.clear();
  },

  async addProject({commit}, object){
    let res = await axios.post("projects/", object['form'], {
      headers: {
          'Authorization': `token ${object['token']}` 
        }
    });
    if (res.data){
      await commit("addProject", res.data.project);
    }
    return res;
  },

  async setFiles({commit}, object){
    let res = null;
    if (object.projectId){
      res = await axios.post('files-project/', 
      {
        "project": object['projectId'],
        "pagination": object['pagination']
      }, {
        headers: {
          'Authorization': `token ${object['token']}` 
        }
      });
    } else if(object.favorite){
      res = await axios.get('files/',  {
        headers: {
          'Authorization': `token ${object['token']}` 
        },
        params: {
          "favorite": object['favorite'],
          "pagination": object['pagination']
        }
      });

    } else {
      res = await axios.get('files/', {
        headers: {
          'Authorization': `token ${object['token']}` 
        },
        params: {
          'pagination': object['pagination']
        }
      });
    }
    if (res.data) {
      await commit("setFiles", res.data.results);
      let numPages = (res.data.count / object['pagination']);
      numPages = numPages.toString().split('.');
      let pages = 0
      if (numPages.length>1){
        let ind = numPages[1];
        let numInd = Number(ind[0]);
        if (numInd < 5){
          pages = 1;
        }
      }
      pages += Math.round(res.data.count / object['pagination']);
      if (pages == 0){
        pages = 1;
      }
      await commit("setPagination", pages);
    }
  },

  async addFiles({commit}, object){
    var formData = new FormData();
    formData.append("project", object['projectId']);
    let files = object['files']
    for (let i = 0; i < files.length; i++){
      formData.append("document", files[i]);
      let res = await axios.post('files/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `token ${object['token']}`
        }
      });
    }
    return {};
  }

};

const mutations = {
  
  setUser(state, user) {
    state.user = user;
    state.token = user.token;
  },

  logout(state, user) {
    state.user = user;
    state.projects = [];
  },

  setProjects(state, object){
    state.projects = object;
  },

  setRecentProjects(state, object){
    state.recentProjects = object;
  },

  setRecentFiles(state, object){
    state.recentFiles = object;
  },

  addProject(state, object){
    state.projects.push(object);
  },

  setFiles(state, object){
    console.log(object)
    state.files = object;
  },

  addFiles(state, array){
    for (let i=0; i < array.length; i++){
      state.files.push(object[i]);
    }
  },
  
  setPagination(state, data){
    state.lengthPages = data;
  }

};

export default {
  state,
  getters,
  actions,
  mutations,
};
