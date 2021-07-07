<template>
  <b-container>
    <h1 class="mt-5 text-center">Signup</h1>
    <b-form class="mt-5"  @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="user@example.com"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="*****"
          required
        ></b-form-input>
      </b-form-group>


      <b-form-invalid-feedback :state="!hasError">
        <h5 v-for="e in submitErrors" :key="e.message">
          {{ e.message }}
        </h5>
      </b-form-invalid-feedback>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'auth',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      submitErrors: []
    }
  },
  computed: {
    hasError() {
      return this.submitErrors.length > 0
    }
  },
  watch: {
    form: {
      handler: function () {
        this.submitErrors = []
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('auth', ['setCurrentUser']),
    async onSubmit(event) {
      event.preventDefault()
      try {
        const { data: currentUser } = await this.$axios.post(
          '/api/users/signup',
          {
            email: this.form.email,
            password: this.form.password
          }
        )
        console.log(currentUser)
        this.setCurrentUser({ currentUser })
        this.$router.push('/')
      } catch (e) {
        this.submitErrors = e.response.data.errors
      }
    }
  }
}
</script>
