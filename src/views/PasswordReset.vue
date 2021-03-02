<template>
  <div class="main">
    
    <div>
      <v-card  class="d-flex justify-center" height="500px" color="transparent"  flat light v-if="reset">
        
        <v-card 
        class="pa-6"
        align="center"
        justify="center"
        width="600px"
        >

          <v-col
          cols="12"
          sm="12"
          >
            <router-link class="forgot-password-link" to="/login">{{ $t('return')}}</router-link>
          </v-col>
          <h2 style="color: #2D353D; padding: 10px">{{ $t('reset_pwd_title')}}</h2><br>
          <v-text-field
            v-model="password"
            :rules="[rules.required]"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            :label="$t('password')"
            :hint="$t('min_pwd')"
            class="input-group--focused"
            @click:append="show = !show"
            outlined
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            v-model="password2"
            :rules="[rules.required]"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            :label="$t('password_repeat')"
            :hint="$t('min_pwd')"
            class="input-group--focused"
            @click:append="show2 = !show2"
            outlined
            autocomplete="off"
          >
          </v-text-field>
          <Alert :message="message" :color="'pink'" :type="'error'"></Alert>
          <v-btn
            class="ma-2"
            color="primary"
            dark
            hover
            @click="submit()"
            >
            {{ $t(nameButton)}}
          </v-btn>
        </v-card>

      </v-card>

      <!-- Correo -->
      <v-row no-gutters v-if="!reset">
          <v-col
          cols="12"
          >
            <router-link class="forgot-password-link" to="/login">{{ $t('return')}}</router-link>
            <h2 style="color: #2D353D; padding: 10px">{{ $t('reset_pwd_title')}}</h2><br>
          </v-col>
          <br>
          <v-col  
          cols="12"
          md="6"
          sm="6"
          xs="6"
          >
            <v-text-field
              v-model="email"
              :label="$t('email')"
              :rules="[rules.required, rules.email]"
              prepend-inner-icon="mdi-email"
              outlined
            ></v-text-field>
          </v-col>

          <v-col class="extend"
            cols="12"
            md="6"
            sm="6"
            xs="6"
            >
            <v-btn
              class="ma-2"
              color="primary"
              dark
              hover
              @click="submit()"
              >
              {{ $t(nameButton)}}
            </v-btn>
          </v-col>
        <Alert :message="message" :color="'pink'" :type="'error'"></Alert>
        
      </v-row>

    </div>
    
    <ModalMessage :dialog="dialog" 
    :title="'success_operation'" 
    :image="'https://res.cloudinary.com/cloud4files/image/upload/v1605574424/cheque_tevqgd.png'"
    :redirect="'/login'">
    </ModalMessage>

  </div>
</template>

<script>
import { mapActions } from "vuex";
import Alert from '@/components/Alert';
import ModalMessage from '@/components/ModalMessage.vue';

  export default {
    components: {
      Alert,
      ModalMessage
    },

    data: () => ({
      message: null,
      email: '',
      password: '',
      password2: '',
      user: null,
      show: false,
      show2: false,
      nameButton: 'send_email',
      dialog: false,
      rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
    }),

    methods: {
      ...mapActions(["PasswordRecovery"]),
      async submit() {
        const Object = new FormData();
        if (this.reset) {
          Object.append("password", this.password);
          Object.append("password2", this.password2);
          Object.append("user", this.user);
        } else {
          if (!this.email){
            this.message = 'fields_empty';
            return null;
          }
          Object.append("email", this.email);
        }
        let res = await this.PasswordRecovery(Object);
        if (res){
          this.dialog = true;
        } else {
          this.message = 'error_connection';
        }
      }
    },

    computed: {
      reset() {
        let reset = false;
        let currentUrl = window.location.href;
        let url = new URL(currentUrl);
        if (url.searchParams.get("u")){
          this.user = url.searchParams.get("u");
          reset = true;
          this.nameButton = 'change_pwd';
        }
        return reset;


      }
    },

  };
</script>


