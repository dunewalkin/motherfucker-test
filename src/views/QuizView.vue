<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import questions from '@/data/questions.json' 

const { t, locale } = useI18n()
const router = useRouter()
const quizStore = useQuizStore()

const currentIndex = ref(0)
const answers = ref(Array(questions.length).fill(null))

const question = computed(() => questions[currentIndex.value])

function selectAnswer(optionId) {
  answers.value[currentIndex.value] = optionId
}

function next() {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  } else {
    quizStore.setAnswers(answers.value)
    router.push({ name: 'result' })
  }
}

function back() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    router.push('/')
  }
}
</script>

<template>
   <main class="main-wrapper">
      <section class="quiz-wrapper">
         <div class="header-wrapper">
            <h1 class="header-l" v-html="question.text[locale]"></h1>
         </div>
         <div class="flexbox">
            <div class="image-wrapper">
               <img :src="question.image" alt="question image" />
            </div>
            <div class="answers-wrapper">
               <ul>
                  <li v-for="(opt, index) in question.options" :key="opt.id">
                     <button
                        type="button"
                        class="quiz-option-btn"
                        :class="{ selected: answers[currentIndex] === opt.id }"
                        @click="selectAnswer(opt.id)"
                     >
                        <span class="option-letter">
                        {{ String.fromCharCode(65 + index) }}
                        </span>
                        {{ opt.text[locale] }}
                     </button>
                  </li>

                  <div class="nav-buttons">
                     <button @click="back" class="round-btn-previous"></button>
                     <button @click="next" :disabled="!answers[currentIndex]" class="round-btn-next"></button>
                  </div>
               </ul>
            </div>
         </div>
      </section>
   </main>

</template>

<style lang="scss" scoped>
   .quiz-wrapper {
      max-width: 83.6875rem;
      text-align: center;
      margin-top: 8rem;

      @include flexbox(column, start, center, 0);

      @include mq(small) {
         margin-top: 8rem;
      }
   }

   .header-wrapper {
      @include mq(small) {
         padding-inline: 0.5rem;
      }
   }

   .flexbox {
      margin-top: 3.12rem;
      @include flexbox(row, center, start, 1.88rem);
      gap: 1.88rem;
      align-items: stretch;

      @include mq(small) {
         margin-top: 2.5rem;
         @include flexbox(column, center, start, 0.62rem);
         padding-inline: 1.2rem;
      }

      .answers-wrapper {
         width: 100%;
      }

      ul {
         @include flexbox(column, start, start, 1.88rem);

         @include mq(small) {
            @include flexbox(column, center, center, 0.62rem);
         }
      }

      li {
         @include mq(small) {
            width: 100%;
         }
      }

      .quiz-option-btn {
         border: none;
         padding: 0.625rem;
         @include flexbox(row, start, center, 0.625rem);
         background-color: rgba(255, 255, 255, 0.20);
         border-radius: 3.4375rem;
         color: var(--white-100);
         font-family: "CeraPro";
         font-size: 1.5rem;
         font-weight: 500;
         line-height: 120%;
         text-transform: uppercase;
         text-align: left;

         @include mq(small) {
            width: 100%;
            padding: 0.37rem;
            font-size: 0.875rem;
         }

         .option-letter {
            @include width-height(2.0625rem, 2.0625rem);
            border-radius: 50%;
            border: 2px solid var(--white-100);
            background-color: transparent;
            font-family: "CeraPro";
            color: var(--white-100);
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            flex-shrink: 0;

            @include mq(small) {
               @include width-height(1.22881rem, 1.22881rem);
               font-size: 0.875rem;
               border: 1.192px solid var(--white-100);

            }
         }

         &:hover {
            background-color: rgba(255, 255, 255, 0.50);      
         }

         &.selected {
            background-color: var(--white-100);
            color: var(--blue-100);

            .option-letter {
               border: 2px solid var(--blue-100);
               color: var(--blue-100);
            }
         }
      }

      .round-btn-next {

         &:hover {
            background-image: url('/icons/next-arrow-hover.svg');
         }
      }

      .round-btn-previous {

         &:hover {
            background-image: url('/icons/previous-arrow-hover.svg');
         }
      }

   }

   .flexbox > * {
      flex: 1;  
   }

   .image-wrapper {
      aspect-ratio: 563 / 381;
      max-width: 35.1875rem;
      border-radius: 1.25rem;
      overflow: hidden;

      @include mq(small) {
         aspect-ratio: 352.71/222.08;
         border-radius: 0.625rem;
      }
   }

   .image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1.25rem;
      display: block;
   }

   .nav-buttons {
      @include flexbox(row, center, center, 1.25rem);


      @include mq(small) {
         margin-bottom: 2rem;
      }
   }

   ::v-deep(.accent) {
      @include mq(small) {
         font-size: 1.25rem;
         letter-spacing: 0.0125rem;
      }
   }
   
</style>
