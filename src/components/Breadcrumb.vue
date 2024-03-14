<template>
  <div :style="{ margin: '12px 16px 0px' }">
    <a-breadcrumb>
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <template v-for="(item, index) in state.items" :key="item.name">
        <a-breadcrumb-item v-if="state.itemLength > index">
          <a @click.prevent="state.toPath(item.path)">{{ item.name }}</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-else>{{ item.name }}</a-breadcrumb-item>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script setup>
  import { computed, reactive, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  const state = reactive({
    router: useRouter(),
    route: useRoute(),
    items: [],
    itemLength: computed(() => state.items.length - 1),
    getItems: (matcheds) => {
      return matcheds.reduce((array, nextValue) => {
        if (nextValue.path === '/') {
          return array
        } else {
          array.push({
            path: nextValue.path,
            name: nextValue.name,
          })
          return array
        }
      }, [])
    },
    toPath: (path) => {
      state.router.push(path)
    },
  })
  watch(
    () => state.route.path,
    () => {
      state.items = state.getItems(state.route.matched)
    },
    { immediate: true },
  )
</script>
