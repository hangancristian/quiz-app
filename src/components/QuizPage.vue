<template>
  <b-container id="quiz">
    <b-row id="header">
      <b-col id="title">
        <h1>Quiz App</h1>
      </b-col>
      <b-col id="timer">
        <p>{{ countDown }} seconds left</p>
      </b-col>
    </b-row>
    <b-row id="content">
      <b-col id="userInfo">
        <p id="userScore">You have {{userScore}} correct answers so far</p>
      </b-col>
      <b-col id="questionBlock">
        <div>
          <h2>Name the capital of:</h2>
          <div id="questionArea" v-if="questions.length &gt; 0">
            <p id="questionDisplay">{{questions[index].name}}</p>
            <div>
              <input type="text" v-model="userAnswer" id="uAnswer" />
            </div>
          </div>
          <a id="myButton" @click="checkAnswer">Next</a>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Swal from 'sweetalert2'
import _shuffle from 'lodash.shuffle'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
export default {
  name: 'QuizPage',
  data () {
    return {
      userScore: 0,
      questions: [],
      index: 0,
      userAnswer: '',
      countDown: 60,
      shf: true
    }
  },
  ready: function () {
    console.log('ready')
  },
  created: function () {
    this.fetchData()
    this.countDownTimer()
  },
  methods: {
    fetchData: function () {
      fetch(
        `http://restcountries.eu/rest/v2/region/${this.$route.params.region}?fields=name;capital`
      )
        .then(resp => resp.json())
        .then(json => this.questions.push(...json))
    },
    shuffle: function () {
      this.questions = _shuffle(this.questions)
    },
    checkAnswer: function () {
      if (this.userAnswer === this.questions[this.index].capital) {
        this.userScore++
      }
      this.updateIndex()
      this.userAnswer = ''
    },
    updateIndex: function () {
      if (this.shf === true) {
        this.shuffle()
        this.shf = false
      }
      if (this.index < 10) {
        this.index++
      } else {
        this.displayResults()
      }
    },
    timeisup: function () {
      // Swal.fire('Your time is up.','You got ${this.userScore} answers correct!')  // nu stiu de ce nu pot sa afisez cu ${this.userScore}
      Swal.fire('Your time is up.')
      this.restartQuiz()
    },
    displayResults: function () {
      // Swal.fire('You got ${this.userScore} answers correct!')
      Swal.fire('You got 0 answers correct!')
      this.restartQuiz()
    },
    restartQuiz: function () {
      this.userScore = 0
      this.index = 0
      this.goBack()
    },
    goBack: function () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    countDownTimer () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          if (this.countDown < 20) {
            document.getElementById('timer').style.color = 'red'
          }
          this.countDownTimer()
        }, 1000)
      } else {
        this.timeisup()
      }
    }
  }
}
</script>

<style >
#quiz {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
  background-color: #263056;
  min-height: 100vh;
}
#header {
  height: 10vh;
  display: flex;
  justify-content: space-between;
}
#title {
  padding: 1rem;
}
#timer {
  padding: 1rem;
  font-size: 20px;
  color: green;
}
#content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#questionBlock {
  padding: 15px;
  background: white;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 15px;
}

#questionBlock {
  width: 60vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#questionDisplay {
  margin-bottom: 5rem;
  font-size: 25px;
}
#uAnswer {
  padding: 10px;
  width: 25rem;
  border-radius: 15px;
  border: 1px solid rgba(58, 58, 58, 0.534);
}
#uAnswer:focus {
  outline: none;
}
#myButton {
  margin-top: 5rem;
  box-shadow: 0px 10px 14px -7px #276873;
  background: linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
  background-color: #599bb3;
  border-radius: 8px;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  padding: 13px 32px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #3d768a;
}
#myButton:hover {
  background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
  background-color: #408c99;
}
#myButton:active {
  position: relative;
  top: 1px;
}
</style>
