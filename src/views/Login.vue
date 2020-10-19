<template>
  <div class="main">
    <v-row
      align="center"
      justify="center"
    >
      <v-icon
        color="indigo darken-2"
        large
        left
      >
        mdi-cloud-sync
      </v-icon>
      <h1 style="color: #424242; padding: 20px">Cloud4Files</h1>
    </v-row>
    <v-divider></v-divider>
    <div class="main">
    <v-tabs
      color="deep-purple accent-4"
      right
    >
      <v-tab>Login</v-tab>
      <v-tab>Registro</v-tab>
      <v-tab-item
        v-for="n in 3"
        :key="n"
      >
        <v-container fluid>
          <div style="padding-top: 5%"></div>
          <v-row no-gutters>
            <v-col
                cols="12"
                sm="6"

              >
            </v-col>
            <v-col
                cols="12"
                sm="6"
            >
              <v-divider ></v-divider><br/>
              <h2 style="color: #424242;">Inicie Sesión</h2>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="user"
                  :counter="10"
                  :rules="nameRules"
                  label="User"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :rules="emailRules"
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
                    sm="6"
                  >
                    <v-btn
                      class="ma-2"
                      :loading="loading4"
                      :disabled="loading4"
                      color="indigo"
                      dark
                      @click="loader = 'loading4'"
                      to="/"
                    >
                    Inicia Sesión
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
              <v-divider ></v-divider>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>

      
    </div>

  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'

  export default {
    data: () => ({
      valid: true,
      user: '',
      userRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      
      recovery: false,
    }),

    components: {
      Banner
    },

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>

<style>
  .main {
    align-self: center;
  }

</style>
