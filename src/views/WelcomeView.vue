<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()

function startQuiz() {
  router.push('/quiz')
}
</script>

<template>
   <main class="main-wrapper">
      <section class="welcome">
         <div class="welcome-container">
            <h1 class="header-xl" v-html="$t('welcome.title')"></h1>
            <div class="input-with-button">
               <input type="text" placeholder="напиши имя, сосунок">
               <button class="round-btn-next" @click="startQuiz">
               </button>
            </div>
            
         </div>
      </section>
   </main>
 </template>
 
 <style lang="scss" scoped>
 .welcome {
   display: flex;
   align-items: center;
   justify-content: center;
   padding-inline: 2.06rem;

   h1 {
      margin-top: 10rem;
      // margin-top: 5rem;
      max-width: 63rem;
      text-align: center;
   }

   input {
      width: 100%;
      max-width: 31rem;
      appearance: none;
      border: none;
      outline: none;
      background: rgba(255, 255, 255, 0.20);
      padding: 0.625rem 1rem;
      border-radius: 3.4375rem;
      font-family: "CeraPro";
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
      text-transform: uppercase;
      color: var(--white-100);
      text-align: center;

      @include mq(small) {
         width: 100%;
         font-size: 1.125rem;
      }

      &::placeholder {
         color: var(--white-100);
         font-family: "CeraPro";
         font-size: 1.5rem;
         text-transform: uppercase;

         @include mq(small) {
            font-size: 1.125rem;
         }
      }
   }
 }

   .input-with-button {
      width: 100%;
      margin-top: 5.69rem;
      @include flexbox(row, center, center, 0.62rem);

      @include mq(small) {
         margin-block: 5rem;
         @include flexbox(column, center, center, 0.62rem);
      }
   }
 </style>
 