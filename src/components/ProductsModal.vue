<template>
  <div id="productModal" ref="productModal" class="modal fade text-start" tabindex="-1" aria-labelledby="productModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <!-- 訊息 -->
          <alert-messages ref="AlertMessages"></alert-messages>
          <!-- 訊息 -->
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span>{{ title }}產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label text-success h5 font-weight-bold ">主圖</label>
                    <input type="text" class="form-control" id="imageUrl"
                           placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                  </div>
                  <div class="mb-3" v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                    <label :for="'imagesUrl_'+key" class="form-label">附圖{{ key+1 }}</label>
                    <input type="text" class="form-control" :id="'imagesUrl_'+key"
                           placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]">
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                </div>
                <div v-if="ShowImagebtn(tempProduct)">
                  <div class="mb-3">
                    <label for="formFile" class="form-label">
                      <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
                      上傳圖片
                    </label>
                    <input class="form-control" type="file" id="formFile" ref="fileinput" @change="UploadImg" :disabled="isLoading">
                  </div>
                  <button v-if="tempProduct.imagesUrl.length < 5" class="btn btn-outline-primary btn-sm d-block w-100" @click="this.tempProduct.imagesUrl.push('');">
                    新增附圖
                  </button>
                  <button v-if="tempProduct.imagesUrl.length > 0" class="btn btn-outline-danger btn-sm d-block w-100" @click="this.tempProduct.imagesUrl.splice(-1, 1);">
                    刪除附圖
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" type="text" class="form-control"
                           placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" type="number" min="0" class="form-control"
                           placeholder="請輸入售價" v-model.number="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea id="description" type="text" class="form-control"
                            placeholder="請輸入產品描述" v-model="tempProduct.description">
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea id="content" type="text" class="form-control"
                            placeholder="請輸入說明內容" v-model="tempProduct.content">
                  </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="is_enabled" class="form-check-input" type="checkbox"
                           :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="Update_product(tempProduct.id)">
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
  props: ['product'],
  data () {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      title: '',
      ProductsModal: '',
      isLoading: false
    }
  },
  components: {
    AlertMessages
  },
  mounted () {
    this.ProductsModal = new Modal(this.$refs.productModal, {
      keyboard: false
    })

    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.axios.defaults.headers.common.Authorization = token

    this.tempProduct = { ...this.product }
  },
  methods: {
    getData () {
      this.$emit('get_data')
    },
    show_Modal (flg, item) {
      switch (flg) {
        case 'new':
          this.isNew = true
          this.tempProduct = {
            imagesUrl: []
          }
          this.ProductsModal.show()
          break
        case 'edit':
          this.isNew = false
          this.tempProduct = { ...item }
          this.ProductsModal.show()
          break
      }
    },
    Update_product (id) {
      let api = ''
      if (this.isNew === true) {
        api = `${apiUrl}/api/${apiPath}/admin/product`
        this.axios.post(api, { data: this.tempProduct }).then((res) => {
          this.$refs.AlertMessages.show_toast('新增產品成功!!!')
          this.getData()
          this.ProductsModal.hide()
        }).catch((err) => {
          this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
        })
      } else {
        api = `${apiUrl}/api/${apiPath}/admin/product/${id}`
        this.axios.put(api, { data: this.tempProduct }).then((res) => {
          this.$refs.AlertMessages.show_toast('更新產品成功!!!')
          this.getData()
          this.ProductsModal.hide()
        }).catch((err) => {
          this.$refs.AlertMessages.show_alert(err?.response.data.message, 1300, 'error')
        })
      }
    },
    ShowImagebtn (product) {
      if (!Object.prototype.hasOwnProperty.call(product, 'imagesUrl') && !Array.isArray(product.imagesUrl)) {
        product.imagesUrl = []
        product.imagesUrl.push('')
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
        if (this.tempProduct.imageUrl === '' || this.tempProduct.imageUrl === undefined) {
          this.tempProduct.imageUrl = res.data.imageUrl
        } else if (this.tempProduct.imagesUrl[this.tempProduct.imagesUrl.length - 1] === '') {
          this.tempProduct.imagesUrl[this.tempProduct.imagesUrl.length - 1] = res.data.imageUrl
        } else {
          this.tempProduct.imagesUrl.push(res.data.imageUrl)
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
