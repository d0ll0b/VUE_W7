<template>
    <h1>優惠卷頁面</h1>
    <VueLoading :active="isLoading" />
    <div class="container">
        <div class="mt-4">
            <div class="text-end">
                <button class="btn btn-primary" type="button" @click="delete_cart()">新增優惠卷</button>
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
                            <td>
                                {{ item.title }}
                            </td>
                            <td>
                                {{ item.percent }} %
                            </td>
                            <td>
                                {{ item.due_date }}
                            </td>
                            <td class="text-end">
                                {{ item.is_enabled }}
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
const apiUrl = import.meta.env.VITE_APP_API_URL
const apiPath = import.meta.env.VITE_APP_API_NAME

export default {
  data () {
    return {
      coupons: [],
      pagination: {}
    }
  },
  methods: {
    getCoupons (page = 1) {
    //   this.isLoading = true
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
