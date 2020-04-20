<template>
  <v-row>
        <router-link
            to="/activities"
            v-slot="{ href, route, navigate, isActive }"
        >
            <div :active="isActive" :href="href" @click="navigate">
                <div
                    :class="['py-2', 'px-4', 'router-link-text',
                    { 'elevation-3': isActive },
                    { 'router-link-text--active': isActive }]"
                >
                    Activities
                </div>
            </div>
            <div v-if="isActive" class="shadow--hider"></div>
        </router-link>
        <router-link
            class="pl-3"
            to="/mylist"
            v-slot="{ href, route, navigate, isActive }"
        >
            <div :active="isActive" :href="href" @click="navigate">
                <div
                    :class="['py-2', 'px-4',
                    'router-link-text',
                    { 'elevation-3': isActive },
                    { 'router-link-text--active': isActive }]"
                >
                    My list
                </div>
            </div>
        <div v-if="isActive" class="shadow--hider"></div>
    </router-link>
  </v-row>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped lang="scss">

.router-link-text {
    color: blue;
    cursor: pointer;
}

.router-link-text--active {
    color: black;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

</style>
