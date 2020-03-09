<template>
  <div class="good-item">
    <div style="">
      <div class="good-img">
        <a @click="openProduct(msg)">
          <img v-lazy="msg.pic" :alt="msg.productName" :key="msg.productImageBig">
        </a>
      </div>
      <h6 class="good-title">{{msg.name}}</h6>
      <h3 class="sub-title ellipsis">{{msg.subTitle}}</h3>
      <div class="good-price pr">
        <div class="ds pa">
          <el-button @click="openProduct(msg)" style="margin: 0 5px">查看详情</el-button>
          <el-button type="primary" style="margin: 0 5px" @click="_addCart(msg.id, msg.name,msg.pic,msg.price)">加入购物车</el-button>
        </div>
        <p>
          <span style="font-size:14px">￥</span>
          {{Number(msg.price).toFixed(2)}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import YButton from "/components/YButton";
import { cartAdd } from "/api/goods.js";
import { mapMutations, mapState } from "vuex";
import { getStore } from "/utils/storage";
export default {
  props: {
    msg: {
      salePrice: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["ADD_CART", "ADD_ANIMATION", "SHOW_CART"]),
    goodsDetails(id) {
      this.$router.push({ path: "goodsDetails/productId=" + id });
    },
    openProduct(item) {
      // console.log(item)
      this.$router.push({
        path: "goodsDetails",
        query: {
          productId: item.id
        }
      });
      // window.open('//' + window.location.host + '/#/goodsDetails?productId=' + id)
    },
    _addCart(id, name, img, price, quantity) {
      // console.log(this.showMoveImg)
      if (!this.showMoveImg) {
        // 动画是否在运动
        // console.log(this.login);
        if (this.login) {
          // 登录了 直接存在用户名下
          // console.log(this.nickname);
          cartAdd({
            productId: id,
            quantity: quantity ? quantity : 1
          }).then(res => {
            // 并不重新请求数据
            this.ADD_CART({id: id, price: price, productName: name, productPic: img, quantity})
          });
        } else {
          // 未登录 vuex
          console.log(img)
          this.ADD_CART({id: id, price: price, productName: name, productPic: img, quantity})
        }
        // console.log(this.cartList)
        // 加入购物车动画
        var dom = event.target;
        // 获取点击的坐标
        let elLeft = dom.getBoundingClientRect().right + dom.offsetWidth / 2;
        let elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2;
        // 需要触发
        this.ADD_ANIMATION({
          moveShow: true,
          elLeft: elLeft,
          elTop: elTop,
          img: img
        });
        if (!this.showCart) {
          this.SHOW_CART({ showCart: true });
        }
      }
    }
  },
  computed: {
    ...mapState([
      "login",
      "showMoveImg",
      "showCart",
      "cartList",
      "userId",
      "nickname"
    ])
  },
  components: {
    YButton
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/style/mixin";
@import "../assets/style/theme";

.good-item {
  background: #fff;
  width: 25%;
  transition: all 0.5s;
  height: 430px;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 1px 1px 20px #999;
    .good-price p {
      display: none;
    }
    .ds {
      display: flex;
    }
  }
  .ds {
    @extend %block-center;
    width: 100%;
    display: none;
  }

  .good-img {
    img {
      margin: 50px auto 10px;
      @include wh(206px);
      display: block;
    }
  }
  .good-price {
    margin: 15px 0;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #d44d44;
    font-family: Arial;
    font-size: 18px;
    font-weight: 700;
  }
  .good-title {
    height: 38px;
    line-height: 1.2;
    font-size: 16px;
    color: #424242;
    margin: 0 auto;
    padding: 0 14px;
    text-align: center;
    overflow: hidden;
  }
  h3 {
    text-align: center;
    line-height: 1.2;
    font-size: 12px;
    color: #d0d0d0;
    padding: 10px;
  }
}
</style>
