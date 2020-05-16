<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="20" :sm="24">
            <a-input-search placeholder="搜索广告标题" style="margin-left: 16px; width: 272px;" @search="onSearch"/>
            <a-range-picker style="margin-left: 16px; width: 272px;" @change="onChange" />
          </a-col>
          <a-col :md="4" :sm="24">
            <a-button style="float:right" type="primary" icon="plus" @click="add()">添加广告</a-button>
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
          <a @click="update(record)">编辑</a>
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
import { getList, DeleteData, startUse, stopUse } from '@/api/ad'

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
const positionMap = {
  1: {
    text: '首页'
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
          title: '广告标题',
          dataIndex: 'name'
        },
        {
          title: '广告内容',
          dataIndex: 'content'
        },
        {
          title: '广告图片',
          dataIndex: 'picUrl',
          scopedSlots: { customRender: 'img' }
        },
        {
          title: '广告位置',
          dataIndex: 'position',
          scopedSlots: { customRender: 'position' }
        },
        {
          title: '广告连接',
          dataIndex: 'link'
        },
        {
          title: '是否启用',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
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
    positionFilter (type) {
      return positionMap[type].text
    }
  },
  created () {
  },
  methods: {
    add () {
      this.$refs.createModal.add()
    },
    update (record) {
      this.$refs.createModal.update(record)
    },
    stop (record) {
      this.$confirm({
        title: '确定禁用该广告吗?',
        content: `广告标题：${record.name},广告内容:${record.content}，确认禁用吗？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
            stopUse({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('禁用广告成功！')
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
        title: '确定启用该广告吗?',
        content: `广告标题：${record.name},广告内容:${record.content}，确认启用吗？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
             startUse({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('启用广告成功！')
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
        title: '删除广告',
        content: `广告标题：${record.name},广告内容:${record.content}，确认删除吗？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
            DeleteData({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('删除广告成功！')
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
