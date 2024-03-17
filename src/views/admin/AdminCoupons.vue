<template>
    <h1 class="mt-3">優惠卷頁面</h1>
    <VueLoading :active="isLoading" />
    <div class="container">
        <div class="mt-4">
            <!-- 新增優惠卷Modal -->
            <coupons-modal ref="CouponsModal" @get_data="getCoupons"></coupons-modal>
            <!-- 新增優惠卷Modal -->

            <!-- 刪除Modal -->
            <del-modal ref="DelModal" :temp="coupons" @delcoupon="Delete_coupon"></del-modal>
            <!-- 刪除Modal -->

            <!-- 訊息 -->
            <alert-messages ref="AlertMessages"></alert-messages>
            <!-- 訊息 -->

            <div class="text-end">
                <button class="btn btn-primary" type="button" @click="this.$refs.CouponsModal.show_Modal('new')">新增優惠卷</button>
            </div>
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th>名稱</th>
                        <th>折扣比率</th>
                        <th>到期日</th>
                        <th>是否啟用</th>
                        <th>編輯</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="coupons">
                        <tr v-for="item in coupons" :key="item.id">
                            <td class="h5 font-weight-bold text-warning">
                                {{ item.title }}
                            </td>
                            <td>
                                {{ item.percent }} %
                            </td>
                            <td>
                                {{ new Date(item.due_date*1000).toLocaleDateString() }}
                            </td>
                            <td>
                                <span class="text-success" v-if="item.is_enabled">啟用</span>
                                <span v-else>未啟用</span>
                            </td>
                            <td>
                              <div class="btn-group btn-group-sm">
                                <button type="button" class="btn btn-outline-primary" @click="this.$refs.CouponsModal.show_Modal('edit', item)">
                                    <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
                                    修改
                                </button>
                                <button type="button" class="btn btn-outline-danger" @click="this.$refs.DelModal.show_Modal('coupon', item)">
                                    <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
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
        <pagination-btn :pagination="pagination" @change_page="getCoupons"></pagination-btn>
        <!-- Pagination -->
    </div>
</template>

<script>
import CouponsModal from '@/components/CouponsModal.vue'
import DelModal from '@/components/DelModal.vue'
import AlertMessages from '@/components/AlertMessages.vue'
import PaginationBtn from '@/components/PaginationBtn.vue'
const { VITE_APP_API_URL: apiUrl, VITE_APP_API_NAME: apiPath } = import.meta.env

export default {
  data () {
    return {
      coupons: [],
      pagination: {},
      DateTime: '',
      isLoading: false
    }
  },
  components: {
    CouponsModal,
    DelModal,
    AlertMessages,
    PaginationBtn
  },
  methods: {
    getCoupons (page = 1) {
      this.isLoading = true
      const api = `${apiUrl}/api/${apiPath}/admin/coupons?page=${page}`
      this.axios.get(api).then((res) => {
        const { coupons, pagination } = res.data
        this.coupons = coupons
        this.pagination = pagination
      }).catch((err) => {
        this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
      }).finally(() => {
        this.isLoading = false
      })
    },
    Delete_coupon (id) {
      this.isLoading = true
      const api = `${apiUrl}/api/${apiPath}/admin/coupon/${id}`
      this.axios.delete(api).then((res) => {
        this.$refs.AlertMessages.show_toast('刪除優惠卷完成!!!')
        this.getCoupons()
        this.$refs.DelModal.hide_Modal()
      }).catch((err) => {
        this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
      }).finally(() => {
        this.isLoading = false
      })
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
