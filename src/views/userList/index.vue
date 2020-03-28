<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="20" :sm="24">
            <a-input-search placeholder="搜索用户名、姓名、备注" style="margin-left: 16px; width: 272px;" @search="onSearch"/>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-button type="primary" icon="plus" @click="$refs.createModal.add()">添加管理员</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      style="margin-top:10px;"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="type" slot-scope="text">
        {{ text | typeFilter }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="resetPassword(record)">重置密码</a>
          <a-divider type="vertical" />
          <a v-if="record.status==1" @click="stop(record)">禁用</a>
          <a v-else @click="start(record)">启用</a>
          <a-divider type="vertical" />
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
import { getAdmin, deleteAdmin, resetPassAdmin, disableAdmin, enableAdmin } from '@/api/role'

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

const typeMap = {
  1: {
    status: 'default',
    text: '管理员'
  },
  2: {
    status: 'processing',
    text: '前台'
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
          title: '用户名',
          dataIndex: 'username'
        },
        {
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '用户角色',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '用户状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '备注',
          dataIndex: 'remark'
        },
        {
          title: '修改日期',
          dataIndex: 'updateTime'
        },
        {
          title: '修改人',
          dataIndex: 'updatePerson'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '250px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter, filters) => {
        console.log('loadData.filters', filters)
        // return getSingle(Object.assign(parameter, this.queryParam))
        return getAdmin({
          currentPage: parameter.pageNo,
          pageSize: parameter.pageSize,
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
    },
    typeFilter (type) {
      return typeMap[type].text
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
      this.$refs.createModal.update(record)
    },
    resetPassword (record) {
       this.$confirm({
        title: '确定重置密码吗?',
        content: '点击确认后，管理员密码将被重置，确认重置密码吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
             resetPassAdmin({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('重置密码成功！')
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
    stop (record) {
      this.$confirm({
        title: '确定禁用该管理员吗?',
        content: '禁用该管理员账号后，管理员将无法登录使用该平台功能，确认禁用吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            disableAdmin({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('禁用管理员成功！')
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
    start (record) {
       this.$confirm({
        title: '确定启用该管理员吗?',
        content: '启用该管理员账号后，管理员将可以登录使用该平台功能，确认启用吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
             enableAdmin({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('启用管理员成功！')
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
    deleteUser (record) {
       this.$confirm({
        title: '确定删除该管理员吗?',
        content: '删除该管理员后，管理员将无法登录使用该平台功能，确认删除吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            deleteAdmin({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('删除管理员成功！')
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
