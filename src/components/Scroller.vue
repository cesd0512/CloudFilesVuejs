<template>
  <div>
      <v-virtual-scroll
        :bench="benched"
        :items="items"
        :height="height"
        item-height="64"
      >
        <template v-slot:default="{ item }">
          <v-list-item 
          :key="item.id"
          link
          >
            <v-row 
            @click="handleClick(item)"
            >
                <v-list-item-action>
                <v-btn
                    fab
                    small
                    depressed
                    color="primary"
                >
                    <!--<v-icon
                        dark
                    >
                        mdi-briefcase
                    </v-icon>-->
                    {{ item.name.substr(0, 1) }}
                </v-btn>
                </v-list-item-action>

                <v-list-item-content>
                <v-list-item-title> {{ item.name }} </v-list-item-title>
                </v-list-item-content>
            </v-row>

            <v-list-item-action>
              <Menu :items="itemsMenu" @click="execAction"></Menu>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
  </div>
</template>

<script>
  import store from "../store";
  import axios from "axios";
  import Menu from '@/components/Menu.vue'

  export default {
    props: ['items', 'height'],
    
    data: () => ({
      benched: 0,
      itemsMenu: [
                {'title': 'Edit', 'icon': 'mdi-pencil', 'action': 'actionEdit'},
                {'title': 'Delete', 'icon': 'mdi-delete', 'action': 'actionDelete'},
                {'title': 'Info', 'icon': 'mdi-information', 'action': 'actionInfo'},
            ]
    }),

    methods: {
        handleClick(item) {
            this.$emit("click", item);
        },
        actionEdit(){
            console.log('Editar');

        },
        actionDelete(){
            console.log('Borrar');

        },
        actionInfo(){
            console.log('informacion');

        },
        execAction(action){
            var EjecutarFuncion='this.' + action + '()';
            eval(EjecutarFuncion);
        }

    },

    computed: {
    },

    components: {
        Menu
    }
  }
</script>
