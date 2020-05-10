<template>
  <a-modal
    :title="title"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row style="margin:18px 0;font-size: 14px;color: rgba(0, 0, 0, 0.85);">
          <a-col :span="6" style="text-align:right;padding-right:8px;">
            <span>配置名称:</span>
          </a-col>
          <a-col :span="18" style="text-align:left;color: rgba(0, 0, 0, 0.65);">
            <span>{{ dataForm.configName }}</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item
              label="配置值"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <a-input
                placeholder="请输入配置值"
                v-decorator="['configValue', {rules: [{required: true, message: '请输入配置值！'}]}]" />
            </a-form-item></a-col>
        </a-row>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { update } from '@/api/config'
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      labelCol2: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol2: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: '修改配置值',
      dataForm: {}
    }
  },
  created () {
  },
  methods: {
    update (val) {
      this.visible = true
      this.title = '修改配置值'
      this.dataForm = val
      setTimeout(() => {
        this.form.setFieldsValue({
          configValue: val.configValue
        })
      }, 100)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
            update({
              id: this.dataForm.id,
              configName: this.dataForm.configName,
              configValue: values.configValue
            }).then(res => {
              if (res.code === '200') {
                this.visible = false
                this.confirmLoading = false
                this.$message.success('修改成功')
                this.form.resetFields()
                this.$emit('ok', values)
              } else {
                this.confirmLoading = false
                this.$message.error('修改失败！' + res.message)
              }
            })
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
    margin-bottom: 25px;
  }
</style>
