<template>
  <div id="OrderModal" ref="OrderModal" class="modal fade text-start" tabindex="-1" aria-labelledby="OrderModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <!-- 訊息 -->
            <alert-messages ref="AlertMessages"></alert-messages>
            <!-- 訊息 -->
            <h5 id="OrderModalLabel" class="modal-title">
              <span>訂單細節</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <h2>用戶資訊</h2>
                <table class="table">
                  <tbody v-if="tempOrder.user">
                    <tr>
                      <th>姓名</th>
                      <td>{{ tempOrder.user.name }}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{{ tempOrder.user.email }}</td>
                    </tr>
                    <tr>
                      <th>電話</th>
                      <td>{{ tempOrder.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>地址</th>
                      <td>{{ tempOrder.user.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-sm-8">
                <h2>訂單細節</h2>
                <table class="table">
                  <tbody>
                    <tr>
                      <th>訂單編號</th>
                      <td>{{ tempOrder.id }}</td>
                    </tr>
                    <tr>
                      <th>下單時間</th>
                      <td>{{ new Date(tempOrder.create_at*1000).toLocaleDateString() }}</td>
                    </tr>
                    <tr>
                      <th>付款時間</th>
                      <td>
                        <span v-if="tempOrder.paid_date">{{ new Date(tempOrder.paid_date*1000).toLocaleDateString() }}</span>
                        <span v-else>無</span>
                      </td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td class="text-success" v-if="tempOrder.is_paid">完成付款</td>
                      <td class="text-muted" v-else>尚未付款</td>
                    </tr>
                    <tr>
                      <th>金額</th>
                      <td>{{ tempOrder.total }}</td>
                    </tr>
                  </tbody>
                </table>

                <hr> <!--分隔線-->

                <h2>訂購品項</h2>
                <table class="table">
                  <tbody v-if="tempOrder.products">
                    <tr v-for="(product, key) in tempOrder.products" :key="key">
                      <td>{{ product.product.title }}</td>
                      <td>{{ product.qty }}/{{ product.product.unit }}</td>
                      <td class="text-end">{{ product.final_total }}</td>
                    </tr>
                  </tbody>
                </table>

                <hr> <!--分隔線-->
              <div class="d-flex justify-content-end">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck" v-model="tempOrder.is_paid">
                  <label  class="form-check-label" for="flexSwitchCheck">
                    <div v-if="tempOrder.is_paid" class="text-success">完成付款</div>
                    <div v-else>尚未付款</div>
                  </label>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="Update_Order(tempOrder.id)">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import AlertMessages from '@/components/AlertMessages.vue'
import Modal from 'bootstrap/js/dist/modal'
const { VITE_APP_API_URL: apiUrl, VITE_APP_API_NAME: apiPath } = import.meta.env

export default {
  props: ['Order'],
  data () {
    return {
      Orders: [],
      tempOrder: {},
      isNew: false,
      title: '',
      OrdersModal: '',
      isLoading: false
    }
  },
  components: {
    AlertMessages
  },
  mounted () {
    this.OrdersModal = new Modal(this.$refs.OrderModal, {
      keyboard: false
    })

    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.axios.defaults.headers.common.Authorization = token

    this.tempOrder = { ...this.Order }
  },
  methods: {
    getData () {
      this.$emit('get_data')
    },
    show_Modal (flg, item) {
      switch (flg) {
        case 'new':
          this.isNew = true
          this.tempOrder = {
            imagesUrl: []
          }

          this.OrdersModal.show()
          break
        case 'edit':
          this.isNew = false
          this.tempOrder = { ...item }
          console.log(this.tempOrder)
          this.OrdersModal.show()
          break
      }
    },
    Update_Order (id) {
      let api = ''
      if (this.isNew === true) {
        api = `${apiUrl}/api/${apiPath}/admin/Order`
        this.axios.post(api, { data: this.tempOrder }).then((res) => {
          this.$refs.AlertMessages.show_toast('新增產品成功!!!')
          this.getData()
          this.OrdersModal.hide()
        }).catch((err) => {
          this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
        })
      } else {
        api = `${apiUrl}/api/${apiPath}/admin/Order/${id}`
        this.axios.put(api, { data: this.tempOrder }).then((res) => {
          this.$refs.AlertMessages.show_toast('更新產品成功!!!')
          this.getData()
          this.OrdersModal.hide()
        }).catch((err) => {
          this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
        })
      }
    },
    ShowImagebtn (Order) {
      if (!Object.prototype.hasOwnProperty.call(Order, 'imagesUrl') && !Array.isArray(Order.imagesUrl)) {
        Order.imagesUrl = []
        Order.imagesUrl.push('')
      }
      return true
    },
    UploadImg () {
      let api = ''
      api = `${apiUrl}/api/${apiPath}/admin/upload`
      this.isLoading = true
      const formData = new FormData()
      formData.append('file-to-upload', this.$refs.fileinput.files[0])
      this.axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        if (this.tempOrder.imageUrl === '' || this.tempOrder.imageUrl === undefined) {
          this.tempOrder.imageUrl = res.data.imageUrl
        } else if (this.tempOrder.imagesUrl[this.tempOrder.imagesUrl.length - 1] === '') {
          this.tempOrder.imagesUrl[this.tempOrder.imagesUrl.length - 1] = res.data.imageUrl
        } else {
          this.tempOrder.imagesUrl.push(res.data.imageUrl)
        }
        this.$refs.fileinput.value = ''
        this.$refs.AlertMessages.show_toast('圖片上傳成功!!!')
      }).catch((err) => {
        this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
