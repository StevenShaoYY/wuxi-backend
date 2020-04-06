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
            label="姓名"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入姓名"
              :disabled="disable"
              v-decorator="['name', {rules: [{required: true, message: '请输入姓名！'}]}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="身份证号码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入身份证号码"
              :disabled="disable"
              v-decorator="['certificateNumber', {rules: [
                {required: true, message: '请输入身份证号码！'},
                {validator:IDCardCheck}
              ]}]" />
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
              :disabled="disable"
              v-decorator="['phoneNumber', {rules: [{required: true, message: '请输入手机号码！'},
                                                    {validator:phoneCheck}]}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="联系地址"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入联系地址"
              :disabled="disable"
              v-decorator="['address', {rules: [{required: true, message: '请输入联系地址！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="性别"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-radio-group
              :disabled="disable"
              v-decorator="['gender',{initialValue:'1'}]">
              <a-radio value="1">男</a-radio>
              <a-radio value="2">女</a-radio>
            </a-radio-group>
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="民族"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-select
              :disabled="disable"
              v-decorator="[
                'nation',{initialValue:1}]"
              placeholder="请选择民族"
            >
              <a-select-option v-for="(item, index) of nationList" :key="index" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="籍贯"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              :disabled="disable"
              placeholder="请输入籍贯"
              v-decorator="['areaName',{initialValue:''}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="政治面貌"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              :disabled="disable"
              placeholder="请输入政治面貌"
              v-decorator="['politicalFace',{initialValue:''}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="毕业学校"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              :disabled="disable"
              placeholder="请输入毕业学校"
              v-decorator="['school',{initialValue:''}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="学历"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-select
              :disabled="disable"
              v-decorator="[
                'educationRecord',{initialValue:1}]"
              placeholder="请选择学历"
            >
              <a-select-option v-for="(item, index) of xueLi" :key="index" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="学位"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-select
              :disabled="disable"
              v-decorator="[
                'academicDegree',{initialValue:1}]"
              placeholder="请选择学位"
            >
              <a-select-option v-for="(item, index) of xueWei" :key="index" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="单位名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              :disabled="disable"
              placeholder="请输入单位名称"
              v-decorator="['companyName',{initialValue:''}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="职务"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              :disabled="disable"
              placeholder="请输入职务"
              v-decorator="['companyDuty',{initialValue:''}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="职称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              :disabled="disable"
              placeholder="请输入职称"
              v-decorator="['companyGradle',{initialValue:''}]" />
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
              :disabled="disable"
              placeholder="请输入发票号码"
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
              :disabled="disable"
              placeholder="请输入备注"
              :rows="3"
              v-decorator="['remark']" />
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
    showDetail (val) {
      this.visible = true
      this.title = '查看会员'
      this.disable = true
      setTimeout(() => {
        this.form.setFieldsValue({
          name: val.authInfo.name,
          certificateNumber: val.authInfo.certificateNumber,
          phoneNumber: val.authInfo.phoneNumber,
          address: val.authInfo.address,
          gender: val.authInfo.gender,
          nation: parseInt(val.authInfo.nation) || '',
          areaName: val.authInfo.areaName,
          politicalFace: val.authInfo.politicalFace,
          school: val.authInfo.school,
          educationRecord: parseInt(val.authInfo.educationRecord) || '',
          academicDegree: parseInt(val.authInfo.academicDegree) || '',
          companyName: val.authInfo.companyName,
          companyDuty: val.authInfo.companyDuty,
          companyGradle: val.authInfo.companyGradle,
          invoiceNumber: val.invoiceNumber,
          remark: val.remark
        })
      }, 100)
    },
    add () {
      this.visible = true
      this.title = '新增会员'
    },
    update (val) {
      this.visible = true
      this.title = '编辑会员'
      this.tId = val.id
      setTimeout(() => {
        this.form.setFieldsValue({
          name: val.authInfo.name,
          certificateNumber: val.authInfo.certificateNumber,
          phoneNumber: val.authInfo.phoneNumber,
          address: val.authInfo.address,
          gender: val.authInfo.gender,
          nation: parseInt(val.authInfo.nation) || '',
          areaName: val.authInfo.areaName,
          politicalFace: val.authInfo.politicalFace,
          school: val.authInfo.school,
          educationRecord: parseInt(val.authInfo.educationRecord) || '',
          academicDegree: parseInt(val.authInfo.academicDegree) || '',
          companyName: val.authInfo.companyName,
          companyDuty: val.authInfo.companyDuty,
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
            addHuiyuan({
              authInfo: values,
              invoiceNumber: values.invoiceNumber,
              remark: values.remark,
              type: 1,
              vipType: values.vipType
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
            updateHuiyuan({
              authInfo: values,
              invoiceNumber: values.invoiceNumber,
              type: 1,
              id: this.tId,
              remark: values.remark,
              vipType: values.vipType
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
