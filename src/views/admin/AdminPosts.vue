<template>
    <h1>貼文頁面</h1>
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
export default {

}
</script>
