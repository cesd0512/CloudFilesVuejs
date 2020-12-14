<template>
  <v-container >
    <v-col
      cols="12"
      sm="12"
      align="center"
      justify="center"
      >
    </v-col>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation >
        <v-text-field
          v-model="form.username"
          :label="$t('user')"
          required
          @keyup.enter="submit()"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          :label="$t('password')"
          type="password"
          required
          @keyup.enter="submit()"
        ></v-text-field>

        <v-row no-gutters>
          <Alert :message="message" :color="'pink'" :type="'error'"></Alert>
          <v-col
            cols="12"
            sm="12"
            align="center"
            justify="center"
            >
            <v-btn
              class="ma-2 rounded-lg"
              color="primary"
              block
              hover
              dark
              @click="submit()" > {{ $t('init_sesion')}}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            >
            <router-link class="forgot-password-link" to="/password-reset">¿{{ $t('recovery_password')}}?</router-link>
          </v-col>
        </v-row>
    </v-form>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Alert from '@/components/Alert';

  export default {
    name: 'Login',

    data: () => ({
        recovery: false,
        valid: true,
        form: {
            username: '',
            password: '',
        },
        message: null,
        overlay: false,
    }),

    components: {
      Alert
      // Banner
    },

    methods: {
      ...mapActions(["LogIn"]),
      async submit() {
        this.overlay = true;
        if (this.recovery) {
          console.log(document.cookie);
        }
        const User = new FormData();
        User.append("username", this.form.username);
        User.append("password", this.form.password);
        try {
            let res = await this.LogIn(User);
            if (res){
                this.$router.push("/");
            }else{
                this.message = 'error_session_start'
            }
        } catch (error) {
          this.message = 'error_connection'
        }
      },
    },
    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
  }
</script>
