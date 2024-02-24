<template>
    <h1>訂單頁面</h1>
    <VueLoading :active="isLoading" />
    <div class="container">
        <div class="mt-4">
            <div class="text-end">
                <button class="btn btn-outline-danger" type="button" v-if="carts.length" @click="delete_cart()">清空購物車</button>
            </div>
            <table class="table align-middle">
            <thead>
                <tr>
                    <th>購買日期</th>
                    <th>訂購人</th>
                    <th>購買品項(數量/單位)</th>
                    <th>應付金額</th>
                    <th>付款與否</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="orders">
                <tr v-for="item in orders" :key="item.id">
                    <td>
                        {{ item.create_at }}
                    </td>
                    <td>
                        {{ item.user.name }}
                    </td>
                    <td>
                        <!-- v-for="product in products" :key="product.id"
                        {{ item.product_id }} {{ item.qty }} -->
                    </td>
                    <td>

                    </td>
                    <td>
                        {{ item.is_paid }}
                    </td>
                    <td class="text-end">
                    </td>
                </tr>
                </template>
            </tbody>
            <tfoot>
                <!-- <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end"></td>
                </tr>
                <tr v-if="carts.total !== carts.finalTotal">
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success"></td>
                </tr> -->
            </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
const { VITE_APP_API_URL: apiUrl, VITE_APP_API_NAME: apiPath } = import.meta.env

export default {
  data () {
    return {
      orders: [],
      pagination: {}
    }
  },
  methods: {
    getOrders (page = 1) {
    //   this.isLoading = true
      const api = `${apiUrl}/api/${apiPath}/admin/orders?page=${page}`
      this.axios.get(api).then((res) => {
        const { orders, pagination } = res.data
        this.orders = orders
        this.pagination = pagination
      }).catch((err) => {
        alert(err)
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
