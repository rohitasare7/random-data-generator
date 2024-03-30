<script setup>
import Faker from './pages/Faker.vue';
import ToastList from './pages/components/ToastList.vue';
import Footer from './pages/components/Footer.vue';
import LightDarkModeSwitch from './pages/components/LightDarkModeSwitch.vue';
</script>

<template>
  <ToastList />
  <LightDarkModeSwitch />
  <Faker />
  <Footer />
</template>

<style scoped></style>
