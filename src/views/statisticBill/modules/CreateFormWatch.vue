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
      <a-descriptions bordered>
        <a-descriptions-item label="账单编号" :span="3">
          {{ data.serialNumber }}
        </a-descriptions-item>
        <a-descriptions-item label="账单名称" :span="3">
          {{ data.name }}
        </a-descriptions-item>
        <a-descriptions-item label="账单金额" :span="3">
          {{ data.amount }}
        </a-descriptions-item>
        <a-descriptions-item label="账单日期" :span="3" >
          {{ data.createTime }}
        </a-descriptions-item>
      </a-descriptions>

    </div>
    <template slot="footer" >
      <div class="no-print">
        <!-- <a-button key="back1" type="primary" @click="handlePrint">打印</a-button> -->
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
      this.title = '账单信息'
      this.disable = true
      this.data = JSON.parse(JSON.stringify(val))
      console.log(9999, this.data)

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
