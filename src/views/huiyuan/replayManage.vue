<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="20" :sm="24">
            <a-input-search placeholder="搜索编号、姓名、手机号码" style="margin-left: 16px; width: 272px;" @search="onSearch"/>
          </a-col>
          <!-- <a-col :md="4" :sm="24">
            <a-button type="primary" icon="plus" @click="$refs.createModal.add()">添加会员</a-button>
          </a-col> -->
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      style="margin-top:20px;"
      size="default"
      rowKey="serialNumber"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="deleteR(record)">删除</a>
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
import { replyList, replyDelete } from '@/api/huiyuan'

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
      queryParam: '',
      // 表头
      columns: [
        {
          title: '反馈编号',
          dataIndex: 'serialNumber'
        },
        {
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '手机号码',
          dataIndex: 'phoneNumber'
        },
        {
          title: '身份证号码',
          dataIndex: 'certificateNumber'
        },
        {
          title: '反馈意见',
          dataIndex: 'content'
        },
        {
          title: '提交日期',
          dataIndex: 'createTime',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '100px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter, filters) => {
        console.log('loadData.filters', filters)
        // return replyList(Object.assign(parameter, this.queryParam))
        return replyList({
          currentPage: parameter.pageNo,
          pageSize: parameter.pageSize,
          sortField: parameter.sortField,
          sortOrder: parameter.sortOrder,
          queryKey: this.queryParam
        }).then(res => {
            return res.result
          })
      },
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
    }
  },
  created () {
  },
  methods: {
    onSearch (val) {
      console.log(val)
      this.queryParam = val
      this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      console.log(record)
      this.$refs.modal.edit(record)
    },
    deleteR (record) {
       this.$confirm({
        title: '确定删除该反馈意见吗?',
        content: '删除后将不保存该反馈意见，确认删除吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            replyDelete({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('删除反馈意见成功！')
                  this.$refs.table.refresh(true)
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
