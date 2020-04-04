<template>
  <a-modal
    :title="title"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <div>
          <a-descriptions title="认证信息" :column="2">
            <a-descriptions-item label="会员类型">{{ this.dataVal.authType==1?'个人会员': '单位会员' }}</a-descriptions-item>
            <a-descriptions-item label="姓名" v-if="this.dataVal.authInfo">{{ this.dataVal.authInfo.name }}</a-descriptions-item>
            <a-descriptions-item label="身份证号码" v-if="this.dataVal.authInfo">{{ this.dataVal.authInfo.certificateNumber }}</a-descriptions-item>
            <a-descriptions-item label="联系地址" v-if="this.dataVal.authInfo">{{ this.dataVal.authInfo.address || this.dataVal.authInfo.companyAddress }}</a-descriptions-item>
            <a-descriptions-item label="性别" v-if="this.dataVal.authType==1">
              {{ this.dataVal.authInfo.gender==1?'男':'女' }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="line"></div>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="发票号码"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入发票号码"
              v-decorator="['invoiceNumber',{rules: [{required: true, message: '请输入发票号码！'}]}]" />
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
              v-decorator="['remark',{initialValue:''}]" />
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleSubmit">
        认证成功
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import { getBase, doAuth } from '@/api/huiyuan'
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
      nationList: [],
      xueLi: [],
      xueWei: [],
      carbookType: [],
      vipType2: [],
      form: this.$form.createForm(this),
      title: '会员认证',
      dataVal: ''
    }
  },
  created () {
    getBase({}).then(res => {
      this.nationList = res.result.nation
      this.xueLi = res.result.educationRecord
      this.xueWei = res.result.academicDegree
      this.carbookType = res.result.quasiVehicleType
      this.vipType2 = res.result.memberUserClass
    })
  },
  methods: {
    update (val) {
      this.visible = true
      this.title = '会员认证'
      console.log(val)
      this.dataVal = val
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
            doAuth({
              authInfo: this.dataVal.authInfo,
              authType: this.dataVal.authType,
              id: this.dataVal.id,
              vipType: this.dataVal.vipType,
              remark: values.remark,
              invoiceNumber: values.invoiceNumber
            }).then(res => {
              if (res.code === '200') {
                this.visible = false
                this.confirmLoading = false
                this.$message.success('认证成功')
                this.form.resetFields()
                this.$emit('ok', values)
              } else {
                this.confirmLoading = false
                this.$message.error('认证失败！' + res.message)
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
    margin-bottom: 15px;
  }
</style>
