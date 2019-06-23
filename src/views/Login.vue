<template>
  <div>
    <cube-form :model="model" :schema="schema" @submit="handleLogin" @validate="handleValidate"  @reset="handleReset"></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      schema: {
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              // 校验规则
              required: true
            },
            trigger: "blur",
            messages: {
              required: "用户名为必填项"
            }
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: { open: false }
            },
            rules: {
              // 校验规则
              required: true
            },
            trigger: "blur",
            messages: {
              required: "密码为必填项"
            }
          },
          {
            type: "submit",
            label: "登录"
          },
          {
            type: "reset",
            label: "重置"
          }
        ]
      }
    };
  },
  methods: {
    async handleLogin(e) {
      e.preventDefault();
      //console.log("登录");
    const res = await this.$http.get('/api/login',{params:{
      username:this.model.username,
      password:this.model.password
    }});
    console.log(res);
    const {code,token,message}=res.data;
    if(code==0){
      console.log('');
      localStorage.setItem('token',token);
      this.$store.commit('setToken',token);
      const {redirect} = this.$route.query||'/';
      this.$router.push(redirect);
    }else{
      console.log();
      const toast = this.$createToast({
        time:2000,
        txt: message||'',
        type: 'error'
      });
      toast.show();
    }
    },
    handleValidate(ret) {
      console.log("校验:" + ret);
    },
    handleReset(e) {
      console.log("重置:" + e);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
