export default {
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('auth/fetchCurrentUser')
    }
  }
}