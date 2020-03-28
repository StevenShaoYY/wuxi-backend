<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="20" :sm="24">
            <a-input-search placeholder="搜索编号、姓名、手机号码" style="margin-left: 16px; width: 272px;" @search="onSearch"/>
          </a-col>
          <a-col :md="4" :sm="24">
            <!-- <a-button type="primary" icon="plus" @click="$refs.createModal.add()">添加会员</a-button> -->
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
      <span slot="huiyuanType" slot-scope="text">
        {{ text | huiyuanTypeFilter }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a v-if="record.authStatus==2" @click="handleEdit(record)">认证</a>
          <a-divider v-if="record.authStatus==2" type="vertical" />
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
import { getAuthList, deleteAuth } from '@/api/huiyuan'

const statusMap = {
  1: {
    status: 'warning',
    text: '未支付'
  },
  2: {
    status: 'processing',
    text: '已支付'
  },
  3: {
    status: 'error',
    text: '支付异常'
  },
  4: {
    status: 'warning',
    text: '已退款'
  },
  5: {
    status: 'default',
    text: '已清除'
  },
  6: {
    status: 'success',
    text: '已审核'
  }
}
const huiyuanMap = {
  1: {
    status: 'default',
    text: '个人会员'
  },
  2: {
    status: 'processing',
    text: '单位会员'
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
          title: '认证编号',
          dataIndex: 'serialNumber'
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
          title: '认证类型',
          dataIndex: 'authType',
          scopedSlots: { customRender: 'huiyuanType' }
        },
        {
          title: '认证状态',
          dataIndex: 'authStatus',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '提交日期',
          dataIndex: 'createTime',
          sorter: true
        },
        {
          title: '认证日期',
          dataIndex: 'authTime',
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
        console.log('loadData.filters', filters)
        // return getSingle(Object.assign(parameter, this.queryParam))
        return getAuthList({
          currentPage: parameter.pageNo,
          pageSize: parameter.pageSize,
          queryKey: this.queryParam
        }).then(res => {
            for (const item of res.result.content) {
              if (item.authType === 2) {
                item.authInfo.name = item.authInfo.companyLegalPerson
                item.authInfo.phoneNumber = item.authInfo.companyLegalPersonPhone
                item.authInfo.certificateNumber = item.authInfo.companyLegalPersonCertificateNumber
              }
            }
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
    huiyuanTypeFilter (type) {
      return huiyuanMap[type].text
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
    deleteUser (record) {
       this.$confirm({
        title: '确定删除该认证数据吗?',
        content: '删除后将不保存该认证数据，确认删除吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            deleteAuth({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('删除认证数据成功！')
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
