<template>
    <div id="DelModal" ref="DelModal" class="modal fade" tabindex="-1"
           aria-labelledby="DelModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除{{ title }}</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{ name }}</strong> (刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="delproduct()">
                確認刪除
              </button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  data () {
    return {
      DelModal: '',
      title: '',
      name: '',
      type: '',
      tempData: {}
    }
  },
  methods: {
    delproduct () {
      this.$emit(`del${this.type}`, this.tempData.id)
    },
    show_Modal (type, item) {
      this.type = type
      this.checkDelType(item)
      this.tempData = { ...item }
      this.DelModal.show()
    },
    hide_Modal () {
      this.DelModal.hide()
    },
    checkDelType (item) {
      switch (this.type) {
        case 'product':
          this.title = '商品'
          this.name = `${item.title}`
          break
        case 'order':
          this.title = '訂單'
          this.name = `訂單: ${item.id}`
          break
        case 'coupon':
          this.title = '優惠卷'
          this.name = `${item.title}`
          break
      }
    }
  },
  mounted () {
    this.DelModal = new Modal(this.$refs.DelModal, {
      keyboard: false
    })
  }
}
</script>
