import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      message: 'Hello from Vuex!'
    };
  },
  mutations: {
    setMessage(state, newMessage) {
      state.message = newMessage;
    }
  },
  actions: {
    updateMessage({ commit }, newMessage) {
      commit('setMessage', newMessage);
    }
  }
});

export default store;
