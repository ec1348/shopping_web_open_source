<template>
    <aside class="cart-container">
    <div class="cart">
      <h1 class="cart-title">
        <span>
          Cart
        </span>
      </h1>

      <div class="cart-body">
        <table class="cart-table">
          <thead>
            <tr>
              <th><span class="sr-only">Product Image</span></th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="( quantity, key, i ) in cart" :key = "i">
              <td>
                <img :src="getImg_url(key)" alt="">
              </td>
              <td>{{ key }}</td>
              <td>${{ getPrice(key) }}</td>
              <td class="center"> {{ quantity }} </td>
              <td>${{ getPrice(key) * quantity }}</td>
              <td class="center" >
                <button @click="remove(key)" class="btn btn-light cart-remove">
                  &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="center" v-if="!Object.keys(cart).length"><em>No items in cart</em></p>
        <div class="spread">
          <span><strong>Total:</strong> NTD$ {{ calculatTotal() }}</span>
          <router-link to="/cart" class="link-to-cart">Check My Cart</router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "CartSidebar",
  props: ['cart', 'inventory', 'remove'],
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
    calculatTotal () {
      const total = Object.entries(this.cart).reduce((sum, cur) => {
        return (sum += (cur[1] * this.getPrice(cur[0])))
      }, 0)
      return total.toFixed(2)
    },
    processOrder(){
      this.$emit('cartReadytoProcess', this.cart)
      
    }
  }
}
</script>
