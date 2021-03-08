<template>
  
  <v-container class="grey lighten-5" >
    <v-card
      class="mx-auto"
      max-width="90%"
      height="100%"
      tile
      color="gray"
    >
      <v-card-title class="headline font-weight-regular indigo white--text">
        Profile 
      </v-card-title>
      <v-img
        height="100%"
        :src="url_front"
      >
        <v-row
          class="fill-height"
        >
          <v-col
            align-self="start"
            class="pa-0"
            cols="12"
            align="center"
            justify="center"
          >
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-avatar
                  class="profile"
                  size="164"
                  tile
                  style="margin-left:20px; margin-top:20px;"
                >
                  <v-img :src="url"></v-img>
                  <v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      absolute
                      color="#036358"
                    >
                      <v-btn>
                        <input id="files" type="file" @change="previewImgProfile" style="display:none;" accept=".png, .svg, .jpg, .jpeg"  multiple>
                        <label for="files">Change</label>
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-avatar>
              </template>
            </v-hover>
          </v-col>
          <v-col 
            class="py-0"
            align="center"
            justify="center"
          >
            <v-list-item
              color="gray"
            >
              <v-list-item-content>
                <v-list-item-title class="title">
                  Marcus Obrien
                </v-list-item-title>
                <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="first_name"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="last_name"
                  label="Last Name"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="profession"
                  label="Profession"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="phone"
                  label="Phone"
                  outlined
                ></v-text-field>
              </v-col>

            </v-row>

            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="countries"
                  label="Country"
                  v-model="country"
                  outlined
                ></v-select>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="city"
                  label="City"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Birthday"
                      prepend-outer-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                    locale="es-419"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

            </v-row>

            <v-row>
              <v-col
                cols="12"
                align="center"
                justify="center"
              >
                <v-btn
                  dark
                  large
                  color="secondary"
                >
                  <v-icon left>
                    mdi-account-check
                  </v-icon>
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

// @ is an alias to /src
import Banner from '@/components/Banner.vue';
import ModalForm from '@/components/ModalForm.vue';
import MenuImage from '@/components/MenuImage.vue';
import InputFile from '@/components/InputFile.vue';
import store from "../store";
import { mapActions } from "vuex";
import axios from "axios";
import { setFiles, pagination, getImgUrl, getFileName } from '../functions';

export default {
  name: 'Home',
  data () {
      return {
        overlay: false,
        url: 'https://res.cloudinary.com/cloud4files/image/upload/v1614595716/user_weradd.png',
        url_front: '',
        countries: ['Colombia'],
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
      }
    },

    components:{
      InputFile,
    },

    watch: {
    },

    methods: {
      previewImgProfile(event) {
        const file = event .target.files[0];
        this.url = URL.createObjectURL(file);
      },

      previewImgFront(event) {
        const file = event .target.files[0];
        this.url_front = URL.createObjectURL(file);
      },

    }

} 
</script>


<style>
</style>


