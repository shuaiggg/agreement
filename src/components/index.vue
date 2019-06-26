<template>
  <div>
    <el-container>
      <el-header>
        <div class="logo">logo</div>
        <div class="collapseChange">
          <i :class="[isCollapse? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="collapseChange"></i>
        </div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item
            v-for="(item,index) in breadcrumb"
            :key="index"
            :to="{ path: item.path }"
          >{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="menu">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              用户名：{{username}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="quit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="bot">
        <el-aside width="auto">
          <el-row>
            <el-col :span="24">
              <el-menu
                @select="selectIndex"
                unique-opened
                :default-active="this.$route.path"
                :router="true"
                :collapse="isCollapse"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <el-menu-item v-for="(item,index) in navigation" :key="index" :index="item.path">
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.name}}</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import oBanner from "@/assets/logo.png";
export default {
  data() {
    return {
      navigation: [
        {
          name: "签署列表",
          id: 1,
          icon: "el-icon-location",
          path: "/index/signedList"
        },
        {
          name: "分类管理",
          id: 2,
          icon: "el-icon-location",
          path: "/index/classify"
        },
        {
          name: "协议管理",
          id: 3,
          icon: "el-icon-location",
          path: "/index/agreement"
        },
        {
          name: "签章管理",
          id: 4,
          icon: "el-icon-location",
          path: "/index/signature"
        }
      ],
      username: "",
      breadcrumb: [],
      isCollapse: false,
      clickPath: "",
      tabsVal: "",
      tabsList: [
        {
          title: "图表",
          name: "/backstage/echarts"
        }
      ]
    };
  },
  created() {
    this.breadcrumb = this.$route.matched.filter(item => item);
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.breadcrumb = this.$route.matched.filter(item => item);
      },
      deep: true
    }
  },
  mounted() {
    this.username = localStorage.getItem("username");
  },
  methods: {
    selectIndex(e, a, b) {
      var flag = false;
      this.tabsList.map(item => {
        if (item.name == e) {
          flag = true;
        }
      });
      if (flag) return;
      this.tabsList.push({ title: b.$el.innerText, name: e });
    },
    collapseChange() {
      this.isCollapse = !this.isCollapse;
    },
    newTabsLists(e) {
      this.tabsList = e;
    },
    handleCommand(command) {
        this.$message('click on item ' + command);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-footer {
  background-color: #545b64;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-tabs__content {
  padding: 0 !important;
}
.el-header {
  padding: 0;
  text-align: left;
  line-height: 60px;
  .logo {
    width: 200px;
    text-align: center;
    float: left;
    background: #84b5f5;
    margin-right: 20px;
  }
  .breadcrumb {
    width: auto;
    display: inline-block;
    line-height: 60px;
  }
  .menu {
    float: right;
    margin-right: 20px;
  }
  .collapseChange {
    float: left;
    font-size: 30px;
    line-height: 60px;
    margin-right: 10px;
  }
}
.el-aside {
  color: #333;
  text-align: left;
  background: #545c64;
  line-height: 200px;
  &::-webkit-scrollbar {
    display: none;
  }
  .el-menu {
    width: 60px;
    height: 100%;
    overflow: hidden;
    border: 0;
    .el-menu-item {
      width: 100%;
    }
    .el-menu--inline li {
      background: #5d6c7b !important;
    }
  }
}
.bot {
  height: calc(100vh - 60px);
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>

