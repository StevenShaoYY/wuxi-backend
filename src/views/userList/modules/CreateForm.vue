<template>
  <a-modal
    :title="title"
    :width="840"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="管理员类型"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-select
              v-decorator="[
                'type', {rules: [{required: true, message: '请选择管理员类型！'}]}]"
              placeholder="请选择管理员类型"
              @change="showCom"
            >
              <a-select-option :value="1">
                管理员
              </a-select-option>
              <a-select-option :value="2">
                前台
              </a-select-option>
              <a-select-option :value="3">
                单位管理员
              </a-select-option>
            </a-select>
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            v-if="showCompany"
            label="单位名称"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-select
              v-decorator="[
                'companyId',{rules: [{required: true, message: '请选择单位名称！'}]}]"
              placeholder="请选择单位名称"
            >
              <a-select-option v-for="(item, index) of companyList" :key="index" :value="item.id">
                {{ item.companyName }}
              </a-select-option>
            </a-select>
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="用户名"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入用户名"
              v-decorator="['username', {rules: [{required: true, message: '请输入用户名！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="姓名"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入姓名"
              v-decorator="['name', {rules: [{required: true, message: '请输入姓名！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="密码"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入密码"
              type="password"
              v-decorator="['password', {rules: [
                {required: pwaRequired, message: '请输入密码！'},
                {
                  validator: validateToNextPassword,
                },]}]" />

          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="确认密码"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入确认密码"
              type="password"
              v-decorator="['password2', {rules: [
                {required: pwaRequired, message: '请输入确认密码！'},
                {
                  validator: compareToFirstPassword,
                }]}]" />

          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="角色"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-select
              mode="multiple"
              v-decorator="[
                'roles', {rules: [{required: true, message: '请选择角色！'}]}]"
              placeholder="请选择角色"
            >
              <a-select-option v-for="(item, index) of roleList" :key="index" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="备注"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-textarea
              placeholder="请输入备注"
              :rows="3"
              v-decorator="['remark', {initialValue:''}]" />
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getRoleAll, addAdmin, updateAdmin } from '@/api/role'
import { getComList } from '@/api/huiyuan'

export default {
  data () {
    return {
      labelCol2: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol2: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      visible: false,
      confirmLoading: false,
      roleList: [],
      form: this.$form.createForm(this),
      title: '新增会员',
      rid: '',
      pwaRequired: true,
      companyList: [],
      showCompany: false
    }
  },
  created () {
    getRoleAll({}).then(res => {
      this.roleList = res.result
    })
    getComList({}).then(res => {
      this.companyList = res.result
    })
  },
  methods: {
    showCom (val) {
      console.log(val)
      if (val === 3) {
        this.showCompany = true
      } else {
        this.showCompany = false
      }
    },
    compareToFirstPassword (rule, value, callbackFn) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callbackFn('两次输入密码不相同！')
      } else {
        callbackFn()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['password2'], { force: true })
      }
      callback()
    },
    add () {
      this.visible = true
      this.title = '新增管理员'
      this.pwaRequired = true
    },
    update (val) {
      this.visible = true
      this.title = '编辑管理员'
      this.rid = val.id
      this.pwaRequired = false
      if (val.type === 3) {
        this.showCompany = true
      }
      setTimeout(() => {
        this.form.setFieldsValue({
          name: val.name,
          username: val.username,
          password: '',
          password2: '',
          roles: val.roles,
          remark: val.remark,
          type: val.type,
          companyId: val.companyId
        })
      }, 100)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          if (this.title === '新增管理员') {
            delete values.password2
            addAdmin(Object.assign(values)).then(res => {
              if (res.code === '200') {
                this.visible = false
                this.confirmLoading = false
                this.$message.success('新增成功')
                this.form.resetFields()
                this.$emit('ok', values)
              } else {
                this.confirmLoading = false
                this.$message.error('新增失败！' + res.message)
              }
            })
          } else {
            updateAdmin(Object.assign(values, {
              id: this.rid
            })).then(res => {
              if (res.code === '200') {
                this.visible = false
                this.confirmLoading = false
                this.$message.success('编辑成功')
                this.form.resetFields()
                this.$emit('ok', values)
              } else {
                this.confirmLoading = false
                this.$message.error('编辑失败！' + res.message)
              }
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.showCompany = false
      this.form.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
  .line{
    border-top: 1px solid #E8E8E8;
  }
</style>
