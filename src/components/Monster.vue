<template>
  <div>
    <b-nav align="center" id="monsterContentTypesNav">
      <b-nav-item
        v-for="(contentTypeId, idx) in monsterContentTypeIds"
        :key="`${contentTypeId}_${idx}`"
        active
        v-on:click="clickMonsterContentTypesNavItem(contentTypeId)"
        >{{ contentTypeId.text }}</b-nav-item
      >
    </b-nav>
    <cContentList></cContentList>
    <cContentView></cContentView>
  </div>
</template>

<script>
import cContentList from './common/contentList.vue';
import cContentView from './common/contentView.vue';

export default {
  name: 'cMonster',
  props: {},
  data() {
    return {
      monsterContentTypeIds: [],
    };
  },
  computed: {
    curMonster() {
      return this.$store.getters.curMonster;
    },
  },
  methods: {
    clickMonsterContentTypesNavItem: function clickMonsterContentTypesNavItem(
      contentTypeId,
    ) {
      this.$store.commit('updateCurContentTypeId', contentTypeId.contentTypeId);
      this.$store.commit('clearEntry');
    },
    getContentTypeIdsString: function getContentTypeIdsString() {
      return process.env[
        `VUE_APP_CONTENT_TYPE_NAV_ITEMS_${this.curMonster.toUpperCase()}`
      ];
    },
    getContentTypeIds: function getContentTypeIds(monster) {
      return this.processContentTypeIds(this.getContentTypeIdsString(monster));
    },
    processContentTypeIds: function processContentTypeIds(contentTypesString) {
      return contentTypesString
        .split(',')
        .map((ni) => ni.split('|'))
        .map((a) => ({ text: a[0], contentTypeId: a[1] }));
    },
  },
  watch: {
    curMonster(newMonster) {
      this.monsterContentTypeIds = this.getContentTypeIds(newMonster);
    },
  },
  components: {
    cContentList,
    cContentView,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
