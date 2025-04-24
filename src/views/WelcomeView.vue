<template>
   <section class="welcome">
     <div class="welcome__container">
       <h1 class="welcome__title">{{ $t('welcome.title') }}</h1>
       <button class="welcome__start-button" @click="startQuiz">
         клик
       </button>
     </div>
   </section>
 </template>
 
 <script setup>
 import { useRouter } from 'vue-router'
 const router = useRouter()
 
 function startQuiz() {
   router.push('/quiz')
 }
 </script>
 
 <style scoped lang="scss">
 .welcome {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100vh;
   background: #f2f2f2;

 }
 </style>
 