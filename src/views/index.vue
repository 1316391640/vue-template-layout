<template>
  <a-layout style="height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo"></div>
      <Menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="
          background: #fff;
          padding: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div class="left">
          <Menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </div>
        <div class="right">
          <div style="margin-right: 10px">
            <a-button shape="circle" type="text" size="large" :icon="h(RedoOutlined)" />
            <a-button
              shape="circle"
              type="text"
              size="large"
              :icon="h(FullscreenOutlined)"
              @click="state.fullScreen"
            />
          </div>
          <div style="display: flex; align-items: center; font-size: 15px; color: #565656">
            <span>欢迎！</span>
            <a-avatar size="small" src="../assets/vue.svg" />
            <span style="margin-left: 5px">默认用户</span>
            <a-button type="link">退出</a-button>
          </div>
        </div>
      </a-layout-header>
      <Breadcrumb />
      <a-layout-content
        :style="{ margin: '12px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view v-if="state.isShow" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
  import { ref, h, reactive, nextTick } from 'vue'
  import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    RedoOutlined,
    FullscreenOutlined,
  } from '@ant-design/icons-vue'
  const collapsed = ref(false)
  const state = reactive({
    isShow: true,
    fullScreen: () => {
      const elem = document.documentElement
      if (document.fullscreenElement) {
        // 如果当前已经是全屏状态，则退出全屏
        document.exitFullscreen()
      } else {
        // 如果当前不是全屏状态，则进入全屏
        elem.requestFullscreen()
      }
    },
    refresh() {
      state.isShow = false
      nextTick(() => {
        state.isShow = true
      })
    },
  })
</script>
<style>
  .right {
    display: flex;
    align-items: center;
    padding: 0 5px 0 24px;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
</style>
