<template>
  <v-app>
    <notifications class="pa-5" />
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="5" md="6">
            <v-container>
              <nav-bar></nav-bar>
              <v-row>
                <router-view class="elevation-3 w-full content"></router-view>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import * as _ from 'lodash'
import Navbar from './components/Navbar.vue'
import { RANDOM_ACTIVITY_ACTION, SET_SAVED_ACTIVITIES } from './store/types'

export default {
  name: 'App',
  components: {
    'nav-bar': Navbar,
  },
  beforeMount() {
    this.$store.dispatch(RANDOM_ACTIVITY_ACTION)
    const savedActivites = JSON.parse(localStorage.getItem('activities'))
    console.log(savedActivites)
    if (!_.isEmpty(savedActivites)) {
      this.$store.commit(SET_SAVED_ACTIVITIES, savedActivites)
    }
  },
}
</script>

<style lang="scss">
.shadow--hider {
  height: 15px;
  position: relative;
  top: -7px;
  background-color: white;
  z-index: 10;
}

.content {
  position: relative;
  top: -14px;
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
