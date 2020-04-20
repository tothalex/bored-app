import Vue from 'vue'
import * as _ from 'lodash'

import {
  SET_ACTIVITY, SET_ACTIVITY_TYPE, SET_BUDGET, SET_PARTICIPANTS, PUSH_ACTIVITY, REMOVE_ACTIVITY,
  CLEAR_ACTIVITY, SET_SAVED_ACTIVITIES,
} from './types'

export default {
  [SET_ACTIVITY](state, payload) {
    state.activity = payload
  },

  [SET_ACTIVITY_TYPE](state, payload) {
    state.selectedType = payload
  },

  [SET_BUDGET](state, payload) {
    state.budget = payload
  },

  [SET_PARTICIPANTS](state, payload) {
    state.participants = payload
  },

  [SET_SAVED_ACTIVITIES](state, payload) {
    state.savedActivities = payload
  },

  [PUSH_ACTIVITY](state, payload) {
    state.savedActivities.push(payload)
    Vue.notify({
      type: 'succes',
      title: 'Activity saved',
      text: payload.activity,
    })
    localStorage.setItem('activities', JSON.stringify(state.savedActivities))
  },

  [REMOVE_ACTIVITY](state, payload) {
    Vue.notify({
      type: 'warn',
      title: 'Activity removed',
      text: state.savedActivities[payload - 1].activity,
    })
    state.savedActivities.splice(payload - 1, 1)
    for (let i = 0; i < state.savedActivities.length; i += 1) {
      state.savedActivities[i].num = i + 1
    }
    localStorage.setItem('activities', JSON.stringify(state.savedActivities))
  },

  [CLEAR_ACTIVITY](state) {
    if (!_.isEmpty(state.savedActivities)) {
      state.savedActivities = []
      localStorage.setItem('activities', JSON.stringify([]))
      Vue.notify({
        type: 'warn',
        title: 'Activity cleared',
        text: 'Every activity has been deleted',
      })
    }
  },

}
