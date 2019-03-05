<template>
  <section class="game">
    <h1>{{textTitle ? textTitle : 'Choose the bowl and find Pusheen'}}</h1>

    <h2>Pusheen & You {{defeats}}:{{wins}}</h2>

    <transition-group
      class="bowl-wrapper"
      :class="{'bowl-wrapper--disabled': gameOver}"
      tag="section"
    >
      <div
        v-for="bowl in bowls"
        :key="bowl.id"
        class="bowl"
        :class="{'bowl--disabled': gameWin}"
        @click="chooseTheBowl(bowl.id)"
      >
        <img src="../assets/bowl.png">
        <!-- <p class="bowl__num">{{bowl.id}}</p> -->
        <transition name="pusheen">
          <img
            src="../assets/pusheen.png"
            class="pusheen"
            v-if="(gameWin || gameOver) && pusheenRandomBowlId === bowl.id"
          >
        </transition>
      </div>
    </transition-group>

    <button class="game__button" @click="resetGame">once more!</button>
  </section>
</template>

<style lang="scss" scoped>
.game {
  width: 100%;

  h1,
  h2 {
    text-align: center;
  }
  h2 {
    margin-top: 30px;
  }

  &__button {
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
}

.bowl-wrapper {
  max-width: 800px;
  margin: 100px auto;
  display: flex;
  justify-content: space-between;

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
.bowl-wrapper-move {
  transition: transform 1s;
}

.bowl {
  width: 250px;
  margin: 0 10px;
  cursor: pointer;
  transition: transform 1s;
  position: relative;
  z-index: 0;

  &:hover {
    transform: translateY(-10px);
    transition: transform 0.2s ease-in;
  }

  &--disabled {
    pointer-events: none;
  }

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  &__num {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin: 0;
    margin-top: -20px;
  }
}

.pusheen {
  position: absolute;
  z-index: -1;
  top: 0;
  transform: translateY(-70%);
}
</style>

<script>
export default {
  name: "PusheenHome",
  data() {
    return {
      bowls: [
        {
          id: "1"
        },
        {
          id: "2"
        },
        {
          id: "3"
        }
      ],
      textTitle: "",
      gameOver: false,
      gameWin: false,
      wins: 0,
      defeats: 0
    };
  },
  computed: {
    pusheenRandomBowlId() {
      return this.bowls[Math.floor(Math.random() * this.bowls.length)].id;
    }
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
        this.gameWin = true;
        this.textTitle = "Congrats!";
        this.wins++;
      } else {
        this.textTitle = "Try again :( Pusheen is good at hiding";
        this.gameOver = true;
        this.defeats++;
      }
    },
    resetGame() {
      this.gameOver = false;
      this.gameWin = false;
      this.textTitle = "";
      this.shuffleBowls();
    }
  }
};
</script>