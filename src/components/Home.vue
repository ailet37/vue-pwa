<template>
  <div>
    <h1>{{text ? text : 'Choose the bowl and find Pusheen'}}</h1>
  
      <transition-group name="list-complete" class="bowl-wrapper" tag="section" :class="{'bowl-wrapper--disabled': gameOver}">
        <div class="bowl" v-for="(bowl, index) in bowls" :key=bowl.id @click=chooseTheBowl(bowl.id) :class="{'bowl--active': pusheenIsFound && pusheenRandomBowlId === bowl.id, 'bowl--disabled': gameWin}">
          <img src="../assets/bowl.png">
          <p class="bowl__num">{{bowl.id}}</p>
          <transition name="pusheen">
            <img src="../assets/pusheen.png" class="bowl__pusheen" v-if="(pusheenIsFound || gameOver) && pusheenRandomBowlId === bowl.id">
          </transition>
        </div>
      </transition-group>
   
    <button @click="resetGame" class="button">once more!</button>
  </div>

</template>

<style scoped>
    .bowl-wrapper {
      max-width: 800px;
      margin: 100px auto;
      display: flex;
      justify-content: space-between;
    }
    .bowl-wrapper--disabled {
      pointer-events: none;
      opacity: .5;  
    }
    .bowl-wrapper-move {
      transition: transform 1s;
    }  
    .pusheen-enter-active, .pusheen-leave-active {
      /* transition: all 1s ease; */
    }
    .pusheen-enter, .pusheen-leave-to {
      transform: translateY(0px);
    }

    .bowl {
      width: 250px;
      height: 250px;
      margin: 0 10px;
      cursor: pointer;
      transition: transform 1s;
      position: relative;
      z-index: 0;
    }
    .bowl:hover {
      transform: translateY(-10px);
      transition: transform .2s ease-in;
    }

    .bowl--disabled {
      pointer-events: none;
    }

    .bowl__num {
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      margin: 0;
      margin-top: -20px;
    }

    .bowl__pusheen {
      position: absolute;
      z-index: -1;
      top: 0;
      transform: translateY(-120px);
    }

    .bowl img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
    .button {
      -webkit-appearance: none;
      background-color: #333;
      border: none;
      display: flex;
      margin: 50px auto;
      padding: 10px;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
    }
</style>

<script>
  export default {
    name: "PusheenHome",
    data() {
      return {
        bowls: [
          {
            id: '1',
          }, {
            id: '2'
          }, {
            id: '3'
          }
        ],
        pusheenIsFound: false,
        text: '',
        gameOver: false,
        gameWin: false
      }
    },
    computed: {
      pusheenRandomBowlId() {
        return this.bowls[Math.floor(Math.random()*this.bowls.length)].id
      },
    },
    methods: {
      compareRandom(a, b) {
        return Math.random() - 0.5;
      },
      shuffleBowls() {
        return this.bowls.sort(this.compareRandom);
      },
      chooseTheBowl(id) {
        if (id === this.pusheenRandomBowlId) {
          this.pusheenIsFound = true
          this.gameWin = true
          this.text = 'Congrats!'
        } else {
          this.text = 'Try again :( Pusheen is good at hiding'
          this.gameOver = true
        }
      },
      resetGame() {
        this.gameOver = false
        this.gameWin = false
        this.pusheenIsFound = false
        this.text = ''
        this.shuffleBowls();
      }
    }
  }
</script>