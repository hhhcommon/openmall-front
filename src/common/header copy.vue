<template>
  <div class="header-box">
    <div>
      <header class="w">
        <div class="w-box">
          <div class="nav-logo">
            <h1 @click="changePage(-1)">
              <router-link to="/" :title="$t('page.index.title')">{{$t('page.index.title')}}</router-link>
            </h1>
          </div>
          <div class="right-box">
            <div class="nav-list">
              <el-autocomplete
                :placeholder="$t('common.search_input_placeholder')"
                icon="search"
                v-model="input"
                minlength="1"
                maxlength="100"
                :fetch-suggestions="querySearchAsync"
                @select="handleSelect"
                :on-icon-click="handleIconClick"
                @keydown.enter.native="handleIconClick"
              ></el-autocomplete>
              <el-dropdown style="margin-left: 20px;" @command="handleCommand">
                <span class="el-dropdown-link" style="line-height: 100px">
                  {{language}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="jp">日本語</el-dropdown-item>
                  <el-dropdown-item command="en">English</el-dropdown-item>
                  <el-dropdown-item command="cn">简体中文</el-dropdown-item>
                  <el-dropdown-item command="hk">繁體中文</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="nav-aside" ref="aside" :class="{fixed:st}">
              <div class="user pr">
                <router-link to="/user">{{$t('public.header.user_center')}}</router-link>
                <!--用户信息显示-->
                <div class="nav-user-wrapper pa" v-if="login">
                  <div class="nav-user-list">
                    <ul>
                      <!--头像-->
                      <li class="nav-user-avatar">
                        <div>
                          <span
                            class="avatar"
                            :style="{backgroundImage:'url('+userInfo.info.avatar+')'}"
                          ></span>
                        </div>
                        <p class="name">{{userInfo.info.username}}</p>
                      </li>
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
                        <router-link to="/user/support">{{$t('public.header.user_support')}}</router-link>
                      </li>
                      <li>
                        <router-link to="/user/coupon">{{$t('public.header.user_coupon')}}</router-link>
                      </li>
                      <li>
                        <a href="javascript:;" @click="_loginOut">{{$t('public.header.logout')}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                class="shop pr"
                @mouseover="cartShowState(true)"
                @mouseout="cartShowState(false)"
                ref="positionMsg"
              >
                <router-link to="/cart"></router-link>
                <span class="cart-num">
                  <i class="num" :class="{no:totalNum <= 0,move_in_cart:receiveInCart}">{{totalNum}}</i>
                </span>
                <!--购物车显示块-->
                <div class="nav-user-wrapper pa active" v-show="showCart">
                  <div class="nav-user-list">
                    <div class="full" v-show="totalNum">
                      <!--购物列表-->
                      <div class="nav-cart-items">
                        <ul>
                          <li class="clearfix" v-for="(item,i) in cartList" :key="i">
                            <div class="cart-item">
                              <div class="cart-item-inner">
                                <a @click="openProduct(item.productId)">
                                  <div class="item-thumb">
                                    <img :src="item.productImg">
                                  </div>
                                  <div class="item-desc">
                                    <div class="cart-cell">
                                      <h4>
                                        <a href="" v-text="item.productName"></a>
                                      </h4>
                                      <!-- <p class="attrs"><span>白色</span></p> -->
                                      <h6>
                                        <span class="price-icon">{{$t('common.money_sign')}}</span>
                                        <span class="price-num">{{item.salePrice}}</span>
                                        <span class="item-num">x {{item.productNum}}</span>
                                      </h6>
                                    </div>
                                  </div>
                                </a>
                                <div
                                  class="del-btn del"
                                  @click="delGoods(item.productId)"
                                >{{$t('common.delete')}}</div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!--总件数-->
                      <div class="nav-cart-total">
                        <p>
                          共
                          <strong>{{totalNum}}</strong>
                          {{$t('common.jian')}}{{$t('common.goods')}}
                        </p>
                        <h5>
                          {{$t('common.total')}}：
                          <span
                            class="price-icon"
                          >{{$t('common.money_sign')}}</span>
                          <span class="price-num">{{totalPrice}}</span>
                        </h5>
                        <h6>
                          <y-button
                            classStyle="main-btn"
                            style="height: 40px;width: 100%;margin: 0;color: #fff;font-size: 14px;line-height: 38px"
                            text="去购物车"
                            @btnClick="toCart"
                          ></y-button>
                        </h6>
                      </div>
                    </div>
                    <div
                      v-show="!totalNum"
                      style="height: 313px;text-align: center"
                      class="cart-con"
                    >
                      <p>{{$t('public.header.cart_empty_notice')}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- <slot name="nav">
        <div class="nav-sub" :class="{fixed:st}">
          <div class="nav-sub-bg"></div>
          <div class="nav-sub-wrapper" :class="{fixed:st}">
            <div class="w">
              <ul class="nav-list2">
                <li>
                  <router-link to="/">
                    <a @click="changGoods(-1)" :class="{active:choosePage===-1}">新入荷</a>
                  </router-link>
                </li>
                <li v-for="(item,i) in navList" :key="i">
                  <a @click="changGoods(i, item)" :class="{active:i===choosePage}">{{item.label}}</a>
                </li>
              </ul>
              <div></div>
            </div>
          </div>
        </div>
      </slot>-->
    </div>
  </div>
</template>
<script>
import YButton from "/components/YButton";
import { mapMutations, mapState } from "vuex";
import { getCartList, cartDel, getQuickSearch } from "/api/goods";
import { loginOut, navList } from "/api/index";
import { setStore, getStore, removeStore } from "/utils/storage";
// import store from '../store/'
export default {
  data() {
    return {
      user: {},
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
      navList: [
        {
          label: "手袋",
          value: 1
        },
        {
          label: "配饰",
          value: 2
        },
        {
          label: "生活",
          value: 3
        },
        {
          label: "购物指南",
          value: 4
        },
        {
          label: "回收寄卖",
          value: 5
        },
        {
          label: "报价",
          value: 6
        }
      ]
    };
  },
  computed: {
    ...mapState(["cartList", "login", "receiveInCart", "showCart", "userInfo"]),
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
    // 计算价格
    totalPrice() {
      var totalPrice = 0;
      this.cartList &&
        this.cartList.forEach(item => {
          totalPrice += item.productNum * item.salePrice;
        });
      return totalPrice;
    },
    // 计算数量
    totalNum() {
      var totalNum = 0;
      this.cartList &&
        this.cartList.forEach(item => {
          totalNum += item.productNum;
        });
      return totalNum;
    }
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
      getCartList({ userId: getStore("userId") })
        .then(res => {
          if (res.success === true) {
            setStore("buyCart", res.result);
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
      if (
        this.$route.path === "/goods" ||
        this.$route.path === "/home" ||
        this.$route.path === "/goodsDetails" ||
        this.$route.path === "/thanks"
      ) {
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
      } else {
        return;
      }
    },
    // 退出登陆
    _loginOut() {
      loginOut({
        params: {
          token: this.token
        }
      }).then(res => {
        removeStore("token");
        removeStore("userId");
        removeStore("userInfo");
        removeStore("buyCart");
        window.location.href = "/";
      });
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
      navList().then(res => {
        this.navList = res.result;
      });
    }
  },
  mounted() {
    this._getNavList();
    console.log(this.cartList)
    this.token = getStore("token");
    if (this.login) {
      this._getCartList();
    } else {
      this.INIT_BUYCART();
    }
    
    this.navFixed();
    this.getPage();
    window.addEventListener("scroll", this.navFixed);
    window.addEventListener("resize", this.navFixed);
    if (typeof this.$route.query.key !== undefined) {
      this.input = this.$route.query.key;
    }
  },
  components: {
    YButton
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/style/theme";
@import "../assets/style/mixin";

.move_in_cart {
  animation: mymove 0.5s ease-in-out;
}

@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@-moz-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@-o-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.header-box {
  background-image: -webkit-linear-gradient(
    rgba(0, 0, 0, 0.5) 0,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.5) 0,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  width: 100%;
  transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
  }
}

header {
  height: 100px;
  z-index: 30;
  position: relative;
}

.w-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  // position: relative;
  h1 {
    height: 100%;
    display: flex;
    align-items: center;
    > a {
      background: url(../assets/images/u54.png) no-repeat 50%;
      background-size: cover;
      display: block;
      @include wh(366px, 50px);
      text-indent: -9999px;
      background-position: 0 0;
    }
  }
  .nav-list {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 22px;
    .el-autocomplete {
      width: 305px;
    }
    a {
      width: 110px;
      color: #c8c8c8;
      display: block;
      font-size: 14px;
      padding: 0 25px;
      &:hover {
        color: #fff;
      }
    }
    a:nth-child(2) {
      // width: 5vw;
      margin-left: -10px;
    }
    // a:nth-child(3){
    //   width: 5vw;
    // }
  }
  .nav-aside {
    position: relative;
    &:before {
      background: #333;
      background: hsla(0, 0%, 100%, 0.2);
      content: " ";
      @include wh(1px, 13px);
      overflow: hidden;
      // position: absolute;
      display: flex;
      align-items: center;
      // top: 4px;
      left: 0;
    }
    &.fixed {
      width: 262px;
      position: fixed;
      left: 50%;
      top: 19px;
      margin-left: 451px;
      margin-top: 0;
      z-index: 32;
      top: -40px;
      -webkit-transform: translate3d(0, 59px, 0);
      transform: translate3d(0, 59px, 0);
      -webkit-transition: -webkit-transform 0.3s
        cubic-bezier(0.165, 0.84, 0.44, 1);
      transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      .user {
        &:hover {
          a:before {
            background-position: -215px 0;
          }
        }
      }
      .shop {
        &:hover {
          a:before {
            background-position: -210px -22px;
          }
        }
      }
    }
  }

  .right-box {
    display: flex;
  }
  .nav-aside {
    display: flex;
    align-items: center;
  }
  // 用户
  .user {
    margin-left: 41px;
    width: 36px;
    &:hover {
      a:before {
        background-position: -5px 0;
      }
      .nav-user-wrapper {
        top: 18px;
        visibility: visible;
        opacity: 1;
        -webkit-transition: opacity 0.15s ease-out;
        transition: opacity 0.15s ease-out;
      }
    }
    > a {
      position: relative;
      @include wh(36px, 20px);
      display: block;
      text-indent: -9999px;
      &:before {
        content: " ";
        position: absolute;
        left: 8px;
        top: 0;
        @include wh(20px);
        background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) -155px
          0;
        background-size: 240px 107px;
        transition: none;
      }
    }
    li + li {
      text-align: center;
      position: relative;
      border-top: 1px solid #f5f5f5;
      line-height: 44px;
      height: 44px;
      color: #616161;
      font-size: 12px;
      &:hover {
        background: #fafafa;
      }
      a {
        display: block;
        color: #616161;
      }
    }
    .nav-user-avatar {
      > div {
        position: relative;
        margin: 0 auto 8px;
        @include wh(46px);
        text-align: center;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border-radius: 50%;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
        }
        .avatar {
          border-radius: 50%;
          display: block;
          @include wh(100%);
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
      .name {
        margin-bottom: 16px;
        font-size: 12px;
        line-height: 1.5;
        text-align: center;
        color: #757575;
      }
    }
    .nav-user-wrapper {
      width: 168px;
      transform: translate(-50%);
      left: 50%;
    }
    .nav-user-list {
      width: 168px;
      &:before {
        left: 50%;
      }
    }
  }
  .shop {
    position: relative;
    float: left;
    margin-left: 21px;
    width: 61px;
    z-index: 99;
    &:hover {
      a:before {
        content: " ";
        background-position: 0 -22px;
      }
    }
    .nav-user-wrapper.active {
      top: 18px;
      visibility: visible;
      opacity: 1;
      -webkit-transition: opacity 0.15s ease-out;
      transition: opacity 0.15s ease-out;
    }
    > a {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      display: block;
      right: 0;
      z-index: 1;
      &:before {
        display: block;
        @include wh(30px, 100%);
        content: " ";
        background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png)
          0 -22px;
        background-size: 240px 107px;
        background-position: -150px -22px;
      }
    }
    .cart-num {
      position: relative;
      display: block;
      margin-left: 31px;
      margin-top: -1px;
      min-width: 30px;
      text-indent: 0;
      line-height: 20px;
      > i {
        background: #eb746b;
        background-image: -webkit-linear-gradient(#eb746b, #e25147);
        background-image: linear-gradient(#eb746b, #e25147);
        box-shadow: inset 0 0 1px hsla(0, 0%, 100%, 0.15),
          0 1px 2px hsla(0, 0%, 100%, 0.15);
        text-align: center;
        font-style: normal;
        display: inline-block;
        @include wh(20px);
        line-height: 20px;
        border-radius: 10px;
        color: #fff;
        font-size: 12px;
        &.no {
          background: #969696;
          background-image: -webkit-linear-gradient(#a4a4a4, #909090);
          background-image: linear-gradient(#a4a4a4, #909090);
          box-shadow: inset 0 0 1px #838383, 0 1px 2px #838383;
        }
      }
    }
    .nav-user-wrapper {
      right: 0;
      width: 360px;
      .nav-user-list {
        &:before {
          right: 34px;
        }
      }
    }
    .nav-user-list {
      padding: 0;
      width: 100%;
      .full {
        border-radius: 8px;
        overflow: hidden;
      }
      .nav-cart-items {
        max-height: 363px;
        overflow-x: hidden;
        overflow-y: auto;
      }
      .cart-item {
        height: 120px;
        width: 100%;
        overflow: hidden;
        border-top: 1px solid #f0f0f0;
        &:hover {
          background: #fcfcfc;
          .del {
            display: block;
          }
        }
      }
      li:first-child .cart-item:first-child {
        border-top: none;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
      }
      .cart-item-inner {
        padding: 20px;
        position: relative;
      }
      .item-thumb {
        position: relative;
        float: left;
        width: 80px;
        height: 80px;
        border-radius: 3px;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 2;
          border: 1px solid #f0f0f0;
          border: 0 solid transparent;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
          border-radius: 3px;
        }
        img {
          display: block;
          @include wh(80px, 80px);
          border-radius: 3px;
          overflow: hidden;
        }
      }
      .item-desc {
        margin-left: 98px;
        display: table;
        @include wh(205px, 80px);
        h4 {
          color: #000;
          width: 185px;
          overflow: hidden;
          word-break: keep-all;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          line-height: 16px;
          margin-bottom: 10px;
        }
        .attrs span {
          position: relative;
          display: inline-block;
          margin-right: 20px;
          font-size: 14px;
          line-height: 14px;
          color: #999;
        }
        .attrs span:last-child {
          margin-right: 0;
        }
        h6 {
          color: #cacaca;
          font-size: 12px;
          line-height: 14px;
          margin-top: 20px;
          span {
            display: inline-block;
            font-weight: 700;
            color: #cacaca;
          }
          .price-icon,
          .price-num {
            color: #d44d44;
          }
          .price-num {
            margin-left: 5px;
            font-size: 14px;
          }
          .item-num {
            margin-left: 10px;
          }
        }
      }
      .cart-cell {
        display: table-cell;
        vertical-align: middle;
      }
      .del {
        display: none;
        overflow: hidden;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .nav-cart-total {
      box-sizing: content-box;
      position: relative;
      padding: 20px;
      height: 40px;
      background: #fafafa;
      border-top: 1px solid #f0f0f0;
      border-radius: 0 0 8px 8px;
      box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.5),
        0 -3px 8px rgba(0, 0, 0, 0.04);
      background: -webkit-linear-gradient(#fafafa, #f5f5f5);
      background: linear-gradient(#fafafa, #f5f5f5);
      p {
        margin-bottom: 4px;
        line-height: 16px;
        font-size: 12px;
        color: #c1c1c1;
      }
      h5 {
        line-height: 20px;
        font-size: 14px;
        color: #6f6f6f;
        span {
          font-size: 18px;
          color: #de4037;
          display: inline-block;
          font-weight: 700;
        }
        span:first-child {
          font-size: 12px;
          margin-right: 5px;
        }
      }
      h6 {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 108px;
      }
    }
  }
}

@media (max-height: 780px) {
  .nav-cart-items {
    max-height: 423px !important;
  }
}

@media (max-height: 900px) {
  .nav-cart-items {
    max-height: 544px !important;
  }
}

@media (max-height: 1080px) {
  .nav-cart-items {
    max-height: 620px !important;
  }
}

// 用户信息弹出
.nav-user-wrapper {
  position: absolute;
  z-index: 30;
  padding-top: 18px;
  opacity: 0;
  visibility: hidden;
  top: -3000px;
  .nav-user-list {
    position: relative;
    padding-top: 20px;
    background: #fff;
    border: 1px solid #d6d6d6;
    border-color: rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    z-index: 10;
    &:before {
      position: absolute;
      content: " ";
      background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png)
        no-repeat -49px -43px;
      background-size: 240px 107px;
      @include wh(20px, 8px);
      top: -8px;
      margin-left: -10px;
    }
  }
}

.nav-sub {
  position: relative;
  z-index: 20;
  height: 90px;
  background: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  &.fixed {
    position: fixed;
    z-index: 21;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #dadada;
    background-image: -webkit-linear-gradient(#fff, #f1f1f1);
    background-image: linear-gradient(#fff, #f1f1f1);
  }
  .nav-sub-wrapper {
    padding: 31px 0;
    height: 90px;
    position: relative;
    &.fixed {
      padding: 0;
      height: 100%;
      display: flex;
      align-items: center;
    }
    &:after {
      content: " ";
      position: absolute;
      top: 89px;
      left: 50%;
      margin-left: -610px;
      width: 1220px;
      background: #000;
      height: 1px;
      display: none;
      opacity: 0;
      -webkit-transition: opacity 0.3s ease-in;
      transition: opacity 0.3s ease-in;
    }
  }
  .w {
    display: flex;
    justify-content: space-between;
  }
  .nav-list2 {
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
    height: 100%;
    li:first-child {
      padding-left: 0;
      a {
        padding-left: 10px;
      }
    }
    li {
      position: relative;
      float: left;
      padding-left: 2px;
      a {
        display: block;
        padding: 0 10px;
        color: #666;
        &.active {
          font-weight: bold;
        }
      }
      a:hover {
        color: #5683ea;
      }
    }
    li:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 13px;
      width: 2px;
      height: 2px;
      background: #bdbdbd;
    }
  }
}

@media (min-width: 1px) {
  .nav-sub .nav-sub-wrapper:after {
    display: block;
  }
}

.cart-con {
  /*display: flex;*/
  text-align: center;
  position: relative;
  p {
    padding-top: 185px;
    color: #333333;
    font-size: 16px;
  }
}

.cart-con:before {
  position: absolute;
  content: " ";
  left: 50%;
  transform: translate(-50%, -70%);
  top: 50%;
  width: 76px;
  height: 62px;
  background: url("/static/images/cart-empty-new.png") no-repeat;
  background-size: cover;
}
</style>

