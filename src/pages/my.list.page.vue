<template>
  <v-container>
    <v-container>
      <v-data-table :headers="activityHeaders" :items="activities" class="elevation-1 ml-5 mr-5">
        <template v-slot:item.delete="{ item }">
          <v-btn @click="removeBtn(item.num)" icon color="black">
            <v-icon>far fa-check-circle</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
    <v-container>
      <v-btn
        @click="clearBtn"
        class="w-full"
        height="40"
        block
        color="#db524c"
        dark
        small
      >Clear all</v-btn>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { REMOVE_ACTIVITY, CLEAR_ACTIVITY } from '../store/types'

export default {
  name: 'MyListPage',
  data: () => ({
    activityHeaders: [
      { text: '#', value: 'num' },
      { text: 'Activity', value: 'activity' },
      { text: 'Participants', value: 'type' },
      { text: 'Budget', value: 'price' },
      { text: '', value: 'delete' },
    ],
  }),
  computed: mapState({
    activities: (state) => state.savedActivities,
  }),
  methods: {
    removeBtn(num) {
      this.$store.commit(REMOVE_ACTIVITY, num)
    },
    clearBtn() {
      this.$store.commit(CLEAR_ACTIVITY)
    },
  },
}
</script>

<style scoped lang="scss">
</style>
