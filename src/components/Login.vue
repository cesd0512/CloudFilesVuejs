<template>
  <v-container>
    <h2 style="color: #424242;">Inicie Sesión</h2>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation >
        <v-text-field
          v-model="form.username"
          label="User"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          required
        ></v-text-field>

        <v-row no-gutters>
          <v-col
              cols="12"
              sm="6"
              >
              <v-checkbox
              v-model="recovery"
              label="Recordarme"
              required
              ></v-checkbox>
          </v-col>
          <v-col
            cols="12"
            sm="6" >
            <v-btn
              class="ma-2"
              color="indigo"
              dark
              @click="submit()" > Inicia Sesión
              <template v-slot:loader>
              <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
              </span>
              </template>
            </v-btn>
          </v-col>
        </v-row>
    </v-form>
    <p v-if="showError" id="error">Username or Password is incorrect</p>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

  export default {
    name: 'Login',

    data: () => ({
        recovery: false,
        showError: false,
        valid: true,
        form: {
            username: '',
            password: '',
        },
    }),

    components: {
      // Banner
    },

    methods: {
      ...mapActions(["LogIn"]),
      async submit() {
        const User = new FormData();
        User.append("username", this.form.username);
        User.append("password", this.form.password);
        try {
            let res = await this.LogIn(User);
            if (res){
                this.$router.push("/");
                this.showError = false
            }else{
                this.showError = true
            }
        } catch (error) {
          this.showError = true
        }
      },
    }
  }
</script>

<style>
  .main {
    align-self: center;
  }

</style>