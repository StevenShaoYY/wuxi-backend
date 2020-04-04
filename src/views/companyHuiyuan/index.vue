<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="24" :sm="24">
            <a-input-search placeholder="搜索编号、姓名、手机号码" style="width:210px;float:left;margin-left: 16px;" @search="onSearch"/>
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
            <a-button style="float:right;margin-left:10px;" type="primary" @click="$refs.createModal2.add()" v-action:MADD>添加成员</a-button>
            <a-button style="float:right;margin-left:10px;" type="primary" @click="$refs.createModal.add()" v-action:CADD>添加会员</a-button>
          </a-col>
          <!-- <a-col :md="7" :sm="24">
            <a-button style="float:right;margin-left:10px;" type="primary" @click="$refs.createModal.add()" v-action:MADD>添加单位成员</a-button>
            <a-button style="float:right;margin-left:10px;" type="primary" @click="$refs.createModal.add()" v-action:CADD>添加单位会员</a-button>
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
      <span slot="name" slot-scope="text, record">
        <span v-if="record.type==3">{{ record.authInfo.name }}</span>
        <span v-else>{{ record.authInfo.companyLegalPerson }}</span>
      </span>
      <span slot="phone" slot-scope="text, record">
        <span v-if="record.type==3">{{ record.authInfo.phoneNumber }}</span>
        <span v-else>{{ record.authInfo.companyLegalPersonPhone }}</span>
      </span>
      <span slot="idcard" slot-scope="text, record">
        <span v-if="record.type==3">{{ record.authInfo.certificateNumber }}</span>
        <span v-else>{{ record.authInfo.companyLegalPersonCertificateNumber }}</span>
      </span>
      <span slot="id" slot-scope="text, record">
        <span style="cursor: pointer;color:blue" @click="showDetail(record)">{{ text }}</span>
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="huiyuanType" slot-scope="text">
        {{ text | huiyuanTypeFilter }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a v-if="record.status==1" @click="stop(record)">禁用</a>
          <a v-else @click="start(record)">启用</a>
          <a-divider type="vertical" v-action:DELETE/>
          <a @click="deleteUser(record)" v-action:DELETE>删除</a>
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
const huiyuanMap = {
  0: {
    status: 'default',
    text: '非会员'
  },
  1: {
    status: 'processing',
    text: '普通会员'
  },
  2: {
    status: 'processing',
    text: '单位会员'
  },
  3: {
    status: 'processing',
    text: '单位成员'
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
      queryParam: {
        type: 2
      },
      // 表头
      columns: [
        {
          title: '会员编号',
          dataIndex: 'serialNumber',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '单位名称',
          dataIndex: 'authInfo.companyName'
        },
        {
          title: '姓名',
          dataIndex: 'authInfo.companyLegalPerson',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '手机号码',
          dataIndex: 'authInfo.companyLegalPersonPhone',
          scopedSlots: { customRender: 'phone' }
        },
        {
          title: '会员类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'huiyuanType' }
        },
        {
          title: '身份证号码',
          dataIndex: 'authInfo.companyLegalPersonCertificateNumber',
          scopedSlots: { customRender: 'idcard' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
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
    showDetail (val) {
      this.$refs.createModal.showDetail(val)
    },
    onSearch (val) {
      this.queryParam.queryKey = val
      this.$refs.table.refresh(true)
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
    handleEdit (record) {
      if (record.type === 2) {
        this.$refs.createModal.update(record)
      } else {
        this.$refs.createModal2.update(record)
      }
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
