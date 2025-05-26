<template>
  <div class="demo">
    <img :src="logoUrl">
    <h1>Hello {{ props.message }} ! (编辑模式)</h1>
  </div>
</template>

<script setup lang="ts">

// 静态引入public目录下的资源地址
// 资源引入方式1：
// import logoUrl from "../public/logo.svg";

// 资源引入方式2：
const logoUrl = `${__metav_public_path__}/logo.svg`

const emits = defineEmits({
  change: (value: string) => true
})


const props = defineProps({
  message: {
    type: String,
    default: "MetaV",
    mapping: true,
    expose: true,
    setter: 'text',
    title: "示例属性"
  }
})

</script>

<style lang="less" scoped>
.demo {
  width: 100%;
  height: 100%;
  text-align: center;
  min-height: 20px;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
