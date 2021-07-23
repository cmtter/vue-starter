import http from '@/utils/http'
export default {
  state: () => ({
    test: 'hellolowed'
  }),
  mutations: {
    saveTest: (state, _newTest) => {
      state.test = _newTest
    }
  },
  actions: {
    async saveActionTest({ commit }, payload) {
      const res = await http('/mock/use/getName', payload).post()
      commit('saveTest', JSON.stringify(res))
    }
  },
  getters: {}
}

