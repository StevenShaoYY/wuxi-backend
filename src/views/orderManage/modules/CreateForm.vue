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
      <a-descriptions title="订单信息">
        <a-descriptions-item label="订单编号">
          {{ dataList.serialNumber }}
        </a-descriptions-item>
        <a-descriptions-item label="订单状态">
          {{ dataList.orderStatus | statusFilter }}
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">
          {{ dataList.createTime }}
        </a-descriptions-item>
        <a-descriptions-item label="更新时间">
          {{ dataList.updateTime }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="用户信息">
        <a-descriptions-item label="用户姓名">
          {{ dataList.userName }}
        </a-descriptions-item>
        <a-descriptions-item label="手机号码">
          {{ dataList.consigneePhoneNumber }}
        </a-descriptions-item>
        <a-descriptions-item label="备注">
          {{ dataList.remark }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="商品信息">
        <a-descriptions-item label="商品编号">
          {{ dataList.orderGoods[0].goodsSerialNumber }}
        </a-descriptions-item>
        <a-descriptions-item label="商品名称">
          {{ dataList.orderGoods[0].goodsName }}
        </a-descriptions-item>
        <a-descriptions-item label="商品价格">
          {{ dataList.goodsPrice }}
        </a-descriptions-item>
        <a-descriptions-item label="积分价格">
          {{ dataList.integralPrice }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="支付信息">
        <a-descriptions-item label="总计价格">
          {{ dataList.actualPrice }}
        </a-descriptions-item>
        <a-descriptions-item label="支付状态">
          {{ dataList.payStatus | paystatusFilter }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="支付信息">
        <a-descriptions-item label="姓名">
          {{ dataList.consigneeName }}
        </a-descriptions-item>
        <a-descriptions-item label="手机号码">
          {{ dataList.consigneePhoneNumber }}
        </a-descriptions-item>
        <a-descriptions-item label="地址">
          {{ dataList.consigneeAddress }}
        </a-descriptions-item>
      </a-descriptions>
    </a-spin>
  </a-modal>
</template>

<script>
import { auth } from '@/api/order'
import moment from 'moment'

const statusMap = {
  1: {
    status: 'default',
    text: '订单进行中'
  },
  2: {
    status: 'processing',
    text: '订单取消'
  },
  3: {
    status: 'processing',
    text: '订单关闭'
  },
  4: {
    status: 'processing',
    text: '订单完成'
  }
}
const paystatusMap = {
  1: {
    status: 'default',
    text: '未支付'
  },
  2: {
    status: 'processing',
    text: '支付成功'
  },
  3: {
    status: 'processing',
    text: '支付失败'
  },
  4: {
    status: 'processing',
    text: '待退款'
  },
  5: {
    status: 'processing',
    text: '已退款'
  }
}

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
      fileListLength: 0,
      dataList: []
    }
  },
  created () {
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    paystatusFilter (type) {
      return paystatusMap[type].text
    },
    paystatusTypeFilter (type) {
      return paystatusMap[type].status
    }
  },
  methods: {
    moment,
    showDetail (val) {
      this.dataList = val
      this.visible = true
    },
    update (val) {
      this.visible = true
      this.title = '订单审核'
      this.rid = val.id
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log(values)
        if (!errors) {
            auth(Object.assign(values, {
              id: this.rid
            })).then(res => {
              if (res.code === '200') {
                this.visible = false
                this.confirmLoading = false
                this.$message.success('审核成功')
                this.form.resetFields()
                this.$emit('ok', values)
              } else {
                this.confirmLoading = false
                this.$message.error('审核失败！' + res.message)
              }
            })
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
