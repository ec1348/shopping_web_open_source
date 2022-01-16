<template>
    <div class="checkout-page">
        <div class="checkout-wrapper">
            <div class="checkout-wrapper-title">
                <h1>SHIPPING &amp; PAYMENT</h1>
            </div>
            <div class="checkout-info" v-if="Object.keys(cart).length">
                <div class="shippng-payment-info">
                    <div class="shipping-wrapper">
                        <h1>SHIPPING INFORMATION</h1>
                        <form @submit.prevent="shippingAddress" class="address-form">
                            <label for="name">Receiver Full Name:</label>
                            <input v-model="name" type="text" placeholder="FULL NAME">
                            <label for="address">Address:</label>
                            <label for="street">Street:</label>
                            <input v-model="street" type="text" placeholder="Street">
                            <div class="flex">
                              <div>
                                <label for="city">City:</label>
                                <input v-model="city" type="text" placeholder="City">
                              </div>
                              <div>
                                <label for="zipCode">Zip Code:</label>
                                <input v-model="zipCode" type="text" placeholder="Zip Code">
                              </div>
                              <div>
                                <label for="country">Country:</label>
                                <input v-model="country" type="text" placeholder="Country">
                              </div>
                            </div>
                            
                            <!-- <button>CONFIRM ADDRESS INFORMATION</button> -->
                        </form>
                    </div>
                    <div class="payment-wrapper">
                        <h1>PAYMENT INFORMATION</h1>
                        <form @submit.prevent="payment" class="payment-form">
                            <label for="cardHolder">Name on Card:</label>
                            <input v-model="cardHolderName" type="text" placeholder="FULL NAME">
                            <label for="cardNumber">Card Number:</label>
                            <input v-model="cardNumber" type="text" placeholder="0123456789(FAKE DATA)">
                            <div class="flex">
                              <div>
                                <label for="expiration">Expiration</label>
                                <div class="flex">
                                  <input v-model="expMonth" type="text" placeholder="MM">
                                  <p>/</p>
                                  <input v-model="expYear" type="text" placeholder="YY">
                                </div>
                              </div>                              
                              <div>
                                <label for="cvv">CVV</label>
                                <input v-model="cvv" type="text" placeholder="123">
                              </div>
                            </div>
                            
                            <!-- <button>CONFIRM PAYMENT INFORMATION</button> -->
                        </form>
                    </div>
                    <button @click="compelteOrder()" class="btn btn-light">PAY NOW</button>
                </div>
                <div class="checkout-summary">
                    <h2>SUMMARY</h2>
                    <p><strong> Total: </strong>NTD <span>{{calculatTotal()}}</span></p>
                    <p>Shipping Fee included</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Checkout",
  props: {
      "cart": Object,
      "inventory": Array,
      "emptyCart": Function
  },
  data() {
    return{
      orderID: "",
      name: "",
      street: "",
      city: "",
      zipCode: "",
      country: "",
      cardHolderName: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvv: ""
    }
  },
  created() {
    this.orderID = this.$route.params.orderID
  },
  methods: {
    getPrice (name) {
      const product = this.inventory.find((p) => {
        return (p.name === name)
      })
      return product.price
    },
    calculatTotal () {
      const total = Object.entries(this.cart).reduce((sum, cur) => {
        return (sum += (cur[1] * this.getPrice(cur[0])))
      }, 0)
      return total.toFixed(2)
    },
    async compelteOrder () {
      if(localStorage.getItem('token') && localStorage.getItem('login') == 'true'){
        /* Prepare data for completing order API */
        const url = 'api/order/complete'
        const params = {
          orderID: this.orderID
        }
        const headers = {
          "token": localStorage.getItem('token')
        }
        // console.log(headers.token)
        let res = await this.$api.put(url, params, headers)
        // console.log(res.result)
        if(res.result.status === "Order has complished."){
            this.$router.push({name: 'Home'})
            this.emptyCart()
            alert(res.result.message)
        }else{
            alert(res.result.err)
        }
      }else{
        this.toggleAccountSidebar()
      }
    }
  }
}
</script>