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
        <v-tab-item>
          <Login></Login>
        </v-tab-item>
        <v-tab-item>
          <Register></Register>
        </v-tab-item>
      </v-tabs>
    </div>
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
  };
</script>
