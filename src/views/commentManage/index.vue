<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="20" :sm="24">
            <a-input-search placeholder="搜索订单编号、名称" style="margin-left: 16px; width: 272px;" @search="onSearch"/>
            <a-range-picker style="margin-left: 16px; width: 272px;" @change="onChange" />
          </a-col>
          <a-col :md="4" :sm="24">
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      style="margin-top:20px;"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
      :pagination="paginationT"
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="paystatus" slot-scope="text">
        <a-badge :status="text | paystatusTypeFilter" :text="text | paystatusFilter" />
      </span>
      <span slot="position" slot-scope="text">
        <span>{{ text | positionFilter }}</span>
      </span>
      <span slot="img" slot-scope="text">
        <div style="width:160px;height:90px;">
          <img style="width:160px;height:90px;" :src="text" alt="">
        </div>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a v-if="!record.reply" @click="auth(record)">回复</a>
          <a-divider v-if="!record.reply" type="vertical" />
          <a @click="deleteUser(record)">删除</a>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script>
// import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import CreateForm from './modules/CreateForm'
import { getList, DeleteData } from '@/api/comment'

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
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm
  },
  data () {
    return {
      paginationT: {
        pageSizeOptions: ['10', '20']
      },
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: '',
      // 表头
      columns: [
        {
          title: '用户姓名',
          dataIndex: 'name'
        },
        {
          title: '用户手机号',
          dataIndex: 'phoneNumber'
        },
        {
          title: '商品编号',
          dataIndex: 'goodsId'
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName'
        },
        {
          title: '打分',
          dataIndex: 'star'
        },
        {
          title: '评论内容',
          dataIndex: 'content'
        },
        {
          title: '回复内容',
          dataIndex: 'reply'
        },
        {
          title: '评论时间',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '180px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter, filters) => {
        console.log('loadData.filters', filters)
        // return getSingle(Object.assign(parameter, this.queryParam))
        return getList({
          currentPage: parameter.pageNo,
          pageSize: parameter.pageSize,
          queryKey: this.queryParam,
          startTime: this.startTime,
          endTime: this.endTime
        }).then(res => {
            return res.result
        })
      },
      startTime: '',
      endTime: ''
    }
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
  created () {
  },
  methods: {
    add () {
      this.$refs.createModal.add()
    },
    auth (record) {
      this.$refs.createModal.update(record)
    },
    deleteUser (record) {
       this.$confirm({
        title: '删除评论',
        content: `评论商品名称：${record.goodsName}，确认删除吗？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
            DeleteData({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('删除评论成功！')
                  this.$refs.table.refresh()
                  resolve()
                }
              }
            )
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },
    onSearch (val) {
      this.queryParam = val
      this.$refs.table.refresh(true)
    },
    onChange (date, dateString) {
      this.startTime = dateString[0]
      this.endTime = dateString[1]
      this.$refs.table.refresh(true)
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
