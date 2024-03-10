<template>
    <div id="DelModal" ref="DelModal" class="modal fade" tabindex="-1"
           aria-labelledby="DelModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="delproduct(tempProduct.id)">
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
  props: ['temp'],
  data () {
    return {
      DelModal: '',
      tempProduct: {}
    }
  },
  methods: {
    delproduct (id) {
      this.$emit('delproduct', id)
    },
    show_Modal () {
      this.DelModal.show()
    },
    hide_Modal () {
      this.DelModal.hide()
    }
  },
  mounted () {
    this.DelModal = new Modal(document.querySelector('#DelModal'), {
      keyboard: false
    })

    this.tempProduct = { ...this.temp }
  }
}
</script>
