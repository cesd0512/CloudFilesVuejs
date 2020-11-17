<template>
  <div>
    <v-dialog
        v-model="dialog"
        max-width="500px">
        <v-card>
            <v-card-title style="justify-content: center; padding: 20px">
                {{ $t(title)}}
            </v-card-title>
            <v-card-text 
            align="center"
            justify="center">
                <v-img
                :src="image"
                max-width="80"
                ></v-img>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                text
                color="primary"
                @click="reload()"
                >
                {{ $t('close')}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>


<script>
  export default {
    name: 'Modal',
    props: ['dialog', 'title', 'image'],
    data() {
        return {
            // modal: false,
        }
    },
    
    computed: {
    },
    
    methods:{
        reload(){
        this.dialog = false;
        this.$router.push("/login");
        // location.reload();
        }
    }
  
  }
</script>

<style>  
</style>