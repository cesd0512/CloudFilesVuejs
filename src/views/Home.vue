<template>
  <div class="home">
    <v-container class="grey lighten-5" >
      <h5 class="lastLogin" style="height:5px; float: right; color:#B0B4B4">Last Login: {{lastLogin}}</h5>
      <h2>Página Principal</h2><br/>
      <Banner :title="title" :icon="icon"></Banner>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
          md="10"
        >
          <ListItems :items="projects" @click="handleClick"></ListItems>
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
            :fields="fields"
            :form="form"
            >
            </ModalForm>
          </v-col>
        </div>
      </v-row>
    </v-container>
    <v-container class="grey lighten-5" >
      <Banner :title="'Recientes'" :icon="'mdi-file'"></Banner>
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

export default {
  name: 'Home',
  data() {
    return {
      icon: 'mdi-format-list-checks',
      title: 'Proyectos',
      pagination: 8,
      fields: [
        {'type': 'text', 'label': 'Nombre', 'model': 'name', 'placeholder': null, 'size': null},
        {'type': 'textarea', 'label': 'Descripción', 'model': 'description', 'placeholder': null, 'size': null}
        ],
      form: {'name': '', 'description': ''}
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
    lastLogin(){
      let lastLogin = 'LastLogin';
      if (store.getters.user){
        lastLogin = store.getters.user.last_login;
        lastLogin = lastLogin.split('T')[0] + ' ' + lastLogin.split('T')[1].split('.')[0]
      return lastLogin;
        
      }
    }
    
  },
  created () {

  },
  
  methods: {
    async setItems (item) {
        var access_token = store.getters.user.token;
        let res = await axios.post('files-project/', {
            "project": item.id,
            "pagination": this.pagination
          }, {
          headers: {
            'Authorization': `token ${access_token}` 
            }
        });
        if (res.data) {
          store.state.files = res.data.results;
          store.state.lengthPages = Math.round(res.data.count/this.pagination) + 1;
          this.$router.push("/files/?project="+item.id+'&n='+item.name);
        }
    },
    handleClick(item) {
        this.setItems(item);
    }
  },

}
</script>


<style>
</style>


