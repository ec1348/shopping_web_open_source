<template>
    <div class="cart-page">
        <div class="cart-wrapper">
            <div class="cart-wrapper-title">
                <h1>MY SHOPPING CART</h1>
            </div>
            <p class="center" v-if="!Object.keys(cart).length"><em>No items in cart</em></p>
            <div class="cart-info" v-if="Object.keys(cart).length">
                <div class="cart-product-wrapper">
                    <div v-for="(quantity ,key ,i) in cart" 
                        :key = "i" 
                        class="cart-product-item">
                        <div class="cart-product-image">
                            <img :src="getImg_url(key)" alt="">
                        </div>
                        <div class="cart-product-name-wrapper">
                            <div class="cart-product-name">{{key}}</div>
                            <p class="cart-product-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus officiis veniam, rerum cupiditate dolore consequatur modi voluptate hic ipsum a?</p>
                        </div>
                        <div class="cart-product-quantity">{{quantity}}</div>
                        <div class="cart-product-price">NTD {{getPrice(key) * quantity}}</div>
                        <button @click="remove(key)" class="btn btn-light cart-remove">
                            <svg-icon iconClass="trashBin" className="trashBin-icon" />
                        </button>

                    </div>
                </div>
                <div class="cart-summary">
                    <h2>SUMMARY</h2>
                    <p><strong> Total: </strong>NTD <span>{{calculatTotal()}}</span></p>
                    <p>Shipping Fee included</p>
                    <button @click= "processOrder" class="btn btn-light">PROCESS TO CHECKOUT</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
      "cart": Object,
      "inventory": Array,
      "remove": Function,
      "showAccountSideBar": Boolean,
  },
  data() {
    return{
      productID: "",
      quantity: ""
    }
  },
  methods: {
    getPrice (name) {
      const product = this.inventory.find((p) => {
        return (p.name === name)
      })
      return product.price
    },
    getImg_url(name){
      const product = this.inventory.find((p) => {
        return (p.name === name)
      })
      return product.img_url
    },
    getProductId(name){
      const product = this.inventory.find((p) => {
        return (p.name === name)
      })
      return product.id
    },
    calculatTotal () {
      const total = Object.entries(this.cart).reduce((sum, cur) => {
        return (sum += (cur[1] * this.getPrice(cur[0])))
      }, 0)
      return total.toFixed(2)
    },
    async processOrder(){
      if(localStorage.getItem('token') && localStorage.getItem('login') == 'true'){
        /* Prepare data for creating order API */
        const url = 'api/order'
        let arrayID = []
        Object.keys(this.cart).forEach(element => {
          arrayID.push(this.getProductId(element))
        })
        this.productID = arrayID.join(', ')
        this.quantity = Object.values(this.cart).join(', ')
        const params = {
          productID: this.productID,
          quantity: this.quantity
        }
        const headers = {
          "token": localStorage.getItem('token')
        }
        // console.log(headers.token)
        let res = await this.$api.post(url, params, headers)
        // console.log(res.data.result)
        if(res.data.result.status == "Create order successfully."){
            this.$router.push(
              {name: 'Checkout', 
              params: {orderID: res.data.result.newOrder.order_id}}
              )
        }else{
            alert(res.data.result.err)
        }
      }else{
        this.toggleAccountSidebar()
      }
      
    },
    toggleAccountSidebar(){
        this.$emit('toggleAccountSidebar',true)
    }
  }
}
</script>