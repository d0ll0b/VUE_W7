<template>
    <div class="d-flex row justify-content-center">
        <!-- 訊息 -->
        <alert-messages ref="AlertMessages"></alert-messages>
        <!-- 訊息 -->

        <h1 class="h3 mt-5 mb-3 font-weight-normal">
        後台登入
        </h1>
        <div class="col-5">
        <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
            <input type="email" class="form-control" id="username"
                placeholder="name@example.com" required autofocus v-model="user.username">
            <label for="username">Email address</label>
            </div>
            <div class="form-floating">
            <input type="password" class="form-control" id="password"
                placeholder="Password" required v-model="user.password">
            <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
            </button>
        </form>
        </div>
    </div>
</template>

<script>
import AlertMessages from '@/components/AlertMessages.vue'
const apiUrl = import.meta.env.VITE_APP_API_URL

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    AlertMessages
  },
  methods: {
    login () {
      const api = `${apiUrl}/admin/signin`

      this.axios.post(api, this.user).then((res) => {
        const { token, expired } = res.data
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`
        this.$refs.AlertMessages.show_toast('登入成功~~')
        this.$router.push('/admin/products')
      }).catch((err) => {
        this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
      })
    },
    toastMsg (message) {
      this.$refs.messageToast.show_toast(message)
    }
  },
  mounted () {
    this.$refs.AlertMessages.show_alert('尚未登入，請先進行登入~~', 1300, 'error')
  }
}
</script>
