<template>
  <div class="main">
      <v-row >
        <v-col
          cols="12"
          sm="6"
          class="hidden"
        >
          <v-img style="margin-left: 15%; margin-right: 15%;"
            src="https://res.cloudinary.com/cloud4files/image/upload/v1605574425/cloud2_porosn.png"
            max-width="600"
          ></v-img>
        </v-col>
        <v-col
          cols="12"
          md="6"
          sm="6"
          xs="6"
          >
          <v-card
            class="mx-auto rounded-xl"
            hover
            max-width="500" >
            <div style="max-width: 500px; padding:10%">
              <v-tabs
                color="secondary"
                right >
                <v-tab>Login</v-tab>
                <v-tab>{{ $t('register')}}</v-tab>
                <v-tab-item>
                    <Login></Login>
                </v-tab-item>
                <v-tab-item>
                  <Register></Register>
                </v-tab-item>
              </v-tabs>
            </div>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
  import Login from '@/components/Login.vue'
  import Register from '@/components/Register.vue'

  export default {
    components: {
      Login,
      Register,
    },

    data: () => ({
      //
    }),
    computed: {
      
    },
  };
</script>



