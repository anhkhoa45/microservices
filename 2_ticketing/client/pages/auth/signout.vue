<template>
  <h1>Signing out ...</h1>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'auth',
  methods: {
    ...mapActions('auth', ['setCurrentUser']),
  },
  async mounted() {
    await this.$axios.post('/api/users/signout', {})
    this.setCurrentUser({currentUser: null})
    this.$router.back()
  }
}
</script>