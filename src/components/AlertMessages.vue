<template>
  <div></div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {}
  },
  methods: {
    show_toast (Msg, timer = 3000, type = 'success') {
      Swal.fire({
        title: Msg,
        icon: type,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer
      })
    },
    show_alert (Msg, timer = 1000, type = 'success') {
      Swal.fire({
        position: 'top',
        icon: type,
        title: Msg,
        showConfirmButton: false,
        timer
      })
    }
  }
}
</script>
