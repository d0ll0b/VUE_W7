<template>
   <h1 class="mt-3">產品頁面</h1>
    <VueLoading :active="isLoading" />
    <div class="container">
        <div class="row py-3">
            <!-- 產品Modal -->
            <products-modal ref="ProductsModal" :product="product" @get_data="getData"></products-modal>
            <!-- 產品Modal -->

            <!-- 刪除Modal -->
            <del-modal ref="DelModal" :temp="product" @delproduct="Delete_product"></del-modal>
            <!-- 刪除Modal -->

            <!-- 訊息 -->
            <alert-messages ref="AlertMessages"></alert-messages>
            <!-- 訊息 -->

            <div class="text-end">
                <button class="btn btn-primary h3" type="button" @click="this.$refs.ProductsModal.show_Modal('new')">新增產品</button>
            </div>
            <table class="table table-hover mt-4">
            <thead>
                <tr>
                    <th width="120">
                        分類
                    </th>
                    <th>產品名稱</th>
                    <th width="120">
                        原價
                    </th>
                    <th width="120">
                        售價
                    </th>
                    <th width="150">
                        是否啟用
                    </th>
                    <th width="120">
                        編輯
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in products" :key="item.id">
                <td width="120">
                    {{ item.category }}
                </td>
                <td width="150"><span class="h5 font-weight-bold text-warning">{{ item.title }}</span></td>
                <td width="120">
                    {{ item.origin_price }}
                </td>
                <td width="120">
                    {{ item.price }}
                </td>
                <td width="150">
                    <span class="text-success" v-if="item.is_enabled">啟用</span>
                    <span v-else>未啟用</span>
                </td>
                <td>
                    <div class="btn-group btn-group-sm">
                      <button type="button" class="btn btn-outline-primary" @click="this.$refs.ProductsModal.show_Modal('edit', item)">
                          <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
                          修改
                      </button>
                      <button type="button" class="btn btn-outline-danger" @click="this.$refs.DelModal.show_Modal('product', item)">
                          <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
                          刪除
                      </button>
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
            <p>目前有 <span>{{ products.length }}</span> 項產品</p>
        </div>

        <!-- Pagination -->
        <pagination-btn :pagination="pagination" @change_page="getData"></pagination-btn>
        <!-- Pagination -->
    </div>
</template>

<script>
import ProductsModal from '@/components/ProductsModal.vue'
import DelModal from '@/components/DelModal.vue'
import AlertMessages from '@/components/AlertMessages.vue'
import PaginationBtn from '@/components/PaginationBtn.vue'

const { VITE_APP_API_URL: apiUrl, VITE_APP_API_NAME: apiPath } = import.meta.env
export default {
  data () {
    return {
      products: [],
      product: {
        imagesUrl: []
      }, // 用於儲存 "ProductsModal" Data
      isNew: false,
      pagination: {},
      isLoading: false
    }
  },
  components: {
    ProductsModal,
    DelModal,
    AlertMessages,
    PaginationBtn
  },
  methods: {
    getData (page = 1) {
      this.isLoading = true
      const api = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`
      this.axios.get(api).then((res) => {
        const { products, pagination } = res.data
        this.products = products
        this.pagination = pagination
      }).catch((err) => {
        this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
      }).finally(() => {
        this.isLoading = false
      })
    },
    Update_product (id, isNew) {
      let api = ''
      if (isNew === true) {
        api = `${apiUrl}/api/${apiPath}/admin/product`
        this.axios.post(api, { data: this.tempProduct }).then((res) => {
          this.$refs.AlertMessages.show_toast('新增產品成功!!!')
          this.getData()
          ProductsModal.hide()
        }).catch((err) => {
          this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
        })
      } else {
        api = `${apiUrl}/api/${apiPath}/admin/product/${id}`
        this.axios.put(api, { data: this.tempProduct }).then((res) => {
          this.$refs.AlertMessages.show_toast('更新產品成功!!!')
          this.getData()
          ProductsModal.hide()
        }).catch((err) => {
          this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
        })
      }
    },
    Delete_product (id) {
      let api = ''
      api = `${apiUrl}/api/${apiPath}/admin/product/${id}`
      this.axios.delete(api).then((res) => {
        this.$refs.AlertMessages.show_toast('刪除產品完成!!!')
        this.getData()
        this.$refs.DelModal.hide_Modal()
      }).catch((err) => {
        this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
      })
    }
  },
  mounted () {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.axios.defaults.headers.common.Authorization = token

    this.getData()
  }
}
</script>
