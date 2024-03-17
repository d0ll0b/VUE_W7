<template>
  <h1 class="mt-3">訂單頁面</h1>
  <VueLoading :active="isLoading" />
  <div class="container">
      <div class="mt-4">
          <!-- 產品Modal -->
          <orders-modal ref="OrdersModal" @get_data="getOrders"></orders-modal>
          <!-- 產品Modal -->

          <!-- 刪除Modal -->
          <del-modal ref="DelModal" @delorder="Delete_order"></del-modal>
          <!-- 刪除Modal -->

          <!-- 訊息 -->
          <alert-messages ref="AlertMessages"></alert-messages>
          <!-- 訊息 -->

          <table class="table align-middle">
          <thead>
              <tr>
                  <th>購買日期</th>
                  <th>訂購人</th>
                  <th>購買品項(數量/單位)</th>
                  <th class="text-start">應付金額</th>
                  <th class="text-start">付款與否</th>
                  <th>編輯</th>
              </tr>
          </thead>
          <tbody>
              <template v-if="orders">
              <tr v-for="item in orders" :key="item.id">
                  <td>
                      {{ new Date(item.create_at*1000).toLocaleDateString() }}
                  </td>
                  <td>
                      {{ item.user.name }}
                  </td>
                  <td>
                    <div v-for="(product, key) in item.products" :key="key">
                      {{ product.product.title }} 數量：{{ product.qty }}{{ product.product.unit }}<br>
                    </div>
                  </td>
                  <td class="h6 text-start">
                    {{ item.total }}
                  </td>
                  <td class="text-center">
                    <div class="form-check form-switch text-start">
                      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck" v-model="item.is_paid" @change="Paid_Stutas(item)">
                      <label  class="form-check-label" for="flexSwitchCheck">
                        <div v-if="item.is_paid" class="text-success">完成付款</div>
                        <div v-else>尚未付款</div>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button type="button" class="btn btn-outline-primary" @click="this.$refs.OrdersModal.show_Modal('edit', item)">
                          檢視
                      </button>
                      <button type="button" class="btn btn-outline-danger" @click="this.$refs.DelModal.show_Modal('order', item)">
                          刪除
                      </button>
                    </div>
                  </td>
              </tr>
              </template>
          </tbody>
          </table>
      </div>

      <!-- Pagination -->
      <pagination-btn :pagination="pagination" @change_page="getOrders"></pagination-btn>
      <!-- Pagination -->
  </div>
</template>

<script>
import OrdersModal from '@/components/OrdersModal.vue'
import DelModal from '@/components/DelModal.vue'
import AlertMessages from '@/components/AlertMessages.vue'
import PaginationBtn from '@/components/PaginationBtn.vue'
const { VITE_APP_API_URL: apiUrl, VITE_APP_API_NAME: apiPath } = import.meta.env

export default {
  data () {
    return {
      orders: [],
      pagination: {},
      isLoading: false
    }
  },
  components: {
    OrdersModal,
    DelModal,
    AlertMessages,
    PaginationBtn
  },
  methods: {
    getOrders (page = 1) {
      this.isLoading = true
      const api = `${apiUrl}/api/${apiPath}/admin/orders?page=${page}`
      this.axios.get(api).then((res) => {
        const { orders, pagination } = res.data
        this.orders = orders
        this.pagination = pagination
      }).catch((err) => {
        this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
      }).finally(() => {
        this.isLoading = false
      })
    },
    Delete_order (id) {
      this.isLoading = true
      const api = `${apiUrl}/api/${apiPath}/admin/order/${id}`
      this.axios.delete(api).then((res) => {
        this.$refs.AlertMessages.show_toast('刪除訂單完成!!!')
        this.getOrders()
        this.$refs.DelModal.hide_Modal()
      }).catch((err) => {
        this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
      }).finally(() => {
        this.isLoading = false
      })
    },
    Paid_Stutas (item) {
      this.isLoading = true
      const api = `${apiUrl}/api/${apiPath}/admin/order/${item.id}`
      this.axios.put(api, { data: item }).then((res) => {
        this.$refs.AlertMessages.show_toast('已修改付款狀態~~')
        this.getOrders()
      }).catch((err) => {
        this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
      }).finally(() => {
        this.isLoading = false
      })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
