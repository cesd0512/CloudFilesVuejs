<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          :color="color"
          fab
          right
          bottom
          v-bind="attrs"
          v-on="on"
          :title="titleButton"
          >
          <v-icon>{{iconButton}}</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="indigo"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          
        </v-toolbar>
        <v-container class="grey lighten-5" style="padding:20px; margin-top:20px">
        <v-row class="d-flex justify-center" >
          <v-col
            cols="12"
            md="8"
            align="center"
            justify="center"
            >
             <Banner :color="'primary'" :title="title" :icon="'mdi-briefcase'"></Banner>
          </v-col>
          <v-col
            cols="12"
            md="8"
          >
            <v-text-field
              label="Project Name"
              outlined
              clearable
              v-model="form.name"
            ></v-text-field>
            <v-textarea
              outlined
              name="input-7-4"
              label="Description of project"
              value=""
              clearable
              v-model="form.description"
            ></v-textarea>
          </v-col>
          <v-col
            cols="12"
            md="8"
            align="center"
            justify="center"
          >
            <v-btn 
              color="secondary"
              dark
              large
              hover
              min-width="120px"
              @click="save()"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <div v-if="overlay">
      <v-row justify="center">
        <v-overlay
        :z-index="zIndex"
        :value="overlay"
        >
          <v-card
            class="mx-auto"
            max-width="344"
            light
            >
            <v-card-title>Proyecto creado existosamente</v-card-title>
            <v-row justify="center" style="margin:20px">
              <v-btn
                class="white--text"
                color="other"
                @click="overlay = false"
              >
                Close
              </v-btn>
            </v-row>
            <br>
        </v-card>
      </v-overlay>
      </v-row>
   </div>
  </v-row>
</template>


<script>
  import { mapActions } from "vuex";
  import Banner from '@/components/Banner.vue';
  import axios from "axios";

  export default {
    name: 'ModalForm',
    props: ['titleButton', 'iconButton', 'title', 'iconBar', 'color'],
    data() {
        return {
          dialog: false,
          form: {
            'name': '',
            'description': ''
          },
          overlay: false,
          zIndex: 0,
        }
    },
    components: {
      Banner,
    },
    
    computed: {
    },
    
    methods:{
      ...mapActions(["CreateProject"]),

      async save(){
        let access_token = this.$store.state.auth.user.token;
        let res = await axios.post("projects/", this.form, {
        headers: {
            'Authorization': `token ${access_token}` 
          }
        });
        if (res.data){
          let projects = this.$store.state.auth.projects;
          projects.push(res.data.project);
          this.CreateProject(projects);
          this.form.name = '';
          this.form.description = '';
          this.dialog = false;
          this.overlay = true;
        }
      },

    }
  
  }
</script>

<style>  
</style>