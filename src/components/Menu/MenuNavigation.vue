<template>
    <v-sheet height="auto" absolute> 
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
        <v-navigation-drawer v-model="drawer" absolute temporary >
            <v-list-item>

                <v-list-item-avatar>
                    <v-img src="fileIcon.ico"></v-img>
                </v-list-item-avatar>
            </v-list-item>

            <v-divider></v-divider>

            <v-list>
                <v-list-item-group
                v-model="selected"
                color="indigo"
                >
                    <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="selected=i"
                    >
                        <v-list-item-icon >
                            <v-icon medium color="indigo darken-2">{{ item.icon }}</v-icon>
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
            this.user = this.$store.getters.stateUser;
            var fullName = '';
            if (this.user){
                fullName = this.user.first_name + ' ' + this.user.last_name;
            }
            return fullName;
        }
    },

    methods: {
        async logout() {
            await this.$store.dispatch("LogOut");
            this.$router.push("/login");
        },
    },
};
</script>

<style>
  .userName {
    padding: 15px;
    color: white;
  }

</style>
