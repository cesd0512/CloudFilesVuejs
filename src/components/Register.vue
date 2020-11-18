<template>
  <v-container>
    <h2 style="color: #2D353D;">{{ $t('sign_in')}}</h2>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation >
        <v-text-field
          v-model="form.first_name"
          :label="$t('first_name')"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.last_name"
          :label="$t('last_name')"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          :label="$t('email')"
          :rules="[rules.required, rules.email]"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.username"
          :label="$t('user_name')"
          required
        ></v-text-field>

        <v-text-field
            v-model="form.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :label="$t('password')"
            :hint="$t('min_pwd')"
            class="input-group--focused"
            @click:append="show = !show"
            required
        ></v-text-field>

        <v-text-field v-if="form.password"
          v-model="form.password2"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          :label="$t('password_repeat')"
          :hint="$t('min_pwd')"
          class="input-group--focused"
          @click:append="show2 = !show2"
          required
        ></v-text-field>

        <v-row class="d-flex justify-center">
          <v-btn
            class="ma-2 rounded-lg"
            color="primary"
            block
            hover
            dark
            @click="submit()"
            >
            {{ $t('register')}}
          </v-btn>
          <Alert :message="message" :color="'pink'" :type="'error'"></Alert>
        </v-row>
    </v-form>
    <Modal
    :dialog="dialog"
    :title="'success_operation'"
    :image="'https://res.cloudinary.com/cloud4files/image/upload/v1605574424/cheque_tevqgd.png'">
    </Modal>
    
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Alert from '@/components/Alert';
import Modal from '@/components/Modal.vue';
// import Banner from '@/components/Banner.vue'

  export default {
    name: 'Register',

    data() {
      return {
        valid: true,
        message: null,
        form: {
          username: '',
          password: '',
          password2: '',
          first_name: '',
          last_name: '',
          email: '',
        },
        dialog: false,
        show: false,
        show2: false,
        rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },

    components: {
      Modal,
      Alert
      // Banner
    },

    methods: {
      ...mapActions(["Register"]),
      async submit() {
        let values = Object.values(this.form).join('');
        if (!values){
          this.message = 'fields_empty';
        } else if (this.form.password != this.form.password2){
          this.message = 'error_passwords';
        } else if (this.form.password.length < 8){
          this.message = 'min_pwd';
        } else {
          try {
            let res = await this.Register(this.form);
            if (res){
              this.message = 'Registro Existoso !!';
              this.dialog = true;
            }
          } catch (error) {
            this.message = 'error_connection';
          }

        }
        
      },
    }
  }
</script>
