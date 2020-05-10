<template>
  <a-modal
    :title="title"
    :width="840"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="广告标题"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入广告标题"
              v-decorator="['name', {rules: [{required: true, message: '请输入广告标题！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="广告内容"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入广告内容"
              v-decorator="['content', {rules: [{required: true, message: '请输入广告内容！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item
              label="广告图片"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <!--
                :file-list="fileList" -->
              <a-upload
                v-decorator="[
                  'picUrl',
                  {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                    rules: [{required: true, message: '请上传广告图片！'}]
                  },
                ]"
                action="http://101.132.194.14/traffic/ops/mall/photo/upload"
                list-type="picture-card"
                name="photo"
                @change="handleChange"
              >
                <div v-if="fileListLength < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    上传图片
                  </div>
                </div>
              </a-upload>
            </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="广告链接"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入广告链接"
              v-decorator="['link']" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item
              label="开始时间"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <a-date-picker
                v-decorator="['startTime']"
                :disabled-date="disabledStartDate"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                @change="startTimeChange"
              />
            </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item
              label="结束时间"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <a-date-picker
                v-decorator="['endTime']"
                :disabled-date="disabledEndDate"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                @change="endTimeChange"
              />
            </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="广告位置"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-select
              v-decorator="[
                'position',{initialValue:1}]"
              placeholder="请选择广告位置"
            >
              <a-select-option :value="1">
                首页
              </a-select-option>
            </a-select>
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="是否启用"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-select
              v-decorator="[
                'status',{initialValue:1}]"
              placeholder="请选择是否启用"
            >
              <a-select-option :value="1">
                启用
              </a-select-option>
              <a-select-option :value="2">
                禁用
              </a-select-option>
            </a-select>
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { add, update } from '@/api/ad'
import moment from 'moment'

export default {
  data () {
    return {
      labelCol2: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol2: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: '添加广告',
      rid: '',
      fileListLength: 0,
      endValue: '',
      startValue: ''
    }
  },
  created () {
  },
  methods: {
    moment,
    startTimeChange (val) {
      console.log(val)
      this.startValue = val
    },
    endTimeChange (val) {
      this.endValue = val
    },
    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    handleChange (file) {
      console.log('Upload file:', file)
      this.fileListLength = file.fileList.length
    },
    add () {
      this.visible = true
      this.title = '添加广告'
    },
    update (val) {
      this.visible = true
      this.title = '编辑广告'
      this.rid = val.id
      setTimeout(() => {
        this.form.setFieldsValue({
          name: val.name,
          content: val.content,
          picUrl: [{
              uid: '-1',
              name: '广告图',
              status: 'done',
              url: val.picUrl
            }],
          link: val.link,
          position: val.position,
          startTime: moment(val.startTime, 'YYYY-MM-DD HH:mm:ss'),
          endTime: moment(val.endTime, 'YYYY-MM-DD HH:mm:ss'),
          status: val.status
        })
        this.fileListLength = 1
        this.startValue = moment(val.startTime, 'YYYY-MM-DD HH:mm:ss')
        this.endValue = moment(val.endTime, 'YYYY-MM-DD HH:mm:ss')
      }, 100)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log(values)
        if (!errors) {
          if (this.title === '添加广告') {
            const uploadData = JSON.parse(JSON.stringify(values))
            if (values.startTime) { uploadData.startTime = values.startTime.format('YYYY-MM-DD HH:mm:ss') }
            if (values.endTime) { uploadData.endTime = values.endTime.format('YYYY-MM-DD HH:mm:ss') }
            uploadData.picUrl = uploadData.picUrl[0].response.result
            add(uploadData).then(res => {
              if (res.code === '200') {
                this.visible = false
                this.confirmLoading = false
                this.$message.success('新增成功')
                this.form.resetFields()
                this.$emit('ok', values)
              } else {
                this.confirmLoading = false
                this.$message.error('新增失败！' + res.message)
              }
            })
          } else {
            const uploadData = JSON.parse(JSON.stringify(values))
            uploadData.startTime = values.startTime.format('YYYY-MM-DD HH:mm:ss')
            uploadData.endTime = values.endTime.format('YYYY-MM-DD HH:mm:ss')
            uploadData.picUrl = uploadData.picUrl[0].url || uploadData.picUrl[0].response.result
            console.log(888, uploadData)
            update(Object.assign(uploadData, {
              id: this.rid
            })).then(res => {
              if (res.code === '200') {
                this.visible = false
                this.confirmLoading = false
                this.$message.success('编辑成功')
                this.form.resetFields()
                this.$emit('ok', values)
              } else {
                this.confirmLoading = false
                this.$message.error('编辑失败！' + res.message)
              }
            })
          }
        } else {
          console.log(8888, errors)
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.startValue = ''
      this.endValue = ''
      this.fileListLength = 0
      this.form.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
  .line{
    border-top: 1px solid #E8E8E8;
  }
</style>
