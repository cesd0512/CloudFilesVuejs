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
        <v-container class="grey lighten-5" style="margin-top:5px">
          <v-row class="d-flex justify-center" style="margin:10px" >
            <v-col
              cols="12"
              md="8"
              align="center"
              justify="center"
              >
              <Banner :color="'primary'" :title="title" :icon="iconBar"></Banner>
            </v-col>
            <v-col
              cols="12"
              md="8"
              v-for="(f, ind) in fields"
              :key="ind"
              style="padding:0px"
            >
              <v-text-field v-if="f.type==='text'"  
              :label="f.label" 
              outlined 
              clearable 
              v-model="form[f.model]" >
              </v-text-field>

              <v-textarea v-else-if="f.type === 'textarea'"
              outlined :label="f.label" 
              clearable 
              v-model="form[f.model]" >
              </v-textarea>

              <InputFile v-else-if="f.type === 'file'" 
              :color="'primary'" 
              :label="f.label" 
              :placeholder="f.placeholder" 
              :size="f.size"
              >
              </InputFile>
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
              @click="execAction(action)"
              >
                {{ nomButton }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <div v-if="overlay">
        <v-dialog
          v-model="overlay"
          max-width="344"
        >
          <v-card
            >
            <v-card-title>{{okMessage}}</v-card-title>
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
        </v-dialog>
      </div>
    </v-row>
  </v-row>
</template>


<script>
  import { mapActions } from "vuex";
  import Banner from '@/components/Banner.vue';
  import InputFile from '@/components/InputFile.vue';
  import axios from "axios";

  export default {
    name: 'ModalForm',
    props: [
      'titleButton', 'iconButton', 'title', 'iconBar', 'nomButton',
      'color', 'okMessage', 'errorMensaje', 'fields', 'form', 'action'
      ],
    data() {
        return {
          dialog: false,
          overlay: false,
          zIndex: 0,
        }
    },
    components: {
      Banner,
      InputFile
    },
    
    computed: {
    },
    
    methods:{
      async execAction(action){
        this.dialog = false;
        this.overlay = true;
        await this.$emit('click', action);
      }

    }
  
  }
</script>

<style>  
</style>