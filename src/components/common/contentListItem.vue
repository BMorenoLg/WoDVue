<template>
  <b-button-group class="mx-1">
    <b-nav-item v-on:click="showEntry()">{{ entry.title }}</b-nav-item>
  </b-button-group>
</template>

<script>
export default {
  name: 'cContentListItem',
  props: {
    entry: Object,
  },
  methods: {
    showEntry: function showEntry() {
      console.log(this.entry.id);
      this.$store.commit('updateCurEntryId', this.entry.id);
      this.$store.commit('updateCurEntryData', this.entry);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
