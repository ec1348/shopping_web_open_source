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
      <a href="/" class="menu-flex menu-logo"> <!--inline-->
        <svg-icon iconClass="logo" className="logo-icon" />
      </a>
      <nav class="menu-flex menu-customer"> <!--block-->
        <a href="/customer/accout" class="top-bar-link customer-account"> <!--inline-->
          <svg-icon iconClass="user" className="user-icon" /> <!--inline-->
        </a>
        <a href="/checkout/cart" class="top-bar-link checkout-cart">
          <svg-icon iconClass="cart" className="cart-icon" />
        </a>
      </nav>
    </div>
    <div class="header-down">
      <div class="header-down-container">
        <div class="header-down-box">
          <a href="/collections/cake" class="header-down-link">CAKES</a>
        </div>
        <div class="header-down-box">
          <a href="/breads" class="header-down-link">BREADS</a>
        </div>
        <div class="header-down-box">
          <a href="/cookies" class="header-down-link">COOKIES</a>
        </div>
        <div class="header-down-box">
          <a href="/desserts" class="header-down-link">DESSERTS</a>
        </div>
      </div>
    </div>
  </header>

  <transition name="slide">
    <Sidebar
      v-if = "showBusSideBar"
    />
  </transition>
  <router-view />

  <Footer v-if="!showBusSideBar"
  />
</template>

<script>
import Sidebar from '@/components/SideBar.vue'
import Footer from '@/components/Footer.vue'
export default {
  data(){
    return {
      showBusSideBar: false
    }
  },
  components: {
    Sidebar,
    Footer
  },
  methods:{
    toggleBusSidebar () {
      this.showBusSideBar = !this.showBusSideBar
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
