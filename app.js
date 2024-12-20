function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min

}

const { createApp } = Vue

createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        }
    },
    computed: {
        monsterBarStyle() {
            if(this.monsterHealth < 0) {
                return {
                    width:'0%'
                };
               }
            return {
                width: this.monsterHealth + '%'
            };
        },
        playerBarStyle() {
            if(this.playerHealth < 0) {
                return {
                    width:'0%'
                };
               }
            return {
                width: this.playerHealth + '%'
            };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'drew'
            } else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'drew'
            } else if (value <= 0) {
                this.winner = 'player'
            }
        },

    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            console.log("this is Me", attackValue)
            this.attackPlayer()
            this.winOrLose()
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            console.table("this is a monster", attackValue)
        },
        specialAttackMonster() {
            this.currentRound++
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer()
            console.table("this is a monster", attackValue)
        },
        healPlayer() {
            this.currentRound++
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
        },
        startGame() {
            this.monsterHealth = 100,
            this.playerHealth = 100,
            this.winner = null
            this.currentRound = 0
        },
       surrender() {
        this.winner = 'monster'
       }
    }
}
).mount('#game')


// playerHealth: 100,
// monsterHealth: 100,