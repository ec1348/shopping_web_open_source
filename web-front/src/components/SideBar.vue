<template>
  <div class="sidebar-business">
      <nav class="menu-flex">  <!--block-->
        <div class="sidebar-box">
          <router-link to="/cakes" @click="toggleBusSidebar()" class="side-bar-link">CAKES</router-link>
        </div>
        <div class="sidebar-box">
          <router-link to="/breads" @click="toggleBusSidebar()" class="side-bar-link">BREADS</router-link>
        </div>
        <div class="sidebar-box">
          <router-link to="/cookies" @click="toggleBusSidebar()" class="side-bar-link">COOKIES</router-link>
        </div>
        <div class="sidebar-box">
          <router-link to="/desserts" @click="toggleBusSidebar()" class="side-bar-link">DESSERTS</router-link>
        </div>
        <div class="sidebar-box">
          <router-link to="/" @click="toggleBusSidebar()" class="side-bar-link">Home</router-link><!--inline-->
        </div>
        <div class="sidebar-box">
          <router-link to="/about" @click="toggleBusSidebar()" class="side-bar-link">About</router-link>
        </div>
        <div class="sidebar-box">
          <router-link to="/our-shops" @click="toggleBusSidebar()" class="side-bar-link">Our shops</router-link>
        </div>
      </nav>
  </div>
</template>

<script>

export default {
  name: "Sidebar",
  components: {
  },
  methods: {
    toggleBusSidebar(){
        this.$emit('toggleBusSidebar',false)
    }
  }
};
</script>
