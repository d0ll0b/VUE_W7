<template>
    <div id="CouponsModal" ref="CouponsModal" class="modal fade text-start" tabindex="-1" aria-labelledby="productModalLabel"
           aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="CouponsModalLabel" class="modal-title">
                <span>新增優惠卷</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempCoupons.title">
              </div>

              <div class="mb-3">
                <label for="title" class="form-label">優惠碼</label>
                <input id="code" type="text" class="form-control" placeholder="請輸入優惠碼" v-model="tempCoupons.code">
              </div>

              <div class="mb-3">
                <label for="title" class="form-label">到期日</label>
                <input id="due_date" type="date" class="form-control" placeholder="請輸入到期日" v-model="tempCoupons.due_date">
              </div>

              <div class="mb-3">
                <label for="title" class="form-label">折扣百分比</label>
                <input id="code" type="number" class="form-control" placeholder="請輸入折扣百分比" v-model.number="tempCoupons.percent">
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox"
                          :true-value="1" :false-value="0" v-model="tempCoupons.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                關閉
              </button>
              <button type="button" class="btn btn-primary" @click="Update_Coupons(tempCoupons.id)">
                新增優惠卷
              </button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
const { VITE_APP_API_URL: apiUrl, VITE_APP_API_NAME: apiPath } = import.meta.env

export default {
  data () {
    return {
      tempCoupons: {},
      CouponsModal: ''
    }
  },
  mounted () {
    this.CouponsModal = new Modal(this.$refs.CouponsModal, {
      keyboard: false
    })
  },
  methods: {
    show_Modal (flg, item) {
      switch (flg) {
        case 'new':
          this.isNew = true
          this.CouponsModal.show()
          break
        case 'edit':
          this.isNew = false
          this.tempCoupons = { ...item }
          this.ProductsModal.show()
          break
      }
    },
    Update_Coupons (id) {
      let api = ''
      if (this.isNew === true) {
        api = `${apiUrl}/api/${apiPath}/admin/coupon`
        this.tempCoupons.due_date = '1555459200'
        this.axios.post(api, { data: this.tempCoupons }).then((res) => {
          alert('新增優惠卷成功!!!')
          // this.getData()
          this.CouponsModal.hide()
        }).catch((err) => {
          alert(err?.response.data.message)
        })
      } else {
        api = `${apiUrl}/api/${apiPath}/admin/coupon/${id}`
        this.axios.put(api, { data: this.tempCoupons }).then((res) => {
          alert('更新優惠卷成功!!!')
          // this.getData()
          this.CouponsModal.hide()
        }).catch((err) => {
          alert(err?.response.data.message)
        })
      }
    }
  }
}
</script>
