<template>
  <a-modal
    :title="title"
    :width="840"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="角色名"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入用户名"
              v-decorator="['name', {rules: [{required: true, message: '请输入用户名！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="角色功能权限"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-checkbox-group
              v-decorator="[
                'modules', {rules: [{required: true, message: '请选择角色权限'}]}]"
              placeholder="请选择角色权限"
            >
              <a-row>
                <a-col :span="24" v-for="(item, index) of roleList" :key="index">
                  <a-checkbox :value="item.id">
                    {{ item.displayName }}
                  </a-checkbox>
                </a-col>

              </a-row>

            </a-checkbox-group>
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
import { getModule, addRole, updateRole } from '@/api/role'
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
      rid: ''
    }
  },
  created () {
    getModule({}).then(res => {
      this.roleList = res.result
    })
  },
  methods: {
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
    },
    update (val) {
      this.visible = true
      this.title = '编辑管理员'
      this.rid = val.id
      setTimeout(() => {
        this.form.setFieldsValue({
          name: val.name,
          modules: val.modules,
          remark: val.remark
        })
      }, 100)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          if (this.title === '新增管理员') {
            addRole(Object.assign(values)).then(res => {
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
            updateRole(Object.assign(values, {
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
