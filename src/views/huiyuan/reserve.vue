<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="20" :sm="24">
            <a-input-search placeholder="搜索编号、姓名、手机号码" style="margin-left: 16px; width: 272px;" @search="onSearch"/>
            <a-select
              placeholder="阅读状态"
              @change="readStatesChange"
              style="margin-left: 16px; width: 272px;"
            >
              <a-select-option :value="2">
                全部
              </a-select-option>
              <a-select-option :value="1">
                已读
              </a-select-option>
              <a-select-option :value="0">
                未读
              </a-select-option>
            </a-select>
          </a-col>
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
          <a v-if="record.status==0" @click="stop(record)">已读</a>
          <a-divider v-if="!record.reply" type="vertical" />
          <a v-if="!record.reply" @click="replay(record)">回复</a>
          <!-- <a-divider v-if="record.status==0" type="vertical"/> -->
          <a v-else @click="deleteR(record)">删除</a>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
    <create-form2 ref="createModal2" @ok="handleOk" />
  </a-card>
</template>

<script>
// import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import CreateForm from './modules/CreateForm'
import CreateForm2 from './modules/CreateFormReplay'
import { replyList, replyDelete, read } from '@/api/reserve'

const statusMap = {
  0: {
    status: 'default',
    text: '未读'
  },
  1: {
    status: 'processing',
    text: '已读'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    CreateForm2
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
          title: '预约编号',
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
          title: '预约内容',
          dataIndex: 'content'
        },
        {
          title: '阅读状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '提交日期',
          dataIndex: 'createTime',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
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
          queryKey: this.queryParam,
          status: this.readStatus
        }).then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      readStatus: 2
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
    replay (record) {
      this.$refs.createModal2.update(record)
    },
    readStatesChange (val) {
      this.readStatus = val
      this.$refs.table.refresh(true)
    },
    onSearch (val) {
      console.log(val)
      this.queryParam = val
      this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      console.log(record)
      this.$refs.modal.edit(record)
    },
    stop (record) {
      this.$confirm({
        title: '已读反馈',
        content: '确定已读该会反馈吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            read({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('已读反馈成功！')
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
