import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {}
  },
  mutations: {
    addUser(state, params) {
      // adding new user to associative array by unique keys
      state.users[params.user.id] = params.user;

      // if new user has a parent, we add this user to parent's nextNodes list
      if (params.chief) {
        state.users[params.chief].nextNodes[params.user.id] = 1;
      }

      localStorage.setItem("users", JSON.stringify(state.users));
    },

    // this is called on page load to get users from local storage if there are any
    initialiseStore(state) {
      let users = JSON.parse(localStorage.getItem('users'));

      if (users && Object.keys(users).length > 0) {
        state.users = users;
      }

    },
  },
  getters: {
    users(state) {
      return state.users;
    }
  },
  actions: {
  },
  modules: {
  }
})
