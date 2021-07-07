<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">Ticketing</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <template v-if="!currentUser">

          <b-nav-item>
            <NuxtLink to="/auth/signin">Signin</NuxtLink>
          </b-nav-item>
          <b-nav-item>
            <NuxtLink to="/auth/signup">Signup</NuxtLink>
          </b-nav-item>
        </template>
        <template v-else>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">{{ currentUser.email }}</b-dropdown-item>
            <b-dropdown-item>
              <NuxtLink to="/auth/signout">Sign Out</NuxtLink>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['currentUser'])
  },
  methods: {
  }
}
</script>
  