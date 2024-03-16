<template>
  <div id="OrderModal" ref="OrderModal" class="modal fade text-start" tabindex="-1" aria-labelledby="OrderModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
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
                      <td>{{ tempOrder.due_date }}</td>
                    </tr>
                    <tr>
                      <th>付款時間</th>
                      <td></td>
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
                <div></div>
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
    getData (page = 1) {
      this.$emit('getData')
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
          this.OrdersModal.show()
          break
      }
    },
    Update_Order (id) {
      let api = ''
      if (this.isNew === true) {
        api = `${apiUrl}/api/${apiPath}/admin/Order`
        this.axios.post(api, { data: this.tempOrder }).then((res) => {
          alert('新增產品成功!!!')
          this.getData()
          this.OrdersModal.hide()
        }).catch((err) => {
          alert(err?.response.data.message)
        })
      } else {
        api = `${apiUrl}/api/${apiPath}/admin/Order/${id}`
        this.axios.put(api, { data: this.tempOrder }).then((res) => {
          alert('更新產品成功!!!')
          this.getData()
          this.OrdersModal.hide()
        }).catch((err) => {
          alert(err?.response.data.message)
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
        alert('圖片上傳成功!!!')
      }).catch((err) => {
        alert(err?.response.data.message)
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
