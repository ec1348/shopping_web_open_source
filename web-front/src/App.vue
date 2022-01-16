<template>
  <header class="page-header">
    <div class="header-up">
      <div class="menu-flex menu-icon-container" style="display: none">
        <div @click="toggleBusSidebar" class="hamburger" :class="showBusSideBar ? 'hamburgerOpen' : ''">
          <div class="hamburger_item hamburger_item--first"></div>
          <div class="hamburger_item hamburger_item--second"></div>
          <div class="hamburger_item hamburger_item--third"></div>
        </div>
      </div>
      <nav class="menu-flex menu-business">  <!--block-->
        <router-link to="/" class="top-bar-link">Home</router-link><!--inline-->
        <router-link to="/about" class="top-bar-link">About</router-link>
        <router-link to="/our-shops" class="top-bar-link">Our shops</router-link>
      </nav>
      <router-link to="/" class="menu-flex menu-logo"> <!--inline-->
        <svg-icon iconClass="logo" className="logo-icon" />
      </router-link>
      <nav class="menu-flex menu-customer"> <!--block-->
        <a @click="toggleAccountSidebar" class="top-bar-link customer-account"> <!--inline-->
          <svg-icon iconClass="user" className="user-icon" /> <!--inline-->
        </a>
        <router-link @mouseover="showCart = true" @mouseleave="showCart = false" to="/cart" class="top-bar-link checkout-cart">
          <svg-icon iconClass="cart" className="cart-icon" />
          <span>({{ totalQuantity }}) </span>
        </router-link>
        <CartSidebar 
          @mouseover="showCart = true"
          @mouseleave="showCart = false"
          v-show="showCart"
          :cart = "cart"
          :inventory = "inventory"
          :remove = "removeItem"
          class="cartSideBar"
        />
      </nav>
    </div>
    <div class="header-down">
      <div class="header-down-container">
        <div class="header-down-box">
          <router-link to="/cakes" class="header-down-link">CAKES</router-link>
        </div>
        <div class="header-down-box">
          <router-link to="/breads" class="header-down-link">BREADS</router-link>
        </div>
        <div class="header-down-box">
          <router-link to="/cookies" class="header-down-link">COOKIES</router-link>
        </div>
        <div class="header-down-box">
          <router-link to="/desserts" class="header-down-link">DESSERTS</router-link>
        </div>
      </div>
    </div>
  </header>

  <transition name="sidebar-slide">
    <Sidebar
      v-if = "showBusSideBar"
    />
  </transition>
  <transition name="account-sidebar-slide">
    <AccountSidebar
      v-if = "showAccountSideBar"
      :user_info = "user_info"
      @toggleAccountSidebar="showAccountSideBar=$event"
    />
  </transition>
  <router-view 
    :inventory = "inventory"
    :addToCart = "addToCart"
    :emptyCart = "emptyCart"
    :cart = "cart"
    :remove = "removeItem"
    :user_info = "user_info"
    @toggleAccountSidebar="showAccountSideBar=$event"
  />

  <Footer v-if="!showBusSideBar"
  />
</template>

<script>
import Sidebar from '@/components/SideBar.vue'
import Footer from '@/components/Footer.vue'
import AccountSidebar from '@/components/AccountSideBar.vue'
import CartSidebar from '@/components/CartSideBar.vue'
export default {
  data(){
    return {
      showBusSideBar: false,
      showAccountSideBar: false,
      showCart: false,
      inventory: [],
      cart: {},
      user_info: {}
    }
  },
  components: {
    Sidebar,
    AccountSidebar,
    CartSidebar,
    Footer
  },
  methods:{
    toggleBusSidebar () {
      this.showBusSideBar = !this.showBusSideBar
    },
    toggleAccountSidebar () {
      if(localStorage.getItem('token')){
        this.$router.push({name: 'Account'})
      }else{
        this.showAccountSideBar = !this.showAccountSideBar
      }
    },
    addToCart (name) {
      if (!this.cart[name]) this.cart[name] = 0
      // console.log("name:", name, "index: ", index)
      this.cart[name] += 1
    },
    emptyCart(){
      this.cart = {}
    },
    removeItem (name) {
      delete this.cart[name]
    },
    async getData() {
        const url = 'api/product'
        let res = await this.$api.get(url)
        this.inventory = res.result
        console.log(res.result)
    }
  },
  created(){
      this.getData()
  },
  computed: {
    totalQuantity () {
      return Object.values(this.cart).reduce((sum, cur) => {
        return sum + cur
      }, 0)
    }
  }

}
</script>

<style lang="scss" scope>
.user-icon,
.cart-icon{
  color: #9f9f9f;
}
.logo-icon{
  width: 300px !important;
  height: 70px !important;
}
</style>
