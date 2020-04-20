<template>
  <v-container>
    <v-row>
      <v-col class="pb-1 mb-1" cols="7">
        <p class="text-left mb-0 headline">You should:</p>
      </v-col>
      <v-col cols="5">
        <p class="text-left mb-0 headline">Activity details</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7">
        <v-card class="mx-auto elevation-2" :height="200">
          <v-card-text>
            <p class="display-1 text--primary">{{ activity }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5 pt-0 pb-0">
        <div>
          <v-subheader class="font-weight-bold" v-text="'Type'"></v-subheader>
          <v-select height="5" v-model="selectedType" :items="types" solo></v-select>
        </div>
        <div>
          <v-subheader class="font-weight-bold" v-text="'Participants'"></v-subheader>
          <v-text-field
            v-mask="'####################'"
            :value="participants"
            @input="setParticipants"
            :rules="[rules.required]"
            solo
          ></v-text-field>
        </div>
        <div>
          <v-subheader v-text="'Budget'"></v-subheader>
          <v-slider :value="budget" @input="setBudget" min="0" max="100" dense></v-slider>
          <v-row class="slider-details">
            <v-col cols="3" class="pa-0 ma-0">
              <p class="text-left">cheap</p>
            </v-col>
            <v-spacer class="pr-5"></v-spacer>
            <v-col cols="5" class="pa-0 ma-0 pl-2">
              <p class="text-right pr-2">expensive</p>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7 pt-0">
        <v-btn
          @click="saveBtn"
          height="40"
          block
          color="#db524c"
          dark
          small
        >Save for later</v-btn>
      </v-col>
      <v-col cols="5 pt-0">
        <v-btn
          @click="hitMeBtn"
          height="40"
          block
          color="#6665fe"
          dark
          small
        >Hit me with a new one!</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import * as _ from 'lodash'
import {
  SET_ACTIVITY_TYPE,
  SET_BUDGET,
  SET_PARTICIPANTS,
  ACTIVITY_ACTION,
  SAVE_ACTIVITY_ACTION,
} from '../store/types'

export default {
  name: 'ActivitiesPage',
  data: () => ({
    types: [
      'education',
      'recreational',
      'social',
      'diy',
      'charity',
      'cooking',
      'relaxation',
      'music',
      'busywork',
    ],
    rules: {
      required: (value) => !!value || 'Required.',
    },
  }),
  computed: {
    ...mapState({
      activity: (state) => state.activity,
      participants: (state) => state.participants,
      budget: (state) => state.budget,
    }),
    selectedType: {
      get() {
        return this.$store.state.selectedType
      },
      set(newVal) {
        this.$store.commit(SET_ACTIVITY_TYPE, newVal)
        this.$store.dispatch(ACTIVITY_ACTION)
      },
    },
  },
  methods: {
    saveBtn() {
      this.$store.dispatch(SAVE_ACTIVITY_ACTION)
    },
    hitMeBtn() {
      this.$store.dispatch(ACTIVITY_ACTION)
    },
    setParticipants: _.debounce(function (newValue) {
      this.$store.commit(SET_PARTICIPANTS, newValue)
      this.$store.dispatch(ACTIVITY_ACTION)
    }, 500),
    setBudget: _.debounce(function (newValue) {
      this.$store.commit(SET_BUDGET, newValue)
      this.$store.dispatch(ACTIVITY_ACTION)
    }, 500),
  },
}
</script>

<style lang="scss">
.v-subheader {
  height: 25px !important;
  padding-left: 5px !important;
}

.slider-details {
  padding-left: 10px;
  position: relative;
  top: -25px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
