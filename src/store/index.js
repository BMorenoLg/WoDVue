import Vue from 'vue';
import Vuex from 'vuex';
import apiContentful from '../utils/api/contentful/contentful';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    curEntryId: '',
    curEntryData: null,
    curContentTypeId: '',
    curMonster: '',
    allEntries: {},
    monsterTypes: process.env.VUE_APP_MONSTER_TYPES.split(','),
  },
  getters: {
    allEntries: (state) => state.allEntries,
    curEntryId: (state) => state.curEntryId,
    curContentTypeId: (state) => state.curContentTypeId,
    curMonster: (state) => state.curMonster,
    getAllEntriesForCurrentContentTypeId: (state) =>
      state.allEntries[state.curContentTypeId],
    curEntryData: (state) => state.curEntryData,
    monsterTypes: (state) => state.monsterTypes,
  },
  mutations: {
    clearEntry(state) {
      state.curEntryId = '';
      state.curEntryData = null;
    },
    updateMonster(state, newMonster) {
      if (state.monsterTypes.findIndex((mt) => mt === newMonster) > -1) {
        state.curMonster = newMonster;
      }
    },
    updateCurEntryId(state, newCurEntryId) {
      state.curEntryId = newCurEntryId;
    },
    updateCurEntryData(state, newEntryData) {
      state.curEntryData = newEntryData;
    },
    updateCurContentTypeId(state, newContentTypeId) {
      state.curContentTypeId = newContentTypeId;
    },
    addEntriesForContentTypeId(state, { contentTypeId, entries }) {
      Vue.set(state.allEntries, contentTypeId, entries);
    },
  },
  actions: {
    async loadEntriesByContentTypeIdAsync({ commit }, contentTypeId) {
      const entries = await apiContentful.getContentbyTypeAsync(contentTypeId);
      commit('addEntriesForContentTypeId', { contentTypeId, entries });
    },
  },
  modules: {},
});
