<template>
  <a-modal
    :title="title"
    :width="1000"
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
            label="企业工商登记名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入企业工商登记名称"
              :disabled="disable"
              v-decorator="['companyName', {rules: [{required: true, message: '请输入企业工商登记名称！'}]}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="统一社会信用代码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入统一社会信用代码"
              :disabled="disable"
              v-decorator="['companyCreditCode', {rules: [
                {required: true, message: '请输入统一社会信用代码！'}
              ]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="单位地址"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入单位地址"
              :disabled="disable"
              :rows="3"
              v-decorator="['companyAddress', {rules: [{required: true, message: '请输入单位地址！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="法定代表人"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入法定代表人"
              :disabled="disable"
              v-decorator="['companyLegalPerson', {rules: [{required: true, message: '请输入法定代表人！'}]}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="联系电话"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入法人联系电话"
              :disabled="disable"
              v-decorator="['companyLegalPersonPhone', {rules: [{required: true, message: '请输入法人联系电话！'},
                                                                {validator:phoneCheck}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="法定代表人身份证号码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入法人身份证号码"
              :disabled="disable"
              v-decorator="['companyLegalPersonCertificateNumber', {rules: [
                {required: true, message: '请输入法人身份证号码！'},
                {validator:IDCardCheck}
              ]}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="职务"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入职务"
              :disabled="disable"
              v-decorator="['companyduty', {rules: [{required: true, message: '请输入职务！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="经办人"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入经办人"
              :disabled="disable"
              v-decorator="['companyChargelPerson', {rules: [{required: true, message: '请输入经办人！'}]}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="联系电话"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入经办人联系电话"
              :disabled="disable"
              v-decorator="['companyChargelPersonPhone', {rules: [{required: true, message: '请输入经办人联系电话！'},
                                                                  {validator:phoneCheck}]}]" />
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
              :disabled="disable"
              v-decorator="['address', {rules: [{required: true, message: '请输入联系地址！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="经营/业务范围"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入经营/业务范围"
              :disabled="disable"
              v-decorator="['businessScope',{initialValue:''}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="注册资金"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入注册资金"
              :disabled="disable"
              v-decorator="['registeredCapital',{initialValue:''}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="单位性质"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入单位性质"
              :disabled="disable"
              v-decorator="['companyProperty',{initialValue:''}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="注册类型"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入注册类型"
              :disabled="disable"
              v-decorator="['registeredType',{initialValue:''}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="行业分类"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入行业分类"
              :disabled="disable"
              v-decorator="['industryClass',{initialValue:''}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="年营业额"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入年营业额"
              :disabled="disable"
              v-decorator="['annualSale',{initialValue:''}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="职工总数"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入职工总数"
              :disabled="disable"
              v-decorator="['totalStaff',{initialValue:''}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="邮箱"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入邮箱"
              :disabled="disable"
              :rows="3"
              v-decorator="['email',{initialValue:''}]" />
          </a-form-item></a-col>
        </a-row>
        <div class="line"></div>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="发票号码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入发票号码"
              :disabled="disable"
              v-decorator="['invoiceNumber',{rules: [{required: true, message: '请输入发票号码！'}]}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="会员分类"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          > <a-select
            :disabled="disable"
            v-decorator="[
              'vipType',{rules: [{required: true, message: '请选择会员分类！'}]}]"
            placeholder="请选择会员类型"
          >
            <a-select-option v-for="(item, index) of vipType2" :key="index" :value="item.value">
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
              :disabled="disable"
              :rows="3"
              v-decorator="['remark',{initialValue:''}]" />
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template slot="footer" >
      <a-button key="back" v-if="!disable" @click="handleCancel">取消</a-button>
      <a-button key="submit" v-if="!disable" type="primary" :loading="confirmLoading" @click="handleSubmit">
        确定
      </a-button>
      <div v-if="disable"></div>
    </template>
  </a-modal>
</template>

