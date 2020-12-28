<template>
  <v-banner
    rounded
    width="100%"
  >
    <v-icon
      slot="icon"
      :color="color ? color : 'indigo'"
      size="36"
    >
      {{icon}}
    </v-icon>
    <h2>{{title}}</h2>

  </v-banner>
</template>


<script>
    export default {
        name: 'Banner',
        props: ['title', 'icon', 'color'],
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