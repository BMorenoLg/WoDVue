<template>
  <div id="app">
    <div id="nav">
      <router-link active to="/">Home</router-link>
      <router-link
        v-for="(monster, idx) in monsterTypes"
        :key="`monster_${idx}`"
        :to="`/${monster}`"
        >{{ monsterNavTitles[idx] }}</router-link
      >
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    monsterTypes() {
      return this.$store.getters.monsterTypes;
    },
  },
  data() {
    return {
      monsterNavTitles: process.env.VUE_APP_MONSTER_NAVTITLES.split(','),
    };
  },
  mounted() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    padding-right: 5px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
