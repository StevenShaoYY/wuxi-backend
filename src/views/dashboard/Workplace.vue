<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome }}</span></div>
      <div style="margin-bottom:10px;">无锡市道路交通协会后台管理系统</div>
    </div>
    <div slot="extra">
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="10" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="快速入口"
            :body-style="{ padding: 0 }">
            <a slot="extra"></a>
            <div>
              <a-card-grid class="project-card-grid" @click="$router.push('/huiyuan/Authentication')">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <!-- <a-avatar size="small" :src="item.cover"/> -->
                      <a-icon class="icon-a" type="aliwangwang" />
                      <a>待认证会员</a>
                    </div>
                    <div slot="description" class="card-description">
                      待认证会员{{ homeData.authCount }}个
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a>快速前往></a>
                    <!-- <span class="datetime">9小时前</span> -->
                  </div>
                </a-card>
              </a-card-grid>
              <a-card-grid class="project-card-grid">
                <a-card :bordered="false" :body-style="{ padding: 0 }" @click="$router.push('/huiyuan/reply')">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <!-- <a-avatar size="small" :src="item.cover"/> -->
                      <a-icon class="icon-a" type="mail" />
                      <a>会员反馈</a>
                    </div>
                    <div slot="description" class="card-description">
                      会员反馈{{ homeData.feedbackCount }}条
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a>快速前往></a>
                    <!-- <span class="datetime">9小时前</span> -->
                  </div>
                </a-card>
              </a-card-grid>
              <a-card-grid class="project-card-grid">
                <a-card :bordered="false" :body-style="{ padding: 0 }" @click="$router.push('/mall/list/goodsManage')">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <!-- <a-avatar size="small" :src="item.cover"/> -->
                      <a-icon class="icon-a" type="mail" />
                      <a>待审核商品</a>
                    </div>
                    <div slot="description" class="card-description">
                      待审核商品{{ homeData.goodsCount }}个
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a>快速前往></a>
                    <!-- <span class="datetime">9小时前</span> -->
                  </div>
                </a-card>
              </a-card-grid>
              <a-card-grid class="project-card-grid">
                <a-card :bordered="false" :body-style="{ padding: 0 }" @click="$router.push('/huiyuan/reserve')">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <!-- <a-avatar size="small" :src="item.cover"/> -->
                      <a-icon class="icon-a" type="mail" />
                      <a>预约服务</a>
                    </div>
                    <div slot="description" class="card-description">
                      预约服务{{ homeData.reserveCount }}个
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a>快速前往></a>
                    <!-- <span class="datetime">9小时前</span> -->
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="14"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="会员统计" style="margin-bottom: 24px" :loading="radarLoading" :bordered="false" :body-style="{ padding: 0 }">
            <div style="width:100%;height:300px;">
              <zhexian-chart
                v-if="radarLoading==false"
                class="marginTop10"
                width="525"
                height="280"
                :nameList="searchUserScale"
                :dataList="homeChartData"></zhexian-chart>

            </div>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col
          style="padding: 0 12px"
          :xl="15"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="订单统计" style="margin-bottom: 24px" :loading="radarLoading2" :bordered="false" :body-style="{ padding: 0 }">
            <div style="width:100%;height:300px;">
              <zhuzhuang
                v-if="radarLoading2==false"
                class="marginTop10"
                width="525"
                height="280"
                :nameList="searchUserScale2"
                :dataList="homeChartData2"></zhuzhuang>

            </div>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="9"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="销售排行" style="margin-bottom: 24px" :loading="radarLoading" :bordered="false" :body-style="{ padding: 0 }">
            <div class="indexContainer" style="width:100%;height:300px;">
              <div
                class="indexList"
                v-for="(item,index) of homeChartData3"
                :key="index">
                <span style="flex:0 0 20px">{{ index+1 }}.</span>
                <span style="flex:1">{{ item.name }}</span>
                <span style="flex:0 0 80px">{{ item.value }}</span>

              </div>
            </div>

          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'

import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import zhexianChart from '@/components/zhexianChart'
import zhuzhuang from '@/components/zhuzhuang'
import { getHome1, getHome2, getHome3, getHome4 } from '@/api/home'
// import { Chart } from '@antv/g2'
// const DataSet = require('@antv/data-set')
const searchUserScale = ['会员数', '日期']
const searchUserScale2 = ['订单数', '日期']
export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo,
    zhexianChart,
    zhuzhuang
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},
      searchUserScale,
      searchUserScale2,
      loading: true,
      radarLoading: true,
      radarLoading2: true,
      homeData: {},
      homeChartData: {},
      homeChartData2: [],
      homeChartData3: {},
      chart: {}
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar

    getHome1({}).then(res => {
      this.homeData = res.result
      this.loading = false
    })

    this.radarLoading = true
    getHome2({}).then(res => {
      this.homeChartData = [
        res.result.xValue,
        res.result.yValue
      ]
      this.radarLoading = false
    })
    getHome3({}).then(res => {
      this.homeChartData2 = [
        res.result.xValue,
        res.result.yValue
      ]
      this.radarLoading2 = false
    })
      getHome4({}).then(res => {
      this.homeChartData3 = res.result
      this.radarLoading = false
    })
  },
  mounted () {
     this.initDraw()
  },
  methods: {
    initDraw () {
    //   this.chart = new G2.Chart({
    //     container: 'lineChart',
    //     autoFit: true,
    //     height: 500
    //  })
    }
  }
}
</script>

<style lang="less" scoped>
  .project-list {
    .project-card-grid {
      width: 50%;
      cursor: pointer;
    }
    .icon-a{
      // width: 20px;
      // height: 20px;
      font-size: 30px;
    }
    .card-title {
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }
      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }
    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
        cursor: pointer;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }

  }
.indexContainer{
      height: 300px;
      overflow-y: auto;
    }
    .indexList{
      display: flex;
      line-height: 29px;
      padding: 0 20px;
    }
</style>
