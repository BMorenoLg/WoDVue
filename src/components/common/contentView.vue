<template>
  <span class="mainContent">
    <div v-for="(item, idx) in entryData" :key="`content_${idx}`">
      <span style="font-weight:bold">{{ item.displayLabel }}: </span>
      <span v-if="helpers.typeOf(item.value) !== 'array'">{{
        item.value
      }}</span>
      <p v-else v-for="(subItem, idx) in item.value" :key="`subItem_${idx}`">
        {{ subItem }}
      </p>
    </div>
  </span>
</template>

<script>
import helpers from '../../utils/helpers/helpers';

export default {
  name: 'cContentView',
  computed: {
    entryData() {
      // console.log('contentView : entryData');
      console.dir(this.$store.getters.curEntryData);
      // return this.$store.getters.curEntryData;
      return this.processEntryData(this.$store.getters.curEntryData);
    },
  },
  data() {
    return {
      displayContent: [],
      helpers,
    };
  },
  methods: {
    getDisplayContent(curMonster, contentTypeId, entryData) {
      const displayContentMapName = `VUE_APP_DISPLAY_CONTENT_MAP_${curMonster.toUpperCase()}_${contentTypeId.toUpperCase()}`;
      const displayContentMapStr = process.env[displayContentMapName];
      return displayContentMapStr.split(',').map((dcp) => {
        const dcpAry = dcp.split('|');
        const [displayLabel, contentField] = dcpAry;
        const dcpObj = {
          displayLabel,
          value: entryData[contentField],
        };
        return dcpObj;
      });
    },
    processEntryData(entryData) {
      if (!entryData) {
        return null;
        // return [
        //   {
        //     displayLabel: 'My apologies.',
        //     value: 'We have no entries for this.',
        //   },
        // ];
      }
      const { curMonster } = this.$store.getters;
      const { contentTypeId } = entryData;
      const displayContent = this.getDisplayContent(
        curMonster,
        contentTypeId,
        entryData,
      );
      return displayContent;
    },
  },
  watch: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mainContent {
  display: inline-block;
  width: 500px;
}
</style>
