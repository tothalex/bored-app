import Vue from 'vue'
import axios from 'axios'
import ACTIVITY_PATH from '../constants/api'
import {
  SET_ACTIVITY, SET_ACTIVITY_TYPE, SET_PARTICIPANTS, SET_BUDGET,
  RANDOM_ACTIVITY_ACTION, ACTIVITY_ACTION, PUSH_ACTIVITY, SAVE_ACTIVITY_ACTION,
} from './types'

export default {
  async [RANDOM_ACTIVITY_ACTION](store) {
    const {
      data: {
        activity, type, participants, price,
      },
    } = await axios.get(ACTIVITY_PATH)

    store.commit(SET_ACTIVITY, activity)
    store.commit(SET_ACTIVITY_TYPE, type)
    store.commit(SET_PARTICIPANTS, participants)
    store.commit(SET_BUDGET, price * 100)
  },

  async [ACTIVITY_ACTION](store) {
    const { data: { activity } } = await axios.get(
      `${ACTIVITY_PATH}?`
      + `type=${store.state.selectedType}&`
      + `participants=${store.state.participants}&`
      + `price=${store.state.budget / 100}`,
    )

    if (activity === undefined) {
      Vue.notify({
        type: 'error',
        title: 'Activity error',
        text: 'No activities found with the specified parameters!',
      })
      return
    }

    store.commit(SET_ACTIVITY, activity)
    Vue.notify({
      type: 'succes',
      title: 'Activity generated',
      text: activity,
    })
  },

  [SAVE_ACTIVITY_ACTION](store) {
    const activity = {
      num: store.state.savedActivities.length + 1,
      activity: store.state.activity,
      type: store.state.selectedType,
      participants: store.state.participants,
      price: store.state.budget,
    }

    store.commit(PUSH_ACTIVITY, activity)
  },
}
