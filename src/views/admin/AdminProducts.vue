<template>
    <h3>產品頁面</h3>
    <VueLoading :active="isLoading" />
    <div class="container">
        <div class="row py-3">
            <!-- 產品Modal -->
            <products-modal ref="ProductsModal" :product="product" ></products-modal>
            <!-- 產品Modal -->

            <!-- 刪除Modal -->
            <del-modal ref="DelModal" :tempProduct="product" ></del-modal>
            <!-- 刪除Modal -->

            <div class="text-end">
                <button class="btn btn-primary h3" type="button" @click="this.$refs.ProductsModal.show_Model('new')">新增產品</button>
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
                    <button type="button" class="btn btn-outline-primary" @click="this.$refs.ProductsModal.show_Model('edit', item)">
                        <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
                        修改
                    </button>
                    <button type="button" class="btn btn-outline-danger" @click="this.$refs.DelModal.show_Model('delete', item)">
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
        <!-- <pagination-btn :pagination="pagination"></pagination-btn> -->
        <!-- Pagination -->
    </div>
</template>

<script>
import ProductsModal from '@/components/ProductsModal.vue'
import DelModal from '@/components/DelModal.vue'
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
    DelModal
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
        alert(err.response.data.message)
      }).finally(() => {
        this.isLoading = false
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
