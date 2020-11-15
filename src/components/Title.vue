<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-img
        :src="image"
        max-height="100"
        max-width="50"
      ></v-img>
      <h1 class="font-title">{{title}}</h1>
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>


<script>
  export default {
    name: 'Title',
    props: ['title', 'image'],
    data() {
        return {
        }
    },
    
    computed: {
        
    },
    
    methods:{

    }
  
  }
</script>

<style>
  .font-title {
    color: #2D353D; 
    padding: 10px;
    font-family: 'Roboto', sans-serif;
    font-size: 200%;
  }
</style>