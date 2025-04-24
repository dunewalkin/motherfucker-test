import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    answers: [] 
  }),
  actions: {
    setAnswers(answers) {
      this.answers = answers
    }
  }
})
