<template>
    <h1 class="mt-3">優惠卷頁面</h1>
    <VueLoading :active="isLoading" />
    <div class="container">
        <div class="mt-4">
            <!-- 新增優惠卷Modal -->
            <coupons-modal ref="CouponsModal"></coupons-modal>
            <!-- 新增優惠卷Modal -->

            <!-- 刪除Modal -->
            <del-modal ref="DelModal" :temp="coupons"></del-modal>
            <!-- 刪除Modal -->

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
                                {{ item.due_date }}
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
                                <button type="button" class="btn btn-outline-danger" @click="this.$refs.DelModal.show_Modal('delete', item)">
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
    </div>
</template>

<script>
import CouponsModal from '@/components/CouponsModal.vue'
import DelModal from '@/components/DelModal.vue'
const { VITE_APP_API_URL: apiUrl, VITE_APP_API_NAME: apiPath } = import.meta.env

export default {
  data () {
    return {
      coupons: [],
      pagination: {},
      isLoading: false
    }
  },
  components: {
    CouponsModal,
    DelModal
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
        alert(err)
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
