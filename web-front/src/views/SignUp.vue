<template>
  <div class="signUp-page">
    <div class="signUp-wrapper">
        <div class="signUp-header">
            <div class="signUp-title">
                <p>CREATE A NEW ACCOUNT</p>
            </div>
        </div>
        <div class="signUp-body">
            <div class="signUp-container">
                <div class="signUp-container-title">
                    <p>ACCOUNT INFORMATION</p>
                </div>
                <form @submit.prevent="SignUp" class="signUp-form">
                    <label for="name">Name</label>
                    <input v-model="name" type="text" placeholder="FULL NAME">
                    <label for="email">Email</label>
                    <input v-model="email" type="email" placeholder="Email">
                    <label for="password">Password</label>
                    <input v-model="password" placeholder="Password" type="password">
                    <button>CREATE AN ACCOUNT</button>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "signUp",
  components: {
  },
  data(){
      return{
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
      }
  },
  methods:{
    resetForm(){
        this.name = ''
        this.email = ''
        this.password = ''
    },
    async SignUp(){
        const url = 'api/member'
        const params = {
            name: this.name,
            email : this.email,
            password : this.password
        }
        let res = await this.$api.post(url, params)
        // console.log(res.data.result)
        if(res.data.result.status == "Register successfully"){
            this.$router.push({name: 'Home'})
        }else{
            alert(res.data.result.err)
        }
        this.SignIn()
        this.resetForm()
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
    }
  }
};
</script>
