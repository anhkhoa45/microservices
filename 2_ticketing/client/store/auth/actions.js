export default {
  async fetchCurrentUser({ dispatch }) {
    try {
      const {data} = await this.$axios.get('/api/users/currentuser')
      dispatch('setCurrentUser', data)
    }
    catch (e) {
      if (e.response.status === 401)
        console.log('User not logged in')
      else
        console.log(e.response.status)
    }
  },
  setCurrentUser: ({ commit }, { currentUser }) => {
    commit('setCurrentUser', { currentUser })
  }
}
