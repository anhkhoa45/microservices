<template>
  <Header />
</template>

<script>
import { mapState} from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['currentUser'])
  },
  methods: {
  }
}
</script>