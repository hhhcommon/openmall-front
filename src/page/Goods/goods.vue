<template>
  <div class="goods" style="margin-top: 30px;">
    <!-- <filter-box></filter-box> -->
    <div class="nav">
      <!-- <div class="w">
        <a href="javascript:;" :class="{active:sortType===1}" @click="reset()">综合排序</a>
        <a href="javascript:;" @click="sortByPrice(1)" :class="{active:sortType===2}">价格从低到高</a>
        <a href="javascript:;" @click="sortByPrice(-1)" :class="{active:sortType===3}">价格从高到低</a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min">
          <span style="margin: 0 5px"> - </span>
          <input type="number" placeholder="价格" v-model="max">
          <y-button text="确定" classStyle="main-btn" @btnClick="reset" style="margin-left: 10px;"></y-button>
        </div>
      </div>-->
    </div>
    <div v-loading="loading" element-loading-text="加载中..." style="min-height: 35vw;">
      <div class="img-item" v-if="!noResult">
        <!--商品-->
        <div class="goods-box w">
          <mall-goods v-for="(item,i) in listData.list" :key="item.id" :msg="item" v-if="i < 20"></mall-goods>
        </div>
        <el-pagination
          v-if="!noResult&&!error"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listData.pageNum"
          :page-sizes="[8, 20, 40, 80]"
          :page-size="listData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listData.total"
        ></el-pagination>
      </div>
      <div class="no-info" v-if="noResult">
        <div class="no-data">
          <img src="/static/images/no-search.png">
          <br>抱歉！暂时还没有商品
        </div>
        <section class="section">
          <y-shelf :title="recommendPanel.name">
            <div slot="content" class="recommend">
              <mall-goods :msg="item" v-for="(item,i) in recommendPanel.panelContents" :key="i"></mall-goods>
            </div>
          </y-shelf>
        </section>
      </div>
      <div class="no-info" v-if="error">
        <div class="no-data">
          <img src="/static/images/error.png">
          <br>抱歉！出错了...
        </div>
        <section class="section">
          <y-shelf :title="recommendPanel.name">
            <div slot="content" class="recommend">
              <mall-goods :msg="item" v-for="(item,i) in recommendPanel.panelContents" :key="i"></mall-goods>
            </div>
          </y-shelf>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { getProdctList } from "/api/goods.js";
// import { recommend } from '/api/index.js'
import mallGoods from "/components/mallGoods";
import YButton from "/components/YButton";
import YShelf from "/components/shelf";
import axios from "axios";
import filterBox from "../../components/filterBox";
export default {
  components: { filterBox },
  data() {
    return {
      list: [],
      noResult: false,
      error: false,
      min: "",
      max: "",
      loading: false,
      sortType: 1,
      recommendPanel: [],
      sort: "",
      listData: {
        pageNum: 1,
        pageSize: 5,
        total: 3,
        totalPage: 1
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this._getAllGoods();
      this.loading = true;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this._getAllGoods();
      this.loading = true;
    },
    _getAllGoods() {
      let cateId = this.$dc(this.$route.query.cateId);
      // console.log(cateId)
      getProdctList({ productCategoryId: cateId,pageSize:5, pageNum:1}).then(res => {
        this.$nextTick(() => {
          this.listData = res.data;
        });
      });
      // axios.get('/goods/allGoods', {
      //     params: {}
      // }).then(res => {
      //     this.goods = res.data.data.filter(item=>item.typeId== this.$route.query.id)
      // }).catch(err => {})
    },
    // 默认排序
    reset() {
      this.sortType = 1;
      this.sort = "";
      this.currentPage = 1;
      this.loading = true;
      this._getAllGoods();
    },
    // 价格排序
    sortByPrice(v) {
      v === 1 ? (this.sortType = 2) : (this.sortType = 3);
      this.sort = v;
      this.currentPage = 1;
      this.loading = true;
      this._getAllGoods();
    }
  },
  watch: {
    $route(to, from) {
      if (to.fullPath.indexOf("/goods?cateId=") >= 0) {
        this._getAllGoods();
      }
    }
  },
  mounted() {
    this._getAllGoods();
    // recommend().then(res => {
    //   let data = res.result
    //   this.recommendPanel = data[0]
    // })
  },
  components: {
    mallGoods,
    YButton,
    YShelf,
    filterBox
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/mixin";
@import "../../assets/style/theme";

.nav {
  height: 60px;
  line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    a {
      padding: 0 15px;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;
      &.active {
        color: #5683ea;
      }
      &:hover {
        color: #5683ea;
      }
    }
    input {
      @include wh(80px, 30px);
      border: 1px solid #ccc;
    }
    input + input {
      margin-left: 10px;
    }
  }
  .price-interval {
    padding: 0 15px;
    @extend %block-center;
    input[type="number"] {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
  }
}

.goods-box {
  > div {
    float: left;
    width: 23%;
    margin: 0 1%;
    border: 1px solid #efefef;
  }
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}

.img-item {
  display: flex;
  flex-direction: column;
}

.el-pagination {
  align-self: flex-end;
  margin: 3vw 10vw 2vw;
}

.section {
  padding-top: 8vw;
  margin-bottom: -5vw;
  width: 1218px;
  align-self: center;
}

.recommend {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}
</style>
