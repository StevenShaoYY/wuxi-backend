<template>
  <a-modal
    :title="title"
    :width="840"
    style="top: 20px;"
    :visible="visible"
    :closable="false"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <div ref="print">
      <a-descriptions bordered v-if="data.authInfo">
        <a-descriptions-item label="企业工商登记名称" >
          {{ data.authInfo.companyName }}
        </a-descriptions-item>
        <a-descriptions-item label="统一社会信用代码" :span="2">
          {{ data.authInfo.companyCreditCode }}
        </a-descriptions-item>
        <a-descriptions-item label="法定代表人" >
          {{ data.authInfo.companyLegalPerson }}
        </a-descriptions-item>
        <a-descriptions-item label="单位地址" :span="2">
          {{ data.authInfo.companyAddress }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话" >
          {{ data.authInfo.companyLegalPersonPhone }}
        </a-descriptions-item>
        <a-descriptions-item label="法定代表人身份证号码" :span="2">
          {{ data.authInfo.companyLegalPersonCertificateNumber }}
        </a-descriptions-item>
        <a-descriptions-item label="职务" >
          {{ data.authInfo.companyDuty }}
        </a-descriptions-item>
        <a-descriptions-item label="经办人" :span="2">
          {{ data.authInfo.companyChargelPerson }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话" >
          {{ data.authInfo.companyChargelPersonPhone }}
        </a-descriptions-item>
        <a-descriptions-item label="经营/业务范围" :span="2">
          {{ data.authInfo.businessScope }}
        </a-descriptions-item>
        <a-descriptions-item label="联系地址" >
          {{ data.authInfo.address }}
        </a-descriptions-item>
        <a-descriptions-item label="注册资金" :span="2">
          {{ data.authInfo.registeredCapital }}
        </a-descriptions-item>
        <a-descriptions-item label="单位性质" >
          {{ data.authInfo.companyProperty }}
        </a-descriptions-item>
        <a-descriptions-item label="注册类型" :span="2">
          {{ data.authInfo.registeredType }}
        </a-descriptions-item>
        <a-descriptions-item label="行业分类" >
          {{ data.authInfo.industryClass }}
        </a-descriptions-item>
        <a-descriptions-item label="年营业额" :span="2">
          {{ data.authInfo.annualSale }}
        </a-descriptions-item>
        <a-descriptions-item label="职工总数" >
          {{ data.authInfo.totalStaff }}
        </a-descriptions-item>
        <a-descriptions-item label="邮箱" :span="2">
          {{ data.authInfo.email }}
        </a-descriptions-item>
        <a-descriptions-item label="会员分类" >
          {{ data.type }}
        </a-descriptions-item>
        <a-descriptions-item label="发票号码" :span="2">
          {{ data.invoiceNumber }}
        </a-descriptions-item>
        <!-- <a-descriptions-item label="发票号码" :span="2">
          {{ data.invoiceNumber }}
        </a-descriptions-item> -->
        <a-descriptions-item label="会员年费" :span="3">
          {{ data.annualFee }}
        </a-descriptions-item>
        <a-descriptions-item label="备注" :span="3">
          {{ data.remark }}
        </a-descriptions-item>
      </a-descriptions>

    </div>
    <template slot="footer" >
      <div v-if="disable" class="no-print">
        <a-button key="back1" type="primary" @click="handlePrint">打印</a-button>
        <a-button key="back" @click="handleCancel">取消</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script>
import { getBase } from '@/api/huiyuan'
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
      data: {},
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
    handlePrint () {
      this.$print(this.$refs.print)
    },
    showDetail (val) {
      this.visible = true
      this.title = '会员信息'
      this.disable = true
      this.data = JSON.parse(JSON.stringify(val))
      for (const item of this.nationList) {
        if (item.value.toString() === val.authInfo.nation) {
          this.data.authInfo.nation = item.name
        }
      }
      for (const item of this.xueLi) {
        if (item.value.toString() === val.authInfo.educationRecord) {
          this.data.authInfo.educationRecord = item.name
        }
      }
      for (const item of this.xueWei) {
        if (item.value.toString() === val.authInfo.academicDegree) {
          this.data.authInfo.academicDegree = item.name
        }
      }
      this.data.type = '单位会员'

      // setTimeout(() => {
      //   this.form.setFieldsValue({
      //     name: val.authInfo.name,
      //     certificateNumber: val.authInfo.certificateNumber,
      //     phoneNumber: val.authInfo.phoneNumber,
      //     address: val.authInfo.address,
      //     gender: val.authInfo.gender,
      //     nation: parseInt(val.authInfo.nation) || '',
      //     areaName: val.authInfo.areaName,
      //     politicalFace: val.authInfo.politicalFace,
      //     school: val.authInfo.school,
      //     educationRecord: parseInt(val.authInfo.educationRecord) || '',
      //     academicDegree: parseInt(val.authInfo.academicDegree) || '',
      //     companyName: val.authInfo.companyName,
      //     companyDuty: val.authInfo.companyDuty,
      //     companyGradle: val.authInfo.companyGradle,
      //     invoiceNumber: val.invoiceNumber,
      //     remark: val.remark
      //   })
      // }, 100)
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
