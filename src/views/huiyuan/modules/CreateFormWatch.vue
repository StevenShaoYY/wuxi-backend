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
      <a-descriptions bordered >
        <a-descriptions-item label="姓名" v-if="data.authInfo">
          {{ data.authInfo.name }}
        </a-descriptions-item>
        <a-descriptions-item label="身份证号码" :span="2" v-if="data.authInfo">
          {{ data.authInfo.certificateNumber }}
        </a-descriptions-item>
        <a-descriptions-item label="手机号码" v-if="data.authInfo">
          {{ data.authInfo.phoneNumber }}
        </a-descriptions-item>
        <a-descriptions-item label="联系地址" :span="2" v-if="data.authInfo">
          {{ data.authInfo.address }}
        </a-descriptions-item>
        <a-descriptions-item label="性别" v-if="data.authInfo">
          {{ data.authInfo.gender==1?'男':'女' }}
        </a-descriptions-item>
        <a-descriptions-item label="民族" :span="2" v-if="data.authInfo">
          {{ data.authInfo.nation }}
        </a-descriptions-item>
        <a-descriptions-item label="籍贯" v-if="data.authInfo">
          {{ data.authInfo.areaName }}
        </a-descriptions-item>
        <a-descriptions-item label="政治面貌" :span="2" v-if="data.authInfo">
          {{ data.authInfo.politicalFace }}
        </a-descriptions-item>
        <a-descriptions-item label="学历" v-if="data.authInfo" >
          {{ data.authInfo.educationRecord }}
        </a-descriptions-item>
        <a-descriptions-item label="毕业学校" :span="2" v-if="data.authInfo">
          {{ data.authInfo.school }}
        </a-descriptions-item>
        <a-descriptions-item label="学位" v-if="data.authInfo">
          {{ data.authInfo.academicDegree }}
        </a-descriptions-item>
        <a-descriptions-item label="单位名称" :span="2" v-if="data.authInfo">
          {{ data.authInfo.companyName }}
        </a-descriptions-item>
        <a-descriptions-item label="职务" v-if="data.authInfo">
          {{ data.authInfo.companyDuty }}
        </a-descriptions-item>
        <a-descriptions-item label="职称" :span="2" v-if="data.authInfo">
          {{ data.authInfo.companyGradle }}
        </a-descriptions-item>
        <a-descriptions-item label="会员分类" >
          {{ data.vipType }}
        </a-descriptions-item>
        <a-descriptions-item label="发票号码" :span="2">
          {{ data.invoiceNumber }}
        </a-descriptions-item>
        <a-descriptions-item label="备注" :span="3">
          {{ data.remark }}
        </a-descriptions-item>
      </a-descriptions>

    </div>
    <template slot="footer" >
      <div v-if="disable" class="no-print">
        <a-button key="back2" type="primary" @click="handlePrint">打印</a-button>
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
      this.data = val
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
      for (const item of this.vipType2) {
        if (item.value.toString() === val.authInfo.vipType) {
          this.data.authInfo.vipType = item.name
        }
      }

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
