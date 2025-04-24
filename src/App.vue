<script setup>

</script>

<template>
   <header>
     <button @click="$i18n.locale = 'ru'">RU</button>
     <button @click="$i18n.locale = 'en'">EN</button>
   </header>
   <router-view />
 </template>

<style lang="scss" scoped>

</style>
