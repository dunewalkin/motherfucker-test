<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userName = ref('')
const isInputError = ref(false)

function startQuiz() {
  if (!userName.value.trim()) {
    isInputError.value = true
    return
  }
  
  isInputError.value = false
  router.push('/quiz')
}

function handleInputChange() {
  if (userName.value.trim()) {
    isInputError.value = false
  }
}

function clearInput() {
  userName.value = ''
}
</script>

<template>
  <main class="main-wrapper">
    <section class="welcome">
      <div class="welcome-container">
        <h1 class="header-xl" v-html="$t('welcome.title')"></h1>
        <div class="input-with-button">
         <div class="input-wrapper">
            <button 
               v-if="userName.length > 0"
               class="clear-btn"
               @click="clearInput">
               <img src="/icons/clear-icon.svg" alt="Clear icon">
            </button>
            <input
            v-model="userName"
            :class="['welcome-input', { 'error': isInputError }]"
            type="text"
            placeholder="напиши имя, сосунок"
            @input="handleInputChange"
            >
         </div>
           
          <button
            :class="['round-btn-next', { 'error': isInputError }]"
            @click="startQuiz"
          ></button>
        </div>
        <div class="input-wrapper">
    <div
      class="custom-input"
      contenteditable
      ref="editable"
      @input="onCustomInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
    ></div>
    <span
      v-if="isFocused"
      class="custom-caret"
      :style="{ left: caretLeft + 'px' }"
    ></span>
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
      max-width: 63rem;
      text-align: center;
   }

   .input-with-button {
      width: 100%;
      margin-top: 5.69rem;
      @include flexbox(row, center, center, 0.62rem);

      @include mq(small) {
         margin-block: 5rem;
         @include flexbox(column, center, center, 0.62rem);
      }

      .input-wrapper {
         width: 100%;
         max-width: 31rem;
         position: relative;;

         &:hover {
         .welcome-input {
            border: 1px solid rgba(255, 255, 255, 0.40);

            &::placeholder {
               opacity: 0.2;
            }
         }

         ~ .round-btn-next:not(.error) {
            background-image: url('/icons/next-arrow-hover.svg');
         }
         }

         .clear-btn {
            position: absolute;
            @include width-height(1.25rem, 1.25rem);
            top: 50%;
            right: 2rem;
            transform: translateY(-50%);
            background-color: transparent;
            border: none; 
         }
      }
   }

   .welcome-input {
      width: 100%;
      //  max-width: 31rem;
      appearance: none;
      border: none;
      outline: none;
      background: rgba(255, 255, 255, 0.20);
      padding: 0.625rem 1.88rem;
      border-radius: 3.4375rem;
      font-family: "CeraPro";
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
      text-transform: uppercase;
      color: var(--white-100);
      text-align: center;
      transition: 0.3s ease;

      @include mq(small) {
         font-size: 1.125rem;
      }

      &::placeholder {
         color: var(--white-100);
         font-family: "CeraPro";
         font-size: 1.5rem;
         text-transform: uppercase;
         transition: opacity 0.2s;

         @include mq(small) {
            font-size: 1.125rem;
         }
      }

      &:focus {
         text-align: left;
         padding: 0.625rem 4.2rem 0.625rem 1.88rem;
      }

      &:focus::placeholder,
      &:hover:focus::placeholder {
         opacity: 0 !important;
      }

      &:hover {
         border: 1px solid rgba(255, 255, 255, 0.40);

         &::placeholder {
            opacity: 0.2;
         }
      }

      &.error:hover + .round-btn-next {
         background-image: url('/icons/error.svg');
      }
   }
}

.arrow-hover {
  fill: rgba(255, 255, 255, 0.50);
  backdrop-filter: blur(7.5px);
}
</style>
