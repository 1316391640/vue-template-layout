<template>
  <div>
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      v-model:openKeys="state.openKeys"
      theme="dark"
      mode="inline"
      :items="state.items"
      @click="state.toPath"
    />
  </div>
</template>

<script setup>
  import { computed, reactive, h, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import * as icons from '@ant-design/icons-vue'
  import routers from '@/router/asyncRouter'
  const state = reactive({
    router: useRouter(),
    route: useRoute(),
    selectedKeys: [],
    openKeys: [],
    items: computed(() => {
      return state.getItems(routers)
    }),
    getItems: (routes) => {
      if (routes instanceof Array) {
        return routes.map((route) => {
          if (route.children) {
            return {
              key: route.name,
              icon: () => h(icons[route.meta.icon]),
              label: route.meta.title,
              title: route.meta.title,
              children: state.getItems(route.children),
            }
          } else {
            return {
              key: route.name,
              icon: () => h(icons[route.meta.icon]),
              label: route.meta.title,
              title: route.meta.title,
            }
          }
        })
      } else {
        return []
      }
    },
    toPath: ({ keyPath }) => {
      state.router.push(`/${keyPath.join('/')}`)
    },
  })
  watch(
    () => state.route.path,
    () => {
      const thisPath = state.route.path.split('/')
      thisPath.shift()
      state.selectedKeys = thisPath
      state.openKeys = [thisPath[0]]
    },
    { immediate: true },
  )
</script>

<style lang="scss" scoped></style>