<script>
import { getBase, addHuiyuan, updateHuiyuan } from '@/api/huiyuan'
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
      title: '新增会员',
      tId: '',
      cId: '',
      disable: false
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
    IDCardCheck (rule, value, callbackFn) {
      if (value && !this.checkIDCard(value)) {
        callbackFn('请输入正确的身份证号码！')
        } else {
          callbackFn()
      }
    },
    checkIDCard (idcode) {
      // 加权因子
      var weightFactor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // 校验码
      var checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

      var code = idcode + ''
      var last = idcode[17]// 最后一位

      var seventeen = code.substring(0, 17)

      // ISO 7064:1983.MOD 11-2
      // 判断最后一位校验码是否正确
      var arr = seventeen.split('')
      var len = arr.length
      var num = 0
      for (var i = 0; i < len; i++) {
          num = num + arr[i] * weightFactor[i]
      }

      // 获取余数
      var resisue = num % 11
      var lastNo = checkCode[resisue]
      var idcardPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/

      // 判断格式是否正确
      var format = idcardPatter.test(idcode)

      // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
      return !!(last === lastNo && format)
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
      this.title = '新增会员'
    },
    showDetail (val) {
      this.visible = true
      this.title = '查看会员'
      this.disable = true
      setTimeout(() => {
        this.form.setFieldsValue({
          companyName: val.authInfo.companyName,
          companyCreditCode: val.authInfo.companyCreditCode,
          companyAddress: val.authInfo.companyAddress,
          companyLegalPerson: val.authInfo.companyLegalPerson,
          companyLegalPersonPhone: val.authInfo.companyLegalPersonPhone,
          companyChargelPerson: val.authInfo.companyChargelPerson,
          companyChargelPersonPhone: val.authInfo.companyChargelPersonPhone,
          companyLegalPersonCertificateNumber: val.authInfo.companyLegalPersonCertificateNumber,
          companyduty: val.authInfo.companyduty,
          businessScope: val.authInfo.businessScope,
          registeredCapital: val.authInfo.registeredCapital,
          registeredType: val.authInfo.registeredType,
          companyProperty: val.authInfo.companyProperty,
          industryClass: val.authInfo.industryClass,
          annualSale: val.authInfo.annualSale,
          totalStaff: val.authInfo.totalStaff,
          address: val.authInfo.address,
          email: val.authInfo.email,
          companyGradle: val.authInfo.companyGradle,
          invoiceNumber: val.invoiceNumber,
          remark: val.remark
        })
      }, 100)
    },
    update (val) {
      this.visible = true
      this.title = '编辑会员'
      this.tId = val.id
      this.cId = val.companyId
      setTimeout(() => {
        this.form.setFieldsValue({
          companyName: val.authInfo.companyName,
          companyCreditCode: val.authInfo.companyCreditCode,
          companyAddress: val.authInfo.companyAddress,
          companyLegalPerson: val.authInfo.companyLegalPerson,
          companyLegalPersonPhone: val.authInfo.companyLegalPersonPhone,
          companyChargelPerson: val.authInfo.companyChargelPerson,
          companyChargelPersonPhone: val.authInfo.companyChargelPersonPhone,
          companyLegalPersonCertificateNumber: val.authInfo.companyLegalPersonCertificateNumber,
          companyduty: val.authInfo.companyduty,
          businessScope: val.authInfo.businessScope,
          registeredCapital: val.authInfo.registeredCapital,
          address: val.authInfo.address,
          registeredType: val.authInfo.registeredType,
          companyProperty: val.authInfo.companyProperty,
          industryClass: val.authInfo.industryClass,
          annualSale: val.authInfo.annualSale,
          totalStaff: val.authInfo.totalStaff,
          email: val.authInfo.email,
          companyGradle: val.authInfo.companyGradle,
          invoiceNumber: val.invoiceNumber,
          remark: val.remark
        })
      }, 100)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          if (this.title === '新增会员') {
            const invoiceNumber = values.invoiceNumber
            delete values.invoiceNumber
            const vipType2 = values.vipType
            delete values.vipType
            addHuiyuan({
              authInfo: values,
              invoiceNumber: invoiceNumber,
              remark: values.remark,
              type: 2,
              vipType: vipType2
            }).then(res => {
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
            const invoiceNumber = values.invoiceNumber
            delete values.invoiceNumber
            const vipType2 = values.vipType
            delete values.vipType
            updateHuiyuan({
              authInfo: values,
              invoiceNumber: invoiceNumber,
              type: 2,
              id: this.tId,
              remark: values.remark,
              vipType: vipType2,
              companyId: this.cId
            }).then(res => {
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
      this.disable = false
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
