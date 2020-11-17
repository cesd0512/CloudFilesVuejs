<template>
  <v-list
    subheader
    two-line
    >
    <div>
      <v-text-field
        v-model="search"
        label="Buscar"
        class="mx-4"
      ></v-text-field>
    </div>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        md="10"
      >
        <v-list-item
          v-for="item in allItems"
          :key="item.id"
          link
          @click.native="sendItems(item.files)"
          to="/files"
        >
          <v-list-item-avatar>
            <v-icon
              class="grey lighten-1"
              dark
            >
              mdi-briefcase
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>

            <v-list-item-subtitle v-text="'Modificado '.concat(item.updated_at.split('T')[0], ' ', item.updated_at.split('T')[1].split('.')[0])"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-col>
      <div style="margin: auto;">
      <v-col
        cols="6"
        md="2"
      >
        <v-btn
          class="mx-2"
          dark
          rounded
          block
          color="indigo"
        >
          Crear
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
      </div>
    </v-row>

    

    <v-divider inset></v-divider>
  </v-list>
</template>


<script>
    export default {
      name: 'ListItems',
      props: ['items'],
      data() {
          return {
            search: '',
          }
      },
      
      computed: {
        allItems () {
          var itemsfound = [];
          if (this.search != '' && this.items.length > 0){
            for (let i of this.items){
              if (i.name.includes(this.search)){
                itemsfound.push(i);
              }
            }
          }
          if (itemsfound.length > 0){
            return itemsfound;
          }
          return this.items;
        }
          
      },
      
      methods:{
        sendItems (items) {
          this.$emit('cards', items);
        } 
      }
    
    }
</script>