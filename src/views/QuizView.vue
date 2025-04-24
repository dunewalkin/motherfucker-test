<!-- <script setup>
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
  console.log('✅ Answer selected:', answers.value)
}

function next() {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  } else {
    console.log('Final answers:', answers.value)
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

  <section class="quiz">
    <h2>{{ t('quiz.question', { num: currentIndex + 1 }) }}</h2>
    <p>{{ question.text[locale] }}</p>

    <ul>
  <li v-for="opt in question.options" :key="opt.id">
   <button
      type="button"
      :class="{ selected: answers[currentIndex] === opt.id }"
      @click="selectAnswer(opt.id)"
      >
      {{ opt.text[locale] }}
   </button>
  </li>
</ul>

    <div class="quiz__buttons">
      <button @click="back">← back</button>
      <button @click="next" :disabled="!answers[currentIndex]">
        next →
      </button>
    </div>
  </section>
</template>

<style scoped>

</style> -->


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
  console.log('✅ Answer selected:', answers.value)
}

function next() {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  } else {
    // Сохраняем ответы в store перед переходом на страницу результатов
    quizStore.setAnswers(answers.value)
    console.log('Final answers:', answers.value)
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
  <section class="quiz">
   <h2>{{ t('quiz.question', { num: question.id }) }}</h2>
    <p>{{ question.text[locale] }}</p>

    <ul>
      <li v-for="opt in question.options" :key="opt.id">
        <button
          type="button"
          :class="{ selected: answers[currentIndex] === opt.id }"
          @click="selectAnswer(opt.id)"
        >
          {{ opt.text[locale] }}
        </button>
      </li>
    </ul>

    <div class="quiz__buttons">
      <button @click="back">← back</button>
      <button @click="next" :disabled="!answers[currentIndex]">
        next →
      </button>
    </div>
  </section>
</template>

<style scoped>
/* стили */
</style>
