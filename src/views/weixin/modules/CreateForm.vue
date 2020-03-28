<template>
  <a-modal
    :title="title"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row>
          <a-col :span="24" style="text-align:center;">
            <img :src="dataForm.articles[0].thumbUrl" alt="">
          </a-col>
        </a-row>
        <a-row style="margin:18px 0;font-size: 14px;color: rgba(0, 0, 0, 0.85);">
          <a-col :span="6" style="text-align:right;padding-right:8px;">
            <span>消息标题:</span>
          </a-col>
          <a-col :span="18" style="text-align:left;color: rgba(0, 0, 0, 0.65);">
            <span>{{ dataForm.articles[0].title }}</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="发送方式"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-radio-group v-decorator="['gender',{initialValue:'1'}]" @change="handleSelectChange">
              <a-radio value="1">群发</a-radio>
              <a-radio value="2">单发</a-radio>
            </a-radio-group>
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" v-if="sendtype==1"><a-form-item
            label="会员标签"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-select
              v-decorator="[
                'tagId',{initialValue:nationList[0].id}]"
              placeholder="请选择会员标签"
            >
              <a-select-option v-for="(item, index) of nationList" :key="index" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item></a-col>
          <a-col :span="24" v-else><a-form-item
            label="会员手机号码"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入手机号码"
              v-decorator="['phoneNumber', {rules: [{required: true, message: '请输入手机号码！'},
                                                    {validator:phoneCheck}]}]" />
          </a-form-item></a-col>
        </a-row>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getTag, sendNews } from '@/api/wx'
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
      nationList: [],
      xueLi: [],
      xueWei: [],
      carbookType: [],
      vipType2: [],
      form: this.$form.createForm(this),
      title: '新增会员',
      dataForm: {},
      sendtype: '1'
    }
  },
  created () {
    getTag({}).then(res => {
      this.nationList = res.result
    })
  },
  methods: {
    handleSelectChange (val) {
      console.log(val)
      this.sendtype = val.target.value
    },
    phoneCheck (rule, value, callbackFn) {
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (value && !reg.test(value)) {
        callbackFn('请输入正确的手机号码！')
        } else {
          callbackFn()
      }
    },
    update (val) {
      this.visible = true
      this.title = '发送图文'
      this.dataForm = val
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
            sendNews({
              id: this.dataForm.mediaId,
              sendWay: this.sendtype,
              tagId: values.tagId,
              phoneNumber: values.phoneNumber
            }).then(res => {
              if (res.code === '200') {
                this.visible = false
                this.confirmLoading = false
                this.$message.success('发送成功')
                this.form.resetFields()
                this.$emit('ok', values)
              } else {
                this.confirmLoading = false
                this.$message.error('发送失败！' + res.message)
              }
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.sendtype = '1'
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
