<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="22" :sm="24">
            <a-input-search placeholder="搜索商品编号、名称" style="margin-left: 16px; width: 272px;" @search="onSearch"/>
            <a-input-search placeholder="商家编号搜索" style="margin-left: 16px; width: 272px;" @search="onSearchShangjia"/>
            <a-range-picker style="margin-left: 16px; width: 272px;" @change="onChange" />
            <a-select
              placeholder="请选择审核状态"
              v-model="authStatus"
              style="margin-left: 16px; width: 272px;"
              @change="onSearchStatus"
            >
              <a-select-option value="">
                全部
              </a-select-option>
              <a-select-option :value="1">
                未审核
              </a-select-option>
              <a-select-option :value="2">
                审核中
              </a-select-option>
              <a-select-option :value="3">
                审核通过
              </a-select-option>
              <a-select-option :value="4">
                审核失败
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :md="2" :sm="24">
            <a-button style="float:right" type="primary" icon="plus" @click="add()" v-action:GOODSADD>添加商品</a-button>
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

      <span slot="id" slot-scope="text, record">
        <span style="cursor: pointer;color:blue" @click="showDetail(record)">{{ text }}</span>
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="isOnSale" slot-scope="text">
        <span>{{ text | isOnSaleFilter }}</span>
      </span>
      <span slot="isHotslot" slot-scope="text">
        <span>{{ text | isHotFilter }}</span>
      </span>
      <span slot="img" slot-scope="text">
        <div style="width:160px;height:90px;">
          <img style="width:160px;height:90px;" :src="text" alt="">
        </div>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="update(record)">编辑</a>
          <a-divider type="vertical" v-if="record.authStatus==1 || record.authStatus==2 ||(record.authStatus==3&&record.isOnSale==1) || (record.authStatus==3&&record.isOnSale==0)"/>
          <a v-if="record.authStatus==1||record.authStatus==2" @click="auth(record)">审核</a>
          <a v-if="record.authStatus==3&&record.isOnSale==1" @click="stop(record)">下架</a>
          <a v-if="record.authStatus==3&&record.isOnSale==0" @click="start(record)">上架</a>
          <a-divider type="vertical" v-action:GOODSDELETE />
          <a @click="deleteUser(record)" v-action:GOODSDELETE>删除</a>
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
import CreateForm2 from './modules/CreateForm2'
import { getList, DeleteData, startUse, stopUse } from '@/api/goods'

const statusMap = {
  1: {
    status: 'default',
    text: '未审核'
  },
  2: {
    status: 'processing',
    text: '审核中'
  },
  3: {
    status: 'success',
    text: '审核通过'
  },
  4: {
    status: 'error',
    text: '审核失败'
  }
}
const isHotMap = {
  0: {
    text: '非热推'
  },
  1: {
    text: '热推'
  }
}

const isOnSaleMap = {
  0: {
    text: '非在售'
  },
  1: {
    text: '在售'
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
      authStatus: '',
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
          title: '商品编号',
          dataIndex: 'serialNumber',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '商品名称',
          dataIndex: 'name'
        },
        {
          title: '商品图片',
          dataIndex: 'picUrl',
          scopedSlots: { customRender: 'img' }
        },
        {
          title: '商品价格',
          dataIndex: 'salePrice'
        },
        {
          title: '是否推荐',
          dataIndex: 'isHot',
          scopedSlots: { customRender: 'isHotslot' }
        },
        {
          title: '是否在售',
          dataIndex: 'isOnSale',
          scopedSlots: { customRender: 'isOnSale' }
        },
        {
          title: '商品状态',
          dataIndex: 'authStatus',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建日期',
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
          serialNumber: this.serialNumber,
          authStatus: this.authStatus,
          startTime: this.startTime,
          endTime: this.endTime
        }).then(res => {
            return res.result
        })
      },
      startTime: '',
      endTime: '',
      serialNumber: ''
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    isHotFilter (type) {
      return isHotMap[type].text
    },
    isOnSaleFilter (type) {
      return isOnSaleMap[type].text
    }
  },
  created () {
  },
  methods: {
    showDetail (val) {
      this.$refs.createModal.showDetail(val)
    },
    onSearchStatus () {
      this.$refs.table.refresh(true)
    },
    add () {
      this.$refs.createModal.add()
    },
    update (record) {
      this.$refs.createModal.update(record)
    },
    auth (record) {
      this.$refs.createModal2.update(record)
    },
    stop (record) {
      this.$confirm({
        title: '确定下架该商品吗?',
        content: `商品编号：${record.serialNumber},商品名称:${record.name}，确认下架吗？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
            stopUse({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('下架商品成功！')
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
        title: '确定上架该商品吗?',
        content: `商品编号${record.serialNumber},商品名称:${record.name}，确认上架吗？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
             startUse({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('上架商品成功！')
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
        title: '删除该商品吗?',
        content: `商品编号${record.serialNumber},商品名称:${record.name}，确认删除吗？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
            DeleteData({
              id: record.mediaId
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('删除商品成功！')
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
    onSearchShangjia (val) {
      this.serialNumber = val
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
