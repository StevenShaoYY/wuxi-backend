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
          <a-col :span="12"><a-form-item
            label="姓名"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入姓名"
              v-decorator="['name', {rules: [{required: true, message: '请输入姓名！'}]}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="身份证号码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入身份证号码"
              v-decorator="['certificateNumber', {rules: [{required: true, message: '请输入身份证号码！'}]}]" />
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
              v-decorator="['phoneNumber', {rules: [{required: true, message: '请输入手机号码！'}]}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="联系地址"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              placeholder="请输入联系地址"
              v-decorator="['address', {rules: [{required: true, message: '请输入联系地址！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12"><a-form-item
            label="性别"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-radio-group v-decorator="['gender',{initialValue:'1'}]">
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
              placeholder="请输入籍贯"
              v-decorator="['areaName',{initialValue:''}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="政治面貌"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
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
              placeholder="请输入毕业学校"
              v-decorator="['school',{initialValue:''}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="学历"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-select
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
              placeholder="请输入职务"
              v-decorator="['companyDuty',{initialValue:''}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="职称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
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
              placeholder="请输入发票号码"
              v-decorator="['invoiceNumber',{initialValue:''}]" />
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item
            label="会员分类"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          > <a-select
            v-decorator="[
              'vipType',{initialValue:1}]"
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
              :rows="3"
              v-decorator="['remark']" />
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>
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
      tId: ''
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
    add () {
      this.visible = true
      this.title = '新增会员'
    },
    update (val) {
      this.visible = true
      this.title = '编辑会员'
      console.log(val)
      this.tId = val.id
      setTimeout(() => {
        this.form.setFieldsValue({
          name: val.authInfo.name,
          certificateNumber: val.authInfo.certificateNumber,
          phoneNumber: val.authInfo.phoneNumber,
          address: val.authInfo.address,
          gender: val.authInfo.gender,
          nation: parseInt(val.authInfo.nation),
          areaName: val.authInfo.areaName,
          politicalFace: val.authInfo.politicalFace,
          school: val.authInfo.school,
          educationRecord: parseInt(val.authInfo.educationRecord),
          academicDegree: parseInt(val.authInfo.academicDegree),
          companyName: val.authInfo.companyName,
          companyDuty: val.authInfo.companyDuty,
          companyGradle: val.authInfo.companyGradle
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
    }
  }
}
</script>
<style lang="less" scoped>
  .line{
    border-top: 1px solid #E8E8E8;
  }
</style>
