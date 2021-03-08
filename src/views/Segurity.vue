<template>
  
  <v-container class="grey lighten-5" >
    <v-expansion-panels
      v-model="panel"
      :disabled="disabled"
      multiple
    > 

      <v-expansion-panel>
        <v-expansion-panel-header class="headline font-weight-regular indigo white--text">
        User Config
        </v-expansion-panel-header>
        <v-expansion-panel-content style="margin: 40px">

          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="userName"
                :label="$t('user')"
                outlined
                disabled
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="apikey"
                label="apikey"
                outlined
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.email]"
                label="E-mail"
                outlined
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="altEmail"
                :label="$t('alternative_email')"
                :rules="[rules.required, rules.email]"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

        </v-expansion-panel-content>
      </v-expansion-panel>
      
      <v-expansion-panel>
        <v-expansion-panel-header class="headline font-weight-regular indigo white--text">
        Segurity Password
        </v-expansion-panel-header>
        <v-expansion-panel-content style="margin: 40px">
          <v-container >
            <v-row>
              <v-col
                cols="12"
                align="center"
                justify="center"
              >
                <v-text-field
                  v-model="password"
                  :rules="[rules.required]"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  :label="$t('password_change')"
                  :hint="$t('min_pwd')"
                  class="input-group--focused"
                  @click:append="show = !show"
                  outlined
                  autocomplete="off"
                ></v-text-field>
              </v-col>
            </v-row>
              <Alert :message="message" :color="'pink'" :type="'error'"></Alert>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
    <br/>
    <v-row>
      <v-col
        cols="12"
        align="center"
        justify="center"
      >
        <v-btn
          dark
          large
          color="secondary"
        >
          Save Changes
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

// @ is an alias to /src
import Alert from '@/components/Alert';
import store from "../store";
import { mapActions } from "vuex";
import axios from "axios";
import { setFiles, pagination, getImgUrl, getFileName } from '../functions';

export default {
  name: 'Home',
  data () {
      return {
        modal: false,
        panel: [0, 1],
        disabled: false,
        message: null,
        email: this.$store.getters.user.email,
        altEmail: this.$store.getters.user.alternative_email,
        apikey: this.$store.getters.user.token,
        password: '',
        user: this.$store.getters.user.username,
        show: false,
        rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
      }
    },

    components:{
      Alert,
    },

    watch: {
    },

    methods: {

    },

    computed: {
        userName(){
            this.user = this.$store.getters.user;
            var userName = '';
            if (this.user){
                userName = this.user.username;
            }
            return userName;
        }
    },

} 
</script>


<style>
</style>


