<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
</template>

<style scoped>

</style>
