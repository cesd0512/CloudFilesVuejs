<template>
  <div class="home">
    <v-container class="grey lighten-5" >
      <h2>Todos los Proyectos</h2><br/>
      <br>
      <Banner :title="title" :icon="icon"></Banner>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
          md="10"
        >
          <ListItems 
          :items="projects" 
          :scroller="true" 
          :searchInList="true"
          @click="selectedItem"
          >
          </ListItems>
        </v-col>
        <div style="margin: auto;">
          <v-col
            cols="6"
            md="2"
            class="fixedContainer"
          >
            <ModalForm 
            :titleButton="'New Project'" 
            :iconButton="'mdi-plus'" 
            :color="'secondary'" 
            :title="'Create Project'" 
            :iconBar="'mdi-briefcase'"
            :okMessage="'Proyecto Creado'"
            :errorMensaje="'Error'"
            :nomButton= "'Save'"
            :fields="fields"
            :form="form"
            :action="'saveProject'"
            @click="execAction"
            >
            </ModalForm>
          </v-col>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '@/components/Banner.vue';
import ListItems from '@/components/ListItems.vue';
import ModalForm from '@/components/ModalForm.vue';
import store from "../store";
import { mapActions } from "vuex";
import axios from "axios";
import { setFiles, pagination } from '../functions';

export default {
  name: 'Home',
  data() {
    return {
      icon: 'mdi-briefcase',
      title: 'Proyectos',
      fields: [
        {'type': 'text', 'label': 'Nombre', 'model': 'name',
        'placeholder': null, 'size': null
        },
        {'type': 'textarea', 'label': 'Descripción', 'model': 'description',
        'placeholder': null, 'size': null
        }
      ],
      form: {'name': '', 'description': ''},
      folders: [
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },
      ],
    }
  },

  components: {
    Banner,
    ListItems,
    ModalForm,
  },

  computed: {
    projects() {
      let projects = store.getters.projects;
      return projects;
    },

    recentProjects(){
      let projects = store.getters.recentProjects;
      console.log(projects);
      return projects;
    },

    lastLogin(){
      let lastLogin = 'LastLogin';
      if (store.getters.user){
        lastLogin = store.getters.user.last_login;
        lastLogin = lastLogin.split('T')[0] + ' ' + lastLogin.split('T')[1].split('.')[0]
        return lastLogin;
      }
    }

  },
  
  methods: {
    ...mapActions(["addProject", "setFiles"]),

    async selectedItem(item) {
      var token = store.getters.token;
      var object = {'token': token, 'projectId': item.id, 'pagination': pagination};
      await this.setFiles(object);
      let res = await axios.post("recent-projects/", {'project': item.id}, {
        headers: {
            'Authorization': `token ${token}` 
          }
      });
      console.log(res.data);
      this.$router.push("/files/?project="+item.id+'&n='+item.name);
    },

    async saveProject(){
      var token = store.state.auth.user.token;
      var object = {'token': token, 'form': this.form}
      var res = this.addProject(object);
      
      if (res.data){
        this.form.name = '';
        this.form.description = '';
      }
    },

    execAction(action){
      var EjecutarFuncion='this.' + action + '()';
      eval(EjecutarFuncion);
    }
  }
}
</script>


<style>
</style>


