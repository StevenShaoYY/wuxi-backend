<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="20" :sm="24">
            <a-input-search placeholder="搜索类目名称" style="margin-left: 16px; width: 272px;" @search="onSearch"/>
            <a-range-picker style="margin-left: 16px; width: 272px;" @change="onChange" />
          </a-col>
          <a-col :md="4" :sm="24">
            <a-button style="float:right" type="primary" icon="plus" @click="add()">添加类目</a-button>
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
        <img style="width:160px;height:90px;" :src="text" alt="">
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="update(record)">编辑</a>
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
import { getList, DeleteData } from '@/api/category'

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
          title: '类目名称',
          dataIndex: 'name'
        },
        {
          title: '父类目名称',
          dataIndex: 'PName'
        },
        {
          title: '类目图标',
          dataIndex: 'iconUrl',
          scopedSlots: { customRender: 'img' }
        },
        {
          title: '类目图片',
          dataIndex: 'picUrl',
          scopedSlots: { customRender: 'img' }
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
    deleteUser (record) {
       this.$confirm({
        title: '删除类目',
        content: `类目名称:${record.name}，确认删除吗？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
            DeleteData({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('删除类目成功！')
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
