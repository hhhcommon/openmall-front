<template>
  <div class="filter-container">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="8" class="crumbs" v-if="!mobileMode">
        <ul>
          <li>女士</li>
          <li>手袋</li>
        </ul>
      </el-col>
      <el-col :span="8" :xs="24" class="filter">
        <el-row>
          <el-col
            :span="8"
            class="trans"
            @click="showFilter"
            :class="{'current': showFilterState == 1}"
          >
            <div @click="showFilter(1)">
              <span>
                分类
                <i class="el-icon-arrow-down"></i>
              </span>
            </div>
          </el-col>
          <el-col :span="8" class="trans" :class="{'current': showFilterState == 2}">
            <div @click="showFilter(2)">
              <span>
                筛选
                <i class="el-icon-arrow-down"></i>
              </span>
            </div>
          </el-col>
          <el-col :span="8" class="trans" :class="{'current': showFilterState == 3}">
            <div @click="showFilter(3)">
              <span>
                排序
                <i class="el-icon-arrow-down"></i>
              </span>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <transition name="el-zoom-in-top">
      <div
        class="filter-list"
        :style="{'width':filterWidth }"
        v-if="showFilterState== 1"
        @mouseleave="showFilterState=''"
      >
        <ul>
          <li>链条包&肩背包</li>
          <li>斜挎包</li>
          <li>迷你包</li>
          <li>珍稀皮革</li>
          <li>旅行箱包</li>
        </ul>
      </div>
    </transition>
    <transition name="el-zoom-in-top">
      <div
        class="full-filter-list"
        :style="{'width':fullFilterWidth }"
        v-if="showFilterState== 2"
        @mouseleave="showFilterState=''"
      >
        <el-row style="margin: 0 24px; max-width: 800px; margin: 0 auto">
          <el-col :span="10" :xs="24">
            <div class="filter-ul">
              <h3>颜色</h3>
              <div class="inner">
                <el-checkbox-group v-model="checkList">
                  <el-row>
                    <el-col :span="10" :xs="24" class="xs-border">
                      <el-checkbox label="红色"></el-checkbox>
                    </el-col>
                    <el-col :span="10" :xs="24" class="xs-border">
                      <el-checkbox label="绿色"></el-checkbox>
                    </el-col>
                    <el-col :span="10" :xs="24" class="xs-border">
                      <el-checkbox label="蓝色"></el-checkbox>
                    </el-col>
                    <el-col :span="10" :xs="24" class="xs-border">
                      <el-checkbox label="白色"></el-checkbox>
                    </el-col>
                    <el-col :span="10" :xs="24" class="xs-border">
                      <el-checkbox label="其他"></el-checkbox>
                    </el-col>
                    <el-col :span="10" :xs="24" class="xs-border">
                      <el-checkbox label="红色"></el-checkbox>
                    </el-col>
                    <el-col :span="10" :xs="24" class="xs-border">
                      <el-checkbox label="绿色"></el-checkbox>
                    </el-col>
                    <el-col :span="10" :xs="24" class="xs-border">
                      <el-checkbox label="蓝色"></el-checkbox>
                    </el-col>
                    <el-col :span="10" :xs="24" class="xs-border">
                      <el-checkbox label="白色"></el-checkbox>
                    </el-col>
                    <el-col :span="10" :xs="24" class="xs-border">
                      <el-checkbox label="其他"></el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </div>
          </el-col>
          <el-col :span="7" :xs="24">
            <div class="filter-ul">
              <h3>材质</h3>
              <el-row>
                <el-col :span="24" class="xs-border">
                  <el-checkbox label="绿色"></el-checkbox>
                </el-col>
                <el-col :span="24" class="xs-border">
                  <el-checkbox label="蓝色"></el-checkbox>
                </el-col>
                <el-col :span="24" class="xs-border">
                  <el-checkbox label="白色"></el-checkbox>
                </el-col>
                <el-col :span="24" class="xs-border">
                  <el-checkbox label="其他"></el-checkbox>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="7" :xs="24">
            <div class="filter-ul">
              <h3>尺寸</h3>
              <el-row>
                <el-col :span="24" class="xs-border">
                  <el-checkbox label="XL"></el-checkbox>
                </el-col>
                <el-col :span="24" class="xs-border">
                  <el-checkbox label="L"></el-checkbox>
                </el-col>
                <el-col :span="24" class="xs-border">
                  <el-checkbox label="S"></el-checkbox>
                </el-col>
                <el-col :span="24" class="xs-border">
                  <el-checkbox label="XS"></el-checkbox>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div class="filter-footer">
          <p>您可以选择多个选项</p>
          <p>
            <el-button type="primary">确 定</el-button>
            <el-button plain>取 消</el-button>
          </p>
        </div>
      </div>
    </transition>
    <transition name="el-zoom-in-top">
      <div
        class="filter-list"
        :style="{'width':filterWidth }"
        v-if="showFilterState== 3"
        @mouseleave="showFilterState=''"
      >
        <ul>
          <li>最新商品</li>
          <li>发部时间正序排列</li>
          <li>发部时间倒序排列</li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "filterbox",
  data() {
    return {
      screenWidth: 1920,
      showFilterState: "",
      checkList: [] // 已选择
    };
  },
  computed: {
    mobileMode() {
      return this.screenWidth < 768;
    },
    filterWidth() {
      if (this.screenWidth < 768) {
        return this.screenWidth - 48 + "px";
      } else {
        return "255px";
      }
    },
    fullFilterWidth() {
      return this.screenWidth + "px";
    }
  },
  mounted() {
    const that = this;
    // console.log(document.body.clientWidth)
    that.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      return (() => {
        that.screenWidth = document.body.clientWidth;
      })();
    };
  },
  methods: {
    showFilter(state) {
      this.showFilterState = state;
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .xs-border {
    border-bottom: 1px #efefef solid;
  }
}
.filter-list {
  position: absolute;
  right: 0;
  top: 58px;
  width: 200px;
  ul {
    display: block;
    li {
      width: 100%;
      height: 42px;
      padding: 0 20px;
      background-color: #fff;
      border: 1px #efefef solid;
      border-top: none;
      line-height: 42px;
      text-align: left;
    }
  }
}
.full-filter-list {
  position: absolute;
  z-index: 9999;
  right: 0;
  top: 58px;
  width: 100%;
  min-height: 100px;
  background-color: #fff;
  .filter-ul {
    padding: 12px;
    h3 {
      font-size: 14px;
      font-weight: normal;
      color: #999;
    }
    /deep/ {
      .el-checkbox-group {
        line-height: 50px;
        .el-checkbox + .el-checkbox {
          margin-right: 0;
          margin-left: 0;
        }
        .el-checkbox .el-checkbox__label {
          padding-left: 10px;
        }
      }
      .el-checkbox__input .el-checkbox__inner {
        border-radius: 0;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner {
        border-color: #555;
        background-color: #fff;
        &::after {
          border-right: 1px #555 solid;
          border-bottom: 1px #555 solid;
        }
      }
    }
  }
}
.filter-container {
  padding: 0 24px;
  height: 58px;
  line-height: 58px;
  background-color: #fff;
  border-bottom: 1px #efefef solid;
  font-size: 12px;
  position: relative;
  .crumbs {
    ul {
      li {
        float: left;
        padding: 0 24px;
        color: #999;
        a {
          color: #666;
        }
      }
    }
  }
  .filter {
    position: relative;
    .el-row {
      .el-col {
        display: block;
        padding: 0 36px 0 24px;
        color: #666;
        border-right: 1px #efefef solid;
        position: relative;
        cursor: pointer;
        &:hover {
          background-color: #efefef;
        }
        &.current {
          background-color: #efefef;
          span i {
            transform: rotate(180deg);
            transition: ease-in-out 0.2s;
          }
        }
        span {
          position: relative;
          i {
            position: absolute;
            display: block;
            width: 10px;
            height: 8px;
            line-height: 8px;
            top: 2px;
            right: -15px;
            transition: ease-in-out 0.2s;
          }
        }
      }
    }
  }
}
.filter-footer {
  border-top: 1px #efefef solid;
  padding: 24px 0 40px;
  text-align: center;
  p {
    line-height: 48px;
  }
  /deep/ {
    .el-button {
      padding: 12px 30px;
      border-radius: 0;
      &.el-button--primary {
        background-color: #1b1b1b;
        border: 1px #1b1b1b solid;
        &:hover {
          background-color: #454545;
        }
      }
      &.is-plain {
        border: 1px #1b1b1b solid;
        &:hover {
          color: #1b1b1b;
        }
      }
    }
  }
}
</style>

