<template>
  <div class="amain">
    <div class="left">
      <h2>无锡市道路交通协会后台管理系统</h2>
    </div>
    <div class="right">
      <h1>登&nbsp&nbsp&nbsp&nbsp录</h1>
      <a-form
        id="formLogin"
        class="user-layout-login left-f"
        ref="formLogin"
        :form="form"
        @submit="handleSubmit"
      >
        <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误" />
        <a-form-item>
          <a-input
            class="l-input"
            size="large"
            type="text"
            placeholder="请输入账户"
            v-decorator="[
              'username',
              {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
            ]"
          >
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            size="large"
            class="l-input"
            type="password"
            autocomplete="false"
            placeholder="请输入密码"
            v-decorator="[
              'password',
              {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
            ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >登录</a-button>
        </a-form-item>
      </a-form>
    </div>

  </div>
</template>

<script>
// import md5 from 'md5'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {
    // this.requiredTwoStepCaptcha = true
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.username
          loginParams.username = values.username
          loginParams.password = values.password
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      console.log(res)
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      /*
      this.$router.push({ name: 'analysis' }, () => {
        console.log('onComplete')
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      */
      this.$router.push({ path: '/dashboard/workplace' }, () => {
        console.log('onComplete')
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      console.log(123)
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.amain{
    width: 1388px;
    height: 788px;
    z-index: 2;
    background: url('../../assets/back.png') no-repeat;
    background-size: 1388px 788px;
    display: flex;
    .left{
      flex:1;
      h2{
        width: 480px;
        font-size: 32px;
        height: 48px;
        color:#fff;
        margin-top: 150px;
        margin-left:135px;
        border-bottom: 13px solid #4EABFF;
      }
    }
    .right{
      flex:1;
      h1{
        padding: 0 10px;
        width: 93px;
        font-size: 32px;
        height: 48px;
        font-weight: 700;
        margin-top: 200px;
        margin-left:240px;
        color: #0080FF;
        border-bottom: 10px solid #cce4ff;
      }
      .left-f{
        margin-top: 60px;
        margin-left:50px;
        width: 460px;
      }
    }
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 60px;
    width: 100%;
    border-radius: 30px !important;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
