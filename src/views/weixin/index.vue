<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="20" :sm="24">
            <!-- <a-input-search placeholder="搜索编号、姓名、手机号码" style="margin-left: 16px; width: 272px;" @search="onSearch"/> -->
          </a-col>
          <a-col :md="4" :sm="24">
            <a-button style="float:right" type="primary" icon="plus" @click="add()">添加图文</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      style="margin-top:20px;"
      size="default"
      rowKey="mediaId"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
      :pagination="paginationT"
    >
      <span slot="title" slot-scope="text">

        <a target="_blank" :href="text.url">{{ text.title }}</a>
      </span>
      <span slot="status" slot-scope="text">
        <img style="width:160px;height:90px;" :src="'http://101.132.194.14/traffic/ops/weixin/getImage?imageUrl='+text" alt="">
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="add()">编辑</a>
          <a-divider type="vertical" />
          <a @click="deleteUser(record)">删除</a>
          <a-divider type="vertical" />
          <a @click="send(record)">发送</a>
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
import { getwxList, deleteWx } from '@/api/wx'

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
          title: '封面',
          dataIndex: 'articles[0].thumbUrl',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '标题',
          dataIndex: 'articles[0]',
          scopedSlots: { customRender: 'title' }

        },
        {
          title: '作者',
          dataIndex: 'articles[0].author'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime'
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
        return getwxList({
          currentPage: parameter.pageNo,
          pageSize: parameter.pageSize,
          queryKey: this.queryParam,
          type: 1
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
    add () {
      // window.location.href = 'https://mp.weixin.qq.com/'
      window.open('https://mp.weixin.qq.com/')
    },
    onSearch (val) {
      console.log(val)
      this.queryParam = val
      this.$refs.table.refresh(true)
    },
    send (record) {
      this.$refs.createModal.update(record)
    },
    deleteUser (record) {
       this.$confirm({
        title: '删除图文',
        content: '确认删除吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            deleteWx({
              id: record.mediaId
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('删除图文成功！')
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
