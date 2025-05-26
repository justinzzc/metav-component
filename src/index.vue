<template>
  <div class="demo">
    <img :src="logoUrl" @click="emits('imgClick', { message })">
    <h1>Hello {{ message }} !</h1>
  </div>
</template>

<script setup lang="ts">

// 静态引入public目录下的资源地址
// 资源引入方式1：
// import logoUrl from "../public/logo.svg";

import { ref } from 'vue';

// 资源引入方式2：
const logoUrl = `${__metav_public_path__}/logo.svg`;


const emits = defineEmits({
  imgClick: (value: { message: string }) => true
})


const props = defineProps({
  message: {
    type: String,
    default: "MetaV",
    //用于显示的标题名称
    title: "示例属性message",
    //是否需要出现在数据映射中
    mapping: true,
    //是否需要被回调读取
    expose: true,
    //设置器类型
    setter: 'text',

  }
})

const message = ref(props.message);

defineExpose({
  changeMessage(msg: string) {
    message.value = msg;
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
