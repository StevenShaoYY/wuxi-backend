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
            label="菜单名称"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              :disabled="true"
              placeholder="请输入菜单名称"
              v-decorator="['name', {rules: [{required: true, message: '请输入菜单名称！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item
              label="菜单图片"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <!--
                :file-list="fileList" -->
              <a-upload
                v-decorator="[
                  'ossPicUrl',
                  {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                    rules: [{required: true, message: '请上传菜单图片！'}]
                  },
                ]"
                action="http://101.132.194.14/traffic/ops/mall/photo/upload"
                list-type="picture-card"
                name="photo"
                @change="handleChange"
              >
                <div v-if="fileListLength < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    上传图片
                  </div>
                </div>
              </a-upload>
            </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { update } from '@/api/weixinmenu'
import moment from 'moment'

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
      form: this.$form.createForm(this),
      title: '添加广告',
      rid: '',
      fileListLength: 0,
      endValue: '',
      startValue: ''
    }
  },
  created () {
  },
  methods: {
    moment,
    normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    handleChange (file) {
      console.log('Upload file:', file)
      this.fileListLength = file.fileList.length
    },
    add () {
      this.visible = true
      this.title = '添加广告'
    },
    update (val) {
      this.visible = true
      this.title = '编辑菜单'
      this.rid = val.id
      setTimeout(() => {
        this.form.setFieldsValue({
          name: val.name,
          ossPicUrl: [{
              uid: '-1',
              name: '菜单图',
              status: 'done',
              url: val.ossPicUrl
            }]
        })
        this.fileListLength = 1
      }, 100)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log(values)
        if (!errors) {
            const uploadData = JSON.parse(JSON.stringify(values))
            uploadData.ossPicUrl = uploadData.ossPicUrl[0].url || uploadData.ossPicUrl[0].response.result
            update(Object.assign(uploadData, {
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
      })
    },
    handleCancel () {
      this.visible = false
      this.startValue = ''
      this.endValue = ''
      this.fileListLength = 0
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
