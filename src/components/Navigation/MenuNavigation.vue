<template>
    <v-sheet height="auto" class="mx-auto overflow-hidden"> 
        <v-toolbar class='indigo'>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-spacer></v-spacer>
            <b class="userName">{{ userName }}</b>
            <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
            </v-list-item-avatar>

            <v-menu bottom left >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="(item, i) in itemsRight"
                        :key="i"
                        @click="logout()"
                        link
                        >
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon >
                            <v-icon medium color="blue darken-2">{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>
        <v-navigation-drawer
        v-model="drawer"
        absolute 
        temporary
        height="100%"
         >
            <v-list-item>
                <v-img
                    src="https://res.cloudinary.com/cloud4files/image/upload/v1605574424/logo_wqlydh.png"
                    max-width="35px">
                </v-img>
            </v-list-item>

            <v-divider></v-divider>

            <v-list rounded style="padding:10px">
                <v-list-item-group
                v-model="selected"
                color="indigo"
                >
                    <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="dispatchUrl(i, item.url)"
                    >
                        <v-list-item-icon >
                            <v-icon medium color="indigo lighten-2">{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>


            </v-list>
        </v-navigation-drawer>
    </v-sheet>
</template>

<script>
import menuData from './menu-data';
import { mapActions } from "vuex";

export default {
    name: 'MenuNavigation',

    data () {
        return {
            drawer: false,
            items: menuData['itemsDrawer'],
            itemsRight: menuData['itemsRight'],
            selected: 0,
            user: '',
        }
    },
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isAuthenticated;
        },
        userName(){
            this.user = this.$store.getters.user;
            var fullName = '';
            if (this.user){
                fullName = this.user.first_name + ' ' + this.user.last_name;
            }
            return fullName;
        }
    },

    methods: {
        ...mapActions(["LogOut", "setFiles"]),

        async logout() {
            await this.LogOut(this.$store.getters.user.token);
            this.$router.push("/login");
        },

        async dispatchUrl(selected, url){
            this.selected = selected;
            var token = this.$store.getters.user.token;
            if (url.includes('file')){
                let object = {'pagination': 8, 'token': token};
                await this.setFiles(object);
            }
            else if (url.includes('favorites')){
                let object = {'pagination': 8, 'favorite':true, 'token': token};
                await this.setFiles(object);
            }
            if (this.$router.currentRoute.path != url) {
                this.$router.push(url);
            }
        }
    },
};
</script>

<style>
  .userName {
    padding: 15px;
    color: white;
  }

</style>
