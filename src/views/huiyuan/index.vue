<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="21" :sm="24">
            <a-input-search placeholder="搜索编号、姓名、手机号码" style="width:250px;float:left;margin-left: 16px;" @search="onSearch"/>
            <span style="float:left;margin-top:5px;margin-left: 16px;">开通日期：</span>
            <a-range-picker
              style="float:left;width:200px;margin-left:15px;"
              format="YYYY-MM-DD"
              @change="onChangeStart"
            />
            <span style="float:left;margin-top:5px;margin-left: 16px;">到期日期:</span>
            <a-range-picker
              style="float:left;width:200px;margin-left:15px;"
              format="YYYY-MM-DD"
              @change="onChangeEnd"
            />
          </a-col>
          <a-col :md="3" :sm="24">
            <a-button style="float:right" type="primary" icon="plus" @click="$refs.createModal.add()">添加会员</a-button>
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
    >
      <span slot="id" slot-scope="text, record">
        <span style="cursor: pointer;color:blue" @click="showDetail(record)">{{ text }}</span>
      </span>
      <span slot="level" slot-scope="text">
        <span>{{ text | levelFilter }}</span>
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a v-if="record.status==1" @click="stop(record)">禁用</a>
          <a v-else @click="start(record)">启用</a>
          <a-divider type="vertical" v-action:DELETE />
          <a @click="deleteUser(record)" v-action:DELETE>删除</a>
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
import { getSingle, disableSingle, enableSingle, deleteSingle } from '@/api/huiyuan'

const statusMap = {
  0: {
    status: 'default',
    text: '禁用中'
  },
  1: {
    status: 'processing',
    text: '启用中'
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
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        type: 1
      },
      // 表头
      columns: [
        {
          title: '会员编号',
          dataIndex: 'serialNumber',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '姓名',
          dataIndex: 'authInfo.name'
        },
        {
          title: '手机号码',
          dataIndex: 'authInfo.phoneNumber'
        },
        {
          title: '身份证号码',
          dataIndex: 'authInfo.certificateNumber'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '积分',
          dataIndex: 'integral'
        },
        {
          title: '星级',
          dataIndex: 'level',
          scopedSlots: { customRender: 'level' }
        },
        {
          title: '开通日期',
          dataIndex: 'authTime',
          sorter: true
        },
        {
          title: '到期日期',
          dataIndex: 'expiredTime',
          sorter: true
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
        const page = {
          currentPage: parameter.pageNo,
          pageSize: parameter.pageSize,
          sortField: parameter.sortField,
          sortOrder: parameter.sortOrder
        }
        return getSingle(Object.assign(page, this.queryParam)).then(res => {
            return res.result
          })
      },
      dateFormat: 'YYYY-MM-DD',
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    levelFilter (type) {
      let star = ''
      for (let i = 0; i <= type; i++) {
        star = star + '★'
      }
      return star
    }
  },
  created () {
  },
  methods: {
    showDetail (val) {
      this.$refs.createModal.showDetail(val)
    },
    onChangeStart (val, dateString) {
      this.queryParam.authTimeStart = dateString[0]
      this.queryParam.authTimeEnd = dateString[1]
      this.$refs.table.refresh(true)
    },
    onChangeEnd (val, dateString) {
      this.queryParam.expiredTimeStart = dateString[0]
      this.queryParam.expiredTimeEnd = dateString[1]
      this.$refs.table.refresh(true)
    },
    onSearch (val) {
      this.queryParam.queryKey = val
      this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      this.$refs.createModal.update(record)
    },
    stop (record) {
      this.$confirm({
        title: '确定禁用该会员吗?',
        content: '禁用该会员后，会员将无法使用会员服务，确认禁用吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            disableSingle({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('禁用会员成功！')
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
    start (record) {
       this.$confirm({
        title: '确定启用该会员吗?',
        content: '启用该会员后，会员将可使用会员服务，确认启用吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
             enableSingle({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('启用会员成功！')
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
    deleteUser (record) {
       this.$confirm({
        title: '确定删除该会员吗?',
        content: '删除该会员后，会员将无法使用会员服务，确认删除吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            deleteSingle({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('删除会员成功！')
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
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
