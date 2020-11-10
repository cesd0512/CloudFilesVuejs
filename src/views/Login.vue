<template>
  <div class="main">
      <v-row 
      align="center"
      justify="center">
        <v-col
          v-if="look"
          cols="12"
          sm="6"
        >
          <v-img style="margin-left: 25%; margin-right: 5%;"
            src="cloud2.png"
            max-width="550"
          ></v-img>
        </v-col>
        <v-col
          cols="12"
          md="6"
          sm="6"
          xs="6"
          >
          <v-container 
          >
            <div style="max-width: 500px; padding:10%">
              <v-tabs
                color="other"
                right >
                <v-tab>Login</v-tab>
                <v-tab>Registro</v-tab>
                <v-tab-item>
                    <Login></Login>
                </v-tab-item>
                <v-tab-item>
                  <Register></Register>
                </v-tab-item>
              </v-tabs>
            </div>
          </v-container>
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
      look () {
        var look_image = true;
        if (screen.width <= 680 ){
          look_image = false;
        }
        console.log('---->', screen.height, screen.width);
        return look_image;
      },
      
    },
  };
</script>


<style>
  .main {
    align-self: center;
    padding-bottom:10%;
  }
  
</style>

