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
          <a-col :span="12"><a-form-item
            label="会员编号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入会员编号"
              v-decorator="['serialNumber', {rules: [{required: true, message: '请输入会员编号！'}]}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="商家名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入商家名称"
              v-decorator="['name', {rules: [{required: true, message: '请输入商家名称！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="联系地址"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入联系地址"
              v-decorator="['address', {rules: [{required: true, message: '请输入联系地址！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="手机号码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入手机号码"
              v-decorator="['phoneNumber', {rules: [{required: true, message: '请输入手机号码！'},
                                                    {validator:phoneCheck}]}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="排序权重"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入排序权重"
              v-decorator="['sortOrder']" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item
              label="封面"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <!--
                :file-list="fileList" -->
              <a-upload
                v-decorator="[
                  'cover',
                  {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                    rules: [{required: true, message: '请上传封面图片！'}]
                  },
                ]"
                action="http://101.132.194.14/traffic/mall/photo/upload"
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
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="简介"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              type="textarea"
              placeholder="请输入简介"
              :rows="3"
              v-decorator="['brief']" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="备注"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              type="textarea"
              :rows="3"
              placeholder="请输入备注"
              v-decorator="['remark']" />
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { add, update } from '@/api/shop'
import moment from 'moment'

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
        sm: { span: 4 }
      },
      wrapperCol2: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: '添加商家',
      rid: '',
      fileListLength: 0
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
    phoneCheck (rule, value, callbackFn) {
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (value && !reg.test(value)) {
        callbackFn('请输入正确的手机号码！')
        } else {
          callbackFn()
      }
    },
    add () {
      this.visible = true
      this.title = '添加商家'
    },
    update (val) {
      this.visible = true
      this.title = '编辑商家'
      this.rid = val.id
      setTimeout(() => {
        this.form.setFieldsValue({
          serialNumber: val.serialNumber,
          name: val.name,
          address: val.address,
          phoneNumber: val.phoneNumber,
          sortOrder: val.sortOrder,
          cover: [{
              uid: '-1',
              name: '商家封面图',
              status: 'done',
              url: val.cover
            }],
          brief: val.brief,
          remark: val.remark
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
          if (this.title === '添加商家') {
            const uploadData = JSON.parse(JSON.stringify(values))
            uploadData.picUrl = uploadData.picUrl[0].response.result
            add(uploadData).then(res => {
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
            const uploadData = JSON.parse(JSON.stringify(values))
            uploadData.picUrl = uploadData.picUrl[0].response.result
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
        } else {
          console.log(8888, errors)
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
