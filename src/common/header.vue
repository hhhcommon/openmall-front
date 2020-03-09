<template>
  <div class="main-header" :style="{height: headerHeight + 'px'}">
    <div class="header-box" :class="{'fix-nav': st, 'dark':!showBanner}">
      <div class="search-container" :class="{'hide-search':!searchMode}">
        <i class="el-icon-close search-close" @click="searchMode = false"></i>
        <el-row style="max-width: 400px;">
          <el-col :span="18">
            <el-input v-model="searchKey" size="small"></el-input>
          </el-col>
          <el-col :span="5" style="padding-left: 10px">
            <el-button @click="search" size="mini">SEARCH</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="logo-container">
        <div class="language-box">
          <el-popover
            placement="bottom"
            width="200"
            popper-class="language-pop"
            v-model="showLanguage"
          >
            <ul class="select-language">
              <li @click="handleCommand('en')">ENGLISH</li>
              <li @click="handleCommand('jp')">日本語</li>
              <li @click="handleCommand('cn')">简体中文</li>
              <li @click="handleCommand('hk')">繁體中文</li>
            </ul>
            <span style="cursor: pointer" slot="reference">
              <i class="el-icon-location-outline" style="font-size: 12px"></i>
              {{language}}
              <i class="el-icon-arrow-down" style="font-size: 12px;"></i>
            </span>
          </el-popover>
          <span style="margin-left: 12px; cursor: pointer">{{$t('public.header.service')}}</span>
        </div>
        <div class="top-logo" @click="$router.push({path: '/'})">
          <img src="/static/images/top-logo.png" alt="" width="100%">
        </div>
        <div class="icon-box" :class="{'fix-icon': st}">
          <span>
            <span
              @click="$router.push('login')"
              v-if="!login"
              style="cursor: pointer"
            >{{$t('public.header.login')}}</span>
            <span v-else class="user-info">
              <span class="avatar">
                <img src="/static/images/user-avatar.png" alt="">
              </span>
              <el-popover
                placement="bottom"
                width="200"
                popper-class="language-pop"
                v-model="showUserInfo"
              >
                <div
                  class="select-title"
                  style="font-size: 16px; padding: 5px 5px 10px; margin-bottom: 5px;border-bottom: 1px #ddd solid"
                >我的信息</div>
                <ul class="select-language">
                  <li>
                    <router-link to="/user/orderList">{{$t('public.header.user_order')}}</router-link>
                  </li>
                  <li>
                    <router-link to="/user/information">{{$t('public.header.user_accout')}}</router-link>
                  </li>
                  <li>
                    <router-link to="/user/addressList">{{$t('public.header.user_address')}}</router-link>
                  </li>
                  <li>
                    <router-link to="/user/coupon">{{$t('public.header.user_coupon')}}</router-link>
                  </li>
                  <li>
                    <router-link to="/user/support">{{$t('public.header.user_support')}}</router-link>
                  </li>
                  <li>
                    <span @click="_loginOut">{{$t('public.header.logout')}}</span>
                  </li>
                </ul>
                <span style="cursor: pointer" slot="reference">
                  {{nickname}}
                  <i class="el-icon-arrow-down" style="font-size: 12px;"></i>
                </span>
              </el-popover>
            </span>
          </span>
          <span style="margin-left: 12px" class="num cart-icon">
            <div class="red-point" v-if="cartList.length"></div>
            <i class="el-icon-shopping-bag-2" style="font-size: 14px"></i>
            <span @mouseenter="showCart = !showCart">{{$t('public.header.bag')}}</span>
            <div class="cart-detail arrow_dialog" v-if="showCart" @mouseleave="showCart=false">
              <div class="title">{{$t('public.header.bag')}}</div>
              <div class="content" v-if="cartList.length">
                <ul>
                  <li v-for="(item,i) in cartList" :key="i" class="cart-item" @click="toDetail(item)">
                    <div class="item-thumb">
                      <img :src="item.productPic">
                    </div>
                    <div class="item-profile">
                      <h4>{{item.productName}} x {{item.quantity}}</h4>
                      <p class="price-icon">{{$t('common.money_sign')}} {{item.price}}</p>
                    </div>
                  </li>
                </ul>
                <div class="total-price">
                  <p>
                    共
                    <strong>{{totalNum}}</strong>
                    {{$t('common.jian')}}{{$t('common.goods')}}, {{$t('common.total')}}：{{$t('common.money_sign')}}{{totalPrice}}
                  </p>
                </div>
                <p>
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="toCart"
                  >{{$t('public.header.to_cart')}}</el-button>
                </p>
                <p>
                  <el-button
                    style="width: 100%; margin-top: 10px;"
                    @click="toCheckout"
                  >{{$t('public.header.to_settle')}}</el-button>
                </p>
              </div>
              <div class="empty-cart" v-else>
                <span>{{$t('public.header.cart_empty_notice')}}</span>
              </div>
            </div>
          </span>
          <span @click="searchMode=!searchMode">
            <i class="el-icon-search" style="font-size: 14px; margin-left: 10px; cursor: pointer"></i>
          </span>
        </div>
      </div>
      <div class="nav-container">
        <span
          v-for="item in headNavList"
          :key="item.id"
          style="cursor: pointer"
          @click="toItem(item)"
          :class="{'current': item.id== navIndex}"
        >{{item.name}}</span>
      </div>
    </div>
    <div class="top-banner" v-if="showBanner">
      <div class="banner-btn arrow-left" @click="setBanner(0)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="banner-btn arrow-right" @click="setBanner(1)">
        <i class="el-icon-arrow-right"></i>
      </div>
      <transition name="el-fade-in-linear" v-for="(item, index) in advertiseList" :key="index"  v-if="showIndex === index">
        <div class="banner-item">
          <div class="item-center">
            <h3>{{item.name}}</h3>
            <!-- <p>February 14 of the Gregorian calendar is Valentine's day, a traditional western festival. Valentine's Day is also called "Saint Valentine's Day" or "Saint Valentine's Day"</p> -->
            <el-button type="primary" @click="toAd(item.url)">SHOP THE
              <br>COLLECTION
            </el-button>
          </div>
          <div class="item-bg">
            <img :src="item.pic" alt="">
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import YButton from "/components/YButton";
import { mapMutations, mapState } from "vuex";
import { cartList, cartDel, getQuickSearch } from "/api/goods";
import { productCateList,homeContent } from "/api/index";
import { loginOut, navList } from "/api/index";
import { setStore, getStore, removeStore } from "/utils/storage";
// import store from '../store/'
export default {
  data() {
    return {
      user: {},
      headerHeight: 700,
      // 查询数据库的商品
      st: false,
      // 头部购物车显示
      cartShow: false,
      positionL: 0,
      positionT: 0,
      timerCartShow: null, // 定时隐藏购物车
      input: "",
      choosePage: -1,
      searchResults: [],
      timeout: null,
      token: "",
      headNavList: [
        {
          name: "生活",
          id: 4
        },
        {
          name: "购物指南",
          value: 5
        },
        {
          name: "BLOG",
          id: 6
        },
        {
          name: "回收寄卖",
          id: 7
        }
      ],
      advertiseList:[],
      showIndex: 0,
      navIndex: 0,
      timer: null,
      showLanguage: false,
      showCart: false,
      showUserInfo: false,
      searchMode: false,
      searchKey: ""
    };
  },
  computed: {
    ...mapState(["cartList", "receiveInCart", "login", "userInfo", "nickname"]),
    language() {
      switch (this.$i18n.locale) {
        case "jp": {
          return "日本語";
          break;
        }
        case "en": {
          return "English";
          break;
        }
        case "cn": {
          return "简体中文";
          break;
        }
        case "hk": {
          return "繁體中文";
          break;
        }
        default: {
          return "English";
        }
      }
    },
    lang() {
      return this.$i18n.locale;
    },
    showBanner() {
      return this.$route.path === "/index";
    },
    // 计算价格
    totalPrice() {
      var totalPrice = 0;
      this.cartList &&
        this.cartList.forEach(item => {
          totalPrice += item.quantity * item.price;
        });
      return totalPrice;
    },
    // 计算数量
    totalNum() {
      var totalNum = 0;
      this.cartList &&
        this.cartList.forEach(item => {
          totalNum += item.quantity;
        });
      return totalNum;
    },
  },
  methods: {
    ...mapMutations([
      "ADD_CART",
      "INIT_BUYCART",
      "ADD_ANIMATION",
      "SHOW_CART",
      "REDUCE_CART",
      "RECORD_USERINFO",
      "EDIT_CART"
    ]),
    toAd(url){
      window.location.href = url
    },
    toDetail(item){
      // console.log(item)
      this.$router.push({
        path: "/goodsDetails",
        query: {
          productId: item.id
        }
      })
    },
    toCheckout(){
      this.$router.push("/checkout")
    },
    getNavIndex(){
      if(this.$route.query.cateId){
        this.navIndex = this.$dc(this.$route.query.cateId)
      }else {
        this.navIndex = 0
      }
    },
    search() {
      this.$router.push({
        path: "/search",
        query: {
          key: this.searchKey
        }
      });
    },
    toItem(item) {
      console.log(item);
      switch (item.id) {
        case 1:
          this.$router.push("/index");
          break;
        default:
          this.$router.push({
            path: "goods",
            query: {
              cateId: this.$ec(item.id)
            }
          });
      }
    },
    setBanner(state) {
      clearInterval(this.timer);
      if (state === 1) {
        if (this.showIndex === 3) {
          this.changeBanner(0);
        } else {
          this.changeBanner(++this.showIndex);
        }
      } else {
        if (this.showIndex === 0) {
          this.changeBanner(3);
        } else {
          this.changeBanner(--this.showIndex);
        }
        //  this.changeBanner(--this.showIndex)
      }
    },
    changeBanner(i) {
      // console.log(i)
      i === undefined ? (this.showIndex = 0) : (this.showIndex = i);
      this.timer = setInterval(() => {
        if (this.showIndex === 3) {
          this.showIndex = 0;
        } else {
          this.showIndex++;
        }
      }, 6000);
    },
    handleIconClick(ev) {
      if (this.$route.path === "/search") {
        this.$router.push({
          path: "/refreshsearch",
          query: {
            key: this.input
          }
        });
      } else {
        this.$router.push({
          path: "/search",
          query: {
            key: this.input
          }
        });
      }
    },
    handleCommand(val) {
      // console.log(val)
      this.showLanguage = false;
      this.$i18n.locale = val;
      window.localStorage.setItem("localeLanguage", val);
    },
    showError(m) {
      this.$message.error({
        message: m
      });
    },
    // 导航栏文字样式改变
    changePage(v) {
      this.choosePage = v;
    },
    changGoods(v, item) {
      this.changePage(v);
      if (v === -1) {
        this.$router.push({
          path: "/"
        });
      } else if (v === -2) {
        this.$router.push({
          path: "/refreshgoods"
        });
      } else {
        // 站内跳转
        this.$router.push({
          path: "/goods",
          query: {
            id: item.value
          }
        });
      }
    },
    // 搜索框提示
    loadAll() {
      let params = {
        params: {
          key: this.input
        }
      };
      getQuickSearch(params).then(res => {
        if (res === null || res === "") {
          return;
        }
        if (res.error) {
          this.showError(res.error.reason);
          return;
        }
        var array = [];
        var maxSize = 5;
        if (res.hits.hits.length <= 5) {
          maxSize = res.hits.hits.length;
        }
        for (var i = 0; i < maxSize; i++) {
          var obj = {};
          obj.value = res.hits.hits[i]._source.productName;
          array.push(obj);
        }
        if (array.length !== 0) {
          this.searchResults = array;
        } else {
          this.searchResults = [];
        }
      });
    },
    querySearchAsync(queryString, cb) {
      if (this.input === undefined) {
        cb([]);
        return;
      }
      this.input = this.input.trim();
      if (this.input === "") {
        cb([]);
        return;
      } else {
        this.loadAll();
        setTimeout(() => {
          cb(this.searchResults);
        }, 300);
      }
    },
    handleSelect(item) {
      this.input = item.value;
    },
    // 购物车显示
    cartShowState(state) {
      this.SHOW_CART({ showCart: state });
    },
    // 登陆时获取一次购物车商品
    _getCartList() {
      cartList()
        .then(res => {
          // console.log(res)
          if (res.code === 200) {
            if (res.data.length) {
              res.data.forEach(item => {
                this.$set(item, "checked", "1");
              });
            }
            setStore("buyCart", res.data);
          }
          // 重新初始化一次本地数据
        })
        .then(this.INIT_BUYCART);
    },
    // 删除商品
    delGoods(productId) {
      if (this.login) {
        // 登陆了
        cartDel({ userId: getStore("userId"), productId }).then(res => {
          this.EDIT_CART({ productId });
        });
      } else {
        this.EDIT_CART({ productId });
      }
    },
    toCart() {
      this.$router.push({ path: "/cart" });
    },
    // 控制顶部
    navFixed() {
      this.searchKey = "";
      this.searchMode = false;
      if (this.showBanner) {
        this.headerHeight = (document.body.clientWidth * 700) / 1920;
      } else {
        this.headerHeight = 80;
      }
      var st = document.documentElement.scrollTop || document.body.scrollTop;
      st >= 100 ? (this.st = true) : (this.st = false);
      // 计算小圆当前位置
      let num = document.querySelector(".num");
      this.positionL = num.getBoundingClientRect().left;
      this.positionT = num.getBoundingClientRect().top;
      this.ADD_ANIMATION({
        cartPositionL: this.positionL,
        cartPositionT: this.positionT
      });
      // if (
      //   this.$route.path === "/goods" ||
      //   this.$route.path === "/index" ||
      //   this.$route.path === "/goodsDetails" ||
      //   this.$route.path === "/thanks"
      // ) {
      //   var st = document.documentElement.scrollTop || document.body.scrollTop;
      //   st >= 100 ? (this.st = true) : (this.st = false);
      //   // 计算小圆当前位置
      //   let num = document.querySelector(".num");
      //   this.positionL = num.getBoundingClientRect().left;
      //   this.positionT = num.getBoundingClientRect().top;
      //   this.ADD_ANIMATION({
      //     cartPositionL: this.positionL,
      //     cartPositionT: this.positionT
      //   });
      // } else {
      //   return;
      // }
    },
    // 退出登陆
    _loginOut() {
      removeStore("Authorization");
      removeStore("userInfo");
      removeStore("buyCart");
      window.location.href = "/";
      // loginOut({
      //   params: {
      //     token: this.token
      //   }
      // }).then(res => {
      //   removeStore("token");
      //   removeStore("userInfo");
      //   removeStore("buyCart");
      //   window.location.href = "/";
      // });
    },
    // 通过路由改变导航文字样式
    getPage() {
      let path = this.$route.path;
      // let fullPath = this.$route.fullPath
      if (path === "/" || path === "/home") {
        this.changePage(-1);
      } else if (path === "/goods") {
        this.changePage(-2);
      } else {
        this.changePage(0);
      }
    },
    openProduct(productId) {
      window.open(
        "//" + window.location.host + "/#/goodsDetails?productId=" + productId
      );
    },
    _getNavList() {
      productCateList(0).then(res => {
        // res.data.forEach(item => {
        //   this.headNavList.unshift(item);
        // });
        this.headNavList = res.data.concat(this.headNavList)
        this.headNavList.unshift({
          name: "新入荷",
          id: 1
        });
      });
    },
    _getAllGoods() {
      homeContent().then(res=>{
        // console.log(res.data)
        this.advertiseList = res.data.advertiseList
      })
    }
  },
  watch: {
    $route() {
      this.navFixed();
      this.getNavIndex()
    }
  },
  mounted() {
    this._getNavList();
    this._getAllGoods()
    this.navFixed();
    if (this.login) {
      this._getCartList();
    } else {
      this.INIT_BUYCART();
    }
    this.getPage();
    window.addEventListener("scroll", this.navFixed);
    window.addEventListener("resize", this.navFixed);
    this.changeBanner();
  },
  components: {
    YButton
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/style/theme";
@import "../assets/style/mixin";
.arrow_dialog {
  &:before {
    position: absolute;
    right: 50px;
    top: -12px;
    width: 0;
    height: 0;
    border-width: 6px;
    border-style: solid;
    border-color: transparent transparent #efefef transparent;
    content: "";
  }
}
.main-header {
  position: relative;
  // overflow-x: hidden;
  height: 700px;
  .top-banner {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .banner-btn {
      position: absolute;
      z-index: 3;
      top: 50%;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.1);
      font-size: 14px;
      color: #999;
      transition: ease-in-out 0.5s;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.6);
        transition: ease-in-out 0.5s;
      }
      &.arrow-left {
        left: 0;
      }
      &.arrow-right {
        right: 0;
      }
    }
    .banner-item {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      top: 0;
      .item-bg {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        img {
          width: 100%;
        }
      }
      .item-center {
        position: absolute;
        z-index: 2;
        left: 50%;
        top: 60%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #fff;
        h3 {
          margin: 10px 0;
          font-size: 40px;
        }
        button {
          margin: 30px 0 0 0;
        }
      }
    }
  }
}
.header-box {
  // overflow-x: hidden;
  position: absolute;
  z-index: 10;
  background-image: -webkit-linear-gradient(
    rgba(0, 0, 0, 0.9) 0,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.9) 0,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  width: 100%;
  height: 100px;
  font-size: 12px;
  color: #dedcd7;
  transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
  &.dark {
    background-color: #333;
  }
  .search-container {
    position: absolute;
    z-index: 11;
    padding: 0 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    top: 0;
    right: 0;
    background-color: #333;
    transition: ease-in-out 0.3s;
    &.hide-search {
      right: -100%;
      transition: ease-in-out 0.3s;
    }
    .search-close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 28px;
      cursor: pointer;
    }
  }
  &.fix-nav {
    position: fixed;
    z-index: 100;
    top: -55px;
    background-color: rgba(0, 0, 0, 0.8);
    .search-container {
      top: 53px;
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
  }
  &.hide-logo {
    background-color: rgba(0, 0, 0, 0.9);
  }
  .logo-container {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .language-box {
      padding-left: 20px;
    }
    .top-logo {
      width: 250px;
      cursor: pointer;
    }
    .icon-box {
      &.fix-icon {
        position: fixed;
        top: 15px;
        right: 0;
        z-index: 10;
      }
      padding-right: 20px;
      .cart-icon {
        display: inline-block;
        cursor: pointer;
        position: relative;
        .red-point {
          width: 6px;
          height: 6px;
          border-radius: 3px;
          position: absolute;
          z-index: 4;
          left: 8px;
          background-color: #f00;
        }
      }
      .cart-detail {
        position: absolute;
        right: 0px;
        top: 40px;
        width: 300px;
        min-height: 200px;
        background-color: #efefef;
        box-shadow: 1px 1px 9px rgba(0, 0, 0, 0.2);
        .title {
          font-size: 16px;
          text-align: center;
          padding: 10px 0;
          color: #555;
          border-bottom: 1px #ddd solid;
        }
        .empty-cart {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #333;
          span {
            margin-top: 60px;
          }
        }
        .content {
          margin: 10px 20px;
          .total-price {
            padding: 10px 5px;
            color: #555;
            text-align: right;
          }
          ul {
            max-height: 200px;
            overflow-y: auto;
            li {
              display: flex;
              margin: 10px 0;
              justify-content: space-between;
              align-items: flex-start;
              min-height: 100px;
              border-bottom: 1px #ccc solid;
              .item-thumb {
                width: 80px;
                height: 80px;
                img {
                  width: 80px;
                  height: 80px;
                }
              }
              .item-profile {
                width: 150px;
                color: #666;
                h4 {
                  color: #333;
                }
                p {
                  line-height: 200%;
                  &.price-icon {
                    font-size: 18px;
                  }
                  &.item-num {
                    padding-left: 5px;
                  }
                }
              }
            }
          }
        }
      }
      .user-info {
        position: relative;
        cursor: pointer;
        .avatar {
          display: block;
          position: absolute;
          left: -30px;
          top: -6px;
          width: 24px;
          height: 24px;
          border-radius: 12px;
          background-color: #fff;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .more-info {
          position: absolute;
          right: 0;
          top: 30px;
          display: inline-block;
          width: 100px;
          height: 100px;
        }
      }
    }
  }
  .nav-container {
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    span {
      padding: 0 16px;
      position: relative;
      color: #efefef;
      &:hover {
        color: #efefef;
      }
      &.current {
        color: #efefef;
        &:after {
          position: absolute;
          left: calc(50% - 3px);
          top: 17px;
          content: "";
          width: 0;
          height: 0;
          border-width: 4px;
          border-style: solid;
          border-color: #ccc transparent transparent transparent;
        }
      }
    }
  }
}
.select-language li {
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  a {
    color: #555;
  }
  &:hover {
    background-color: #ddd;
  }
}
/deep/ .el-input .el-input__inner {
  border-radius: 0;
}
/deep/ .el-button.el-button--mini {
  padding: 8px 20px;
}
</style>

