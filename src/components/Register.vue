<template>
  <v-container>
    <h2 style="color: #6A6E71;">Registrarse</h2>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation >
        <v-text-field
          v-model="form.first_name"
          label="First Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.last_name"
          label="Last Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.username"
          label="User Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.password2"
          label="Password Repeat"
          type="password"
          required
        ></v-text-field>
        <v-row class="d-flex justify-center">
          <v-btn
            class="ma-2 rounded-xl"
            color="other"
            block
            hover
            dark
            @click="submit()"
            >
            Registro
            <template v-slot:loader>
            <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
            </span>
            </template>
          </v-btn>
        </v-row>
    </v-form>
    <p v-if="message != null" id="error">{{message}}</p>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
// import Banner from '@/components/Banner.vue'

  export default {
    name: 'Register',

    data: () => ({
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
    }),

    components: {
      // Banner
    },

    methods: {
      ...mapActions(["Register"]),
      async submit() {
        if (this.form.password != this.form.password2){
          console.log('error');
          this.message = 'Error!! Las contraseñas no coinciden';
        } else {
          try {
            let res = await this.Register(this.form);
            if (res){
              this.message = 'Registro Existoso !!';
              // this.$router.push("/login");
            }
          } catch (error) {
            console.log(error);
            this.message = 'Error al registrar usuario'
          }

        }
        
      },
    }
  }
</script>
