import Modal from 'bootstrap/js/dist/modal'
export default {
  methods: {
    show_Model () {
      this.Modal.show()
    },
    hide_Model () {
      this.Modal.hide()
    }
  },
  mounted () {
    this.Modal = new Modal(this.$refs.modal, {
      keyboard: false
    })
  }
}
