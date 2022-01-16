<template>
  <div class="sidebar-account-page">
    <div class="overlay"></div>
    <div class="sidebar-account-wrapper">
        <div class="sidebar-account-header">
            <div class="account-title">
                <p>MY ACCOUNT</p>
            </div>
            <div @click="toggleAccountSidebar()" class="account-sidebar-hamburger">
                <div class="hamburger_item hamburger_item--first"></div>
                <div class="hamburger_item hamburger_item--second"></div>
                <div class="hamburger_item hamburger_item--third"></div>
            </div>
        </div>
        <div class="sidebar-account-body">
            <div class="login-container">
                <div class="login-container-title">
                    <p>YOU ALREADY HAVE A ERIC PASTRY TAIPEI ACCOUNT ?</p>
                </div>
                <form @submit.prevent="SignIn" class="login-form">
                    <label for="email">Email:</label>
                    <input v-model="email" type="email" placeholder="Email">
                    <label for="password">Password</label>
                    <input v-model="password" placeholder="Password" type="password">
                    <button>LOGIN</button>
                </form>
            </div>
        </div>
        <div class="sidebar-account-footer">
            <p>DON'T HAVE AN ACCOUNT ?</p>
            <div class="a-container">
                <router-link to="/signup" @click="toggleAccountSidebar()">CREATE MY ACCOUNT</router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AccountSidebar",
  components: {
  },
  data(){
      return{
          email: "",
          password: ""
      }
  },
  props: {
    "user_info" : Object
  },
  methods:{
    resetForm(){
        this.email = ''
        this.password = ''
    },
    async SignIn(){
        const url = 'api/member/login'
        const params = {
            email : this.email,
            password : this.password
        }
        let res = await this.$api.post(url, params)
        // console.log(res.data.result)
        if(res.data.result.status == "login succeffully"){
            localStorage.setItem('token', res.headers["token"])
            localStorage.setItem('login',true)
            setTimeout(() => {
                localStorage.removeItem('token')
                localStorage.setItem('login',false)
            }, 1000*60*10)
            this.toggleAccountSidebar()
            this.$router.push({name: 'Home'})
        }else{
            alert(res.data.result.err)
        }
        this.resetForm()
    },
    toggleAccountSidebar(){
        this.$emit('toggleAccountSidebar',false)
    }
  }
};
</script>
