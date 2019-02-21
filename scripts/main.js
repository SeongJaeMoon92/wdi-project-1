window.addEventListener('DOMContentLoaded', () => {
  const pageWrapper = document.querySelector('.page-wrapper')
  const gridItems = pageWrapper.childNodes
  gameSetup()
  function gameSetup(){
    boardDivs(200)
  }
  function boardDivs(num) {
    for (let i = 0; i < num; i++){
      const newDivs = document.createElement('div')
      // const newText = document.createTextNode(i)
      newDivs.dataset.array = i
      newDivs.setAttribute('class', 'grid')
      // newDivs.appendChild(newText)
      pageWrapper.appendChild(newDivs)
    }
  }
  class Shape {
    constructor () {
      this.emptyArray = []
      this.newBlock = null
      this.arrayBlocks = []
      this.randomIndex = null
      this.occupiedBlockArray = []
      this.occupiedItem = document.getElementsByClassName('grid')
      this.testInterval = null
      this.arrowKey = null
      this.clearBlocks = []
      this.blockRotation = []
      this.rotationNotation = 0
      this.numberOfRows = []
      this.generate
      this.scoreText = document.querySelector('.scorespan')
      this.score = 0
      this.playagainBtn = document.querySelector('.play-again')
      this.scoreboard = document.querySelector('.scoreboard')
      this.wrap = document.querySelector('.wrap')
      this.highestscoreboard = document.querySelector('.highestscoreboard')
      this.body = document.querySelector('body')
      this.gameboard = document.querySelector('.gameboard')
      this.heading = document.querySelector('.heading')
      this.headingText = document.querySelector('.headingSpan')
      this.generateBlock()
      this.windowListener()
      this.windowListenerReset()
      this.windowLoad()
      this.headingClick()
    }
    falling(){
      this.testInterval = setInterval(()=>{
        if (!this.newBlock.some(number => number >= 190)) {
          this.emptyArray = []
          clear()
          for (let i = 0; i < this.newBlock.length; i++){
            this.newBlock[i] += 10
            this.emptyArray.push(gridItems[this.newBlock[i]])
          }
          this.fill()
          this.checkingRows()
        }
        for (let j = 0; j < this.newBlock.length; j++){
          if(this.newBlock.some(number => number > 190)||
            this.occupiedItem[this.newBlock[j]+10].classList.contains('occupied') === true){
            clearInterval(this.testInterval)
            this.generateBlock()
            this.occupied()
          }
        }
      },1000)
    }
    fill(){
      this.emptyArray.forEach(shapeIndex => shapeIndex.classList.add('filled'))
    }
    movement(){
      if (!this.newBlock.some(number => number >= 190)) {
        this.emptyArray = []
        for (let k = 0; k < this.newBlock.length; k++){
          switch(this.arrowKey){
            case 'down':
              this.newBlock[k]+=10
              break
            case 'left':
              this.newBlock[k]--
              break
            case 'right':
              this.newBlock[k]++
              break
          }
          this.emptyArray.push(gridItems[this.newBlock[k]])
        }
        clear()
      }
      this.fill()
      this.occupied()
    }
    movementCondition(e){
      if(
        this.newBlock === null ||
        this.newBlock.some(number => number >= 190)||
        this.occupiedItem[this.newBlock[3]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[2]+10].classList.contains('occupied') === true ||
        this.occupiedItem[this.newBlock[1]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[0]+10].classList.contains('occupied') === true){
        return
      } else {
        for (let k = 0; k < this.newBlock.length; k++){
          if (e.keyCode === 37){
            if (this.newBlock[k] % 10 === 0 ||
              this.occupiedItem[this.newBlock[3]-1].classList.contains('occupied') === true ||
              this.occupiedItem[this.newBlock[2]-1].classList.contains('occupied') === true ||
              this.occupiedItem[this.newBlock[1]-1].classList.contains('occupied') === true ||
              this.occupiedItem[this.newBlock[0]-1].classList.contains('occupied') === true){
              return false
            } else {
              this.arrowKey = 'left'
            }
          } else if (e.keyCode === 39){
            if (this.newBlock[k] % 10 === 9 ||
              this.occupiedItem[this.newBlock[3]+1].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[2]+1].classList.contains('occupied') === true ||
              this.occupiedItem[this.newBlock[1]+1].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[0]+1].classList.contains('occupied') === true ) {
              return false
            } else {
              this.arrowKey = 'right'
            }
          } else if (e.keyCode === 40){
            this.arrowKey = 'down'
          } else if (e.keyCode === 38){
            if (this.newBlock[k] % 10 === 0 || this.newBlock[k] % 10 === 9
            // ||
              // this.occupiedItem[this.newBlock[3]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[2]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[1]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[0]+10].classList.contains('occupied') === true
            ){
              return false
            } else {
              this.arrowKey = 'up'
            }
          }
        }
        this.movement(e)
        this.rotation(e)
      }
    }
    newRandomShape(){
      this.indexArray = [[4, 14, 15, 16], [6, 14, 15, 16], [4, 5, 15, 16], [5, 6, 14, 15], [4, 5, 14, 15], [5, 14, 15, 16], [13, 14, 15, 16]]
      this.randomIndex = Math.floor(Math.random()*this.indexArray.length)
      this.newBlock = this.indexArray[this.randomIndex]
      this.arrayBlocks.push(this.newBlock)
    }
    generateBlock(){
      this.generate = setInterval(() => {
        if (
          this.newBlock === null||
          this.newBlock.some(number => number >= 190) ||
          this.occupiedItem[this.newBlock[3]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[2]+10].classList.contains('occupied') === true ||
          this.occupiedItem[this.newBlock[1]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[0]+10].classList.contains('occupied') === true){
          this.newRandomShape()
        }
      },1000)
      this.falling(this.arrayBlocks[this.arrayBlocks.length - 1])
      this.rotationNotation = 0
      this.losingCondition()
    }
    handleKeys(e) {
      this.movementCondition(e)
    }
    windowListener(){
      window.addEventListener('keydown', this.handleKeys.bind(this))
    }
    occupied(){
      if (
        this.newBlock.some(number => number >= 190) ||
      this.occupiedItem[this.newBlock[3]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[2]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[1]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[0]+10].classList.contains('occupied') === true) {
        this.arrayBlockIndex = this.arrayBlocks[this.arrayBlocks.length-1]
        for (let j = 0; j < this.arrayBlockIndex.length; j++){
          this.occupiedBlock = gridItems[this.arrayBlockIndex[j]]
          this.occupiedBlockArray.push(this.occupiedBlock)
        }
        this.occupiedBlockArray.forEach(color => color.classList.add('occupied'))
        this.occupiedBlockArray = []
      }
    }
    checkingRows(){
      for (let i = 0; i < 200; i+=10){
        for(let j = 0; j < 10; j++){
          this.clearBlocks.push(gridItems[i+j])
          if(this.clearBlocks.length === 10){
            if(this.clearBlocks.every(item => item.classList.contains('occupied'))){
              this.clearBlocks.forEach(item => item.classList.remove('occupied'))
              this.numberOfRows.push(i)
              console.log(this.numberOfRows)
              for (let k = i; k > 0 ; k--){
                if(gridItems[k].classList.contains('occupied')){
                  gridItems[k].classList.remove('occupied')
                  k+=10
                  gridItems[k].classList.add('occupied')
                  this.score+=10
                  this.scoreText.innerHTML = this.score
                }
              }
            }
          }
        }
        this.clearBlocks = []
      }
      this.numberOfRows = []
    }
    rotation(){
      if(this.arrowKey === 'up') {
        if (this.randomIndex === 0){
          this.blockRotation = [[20, 11, -11],[2,-9,9],[-20,-11,11],[-2,9,-9]]
          this.newBlock[0] += this.blockRotation[this.rotationNotation][0]
          this.newBlock[1] += this.blockRotation[this.rotationNotation][1]
          this.newBlock[3] += this.blockRotation[this.rotationNotation][2]
          this.rotationNotation++
          if (this.rotationNotation === 4){
            this.rotationNotation = 0
          }
        } else if (this.randomIndex === 1){
          this.blockRotation = [[-2, 11, -11],[20,-9,9],[2,-11,11],[-20,9,-9]]
          this.newBlock[0] += this.blockRotation[this.rotationNotation][0]
          this.newBlock[1] += this.blockRotation[this.rotationNotation][1]
          this.newBlock[3] += this.blockRotation[this.rotationNotation][2]
          this.rotationNotation++
          if (this.rotationNotation === 4){
            this.rotationNotation = 0
          }
        } else if (this.randomIndex === 2){
          this.blockRotation = [[20, 9, -11],[2,11,9],[-20,-9,11],[-2,-11,-9]]
          this.newBlock[0] += this.blockRotation[this.rotationNotation][0]
          this.newBlock[1] += this.blockRotation[this.rotationNotation][1]
          this.newBlock[3] += this.blockRotation[this.rotationNotation][2]
          this.rotationNotation++
          if (this.rotationNotation === 4){
            this.rotationNotation = 0
          }
        } else if (this.randomIndex === 3){
          this.blockRotation = [[9, -2, 11],[11,20,-9],[-9,2,-11],[-11,-20,9]]
          this.newBlock[0] += this.blockRotation[this.rotationNotation][0]
          this.newBlock[1] += this.blockRotation[this.rotationNotation][1]
          this.newBlock[2] += this.blockRotation[this.rotationNotation][2]
          this.rotationNotation++
          if (this.rotationNotation === 4){
            this.rotationNotation = 0
          }
        } else if (this.randomIndex === 5){
          this.blockRotation = [[9, 11, -11],[11,-9,9],[-9,-11,11],[-11,9,-9]]
          this.newBlock[0] += this.blockRotation[this.rotationNotation][0]
          this.newBlock[1] += this.blockRotation[this.rotationNotation][1]
          this.newBlock[3] += this.blockRotation[this.rotationNotation][2]
          this.rotationNotation++
          if (this.rotationNotation === 4){
            this.rotationNotation = 0
          }
        } else if (this.randomIndex === 6){
          this.blockRotation = [[9, 18, 27],[-9,-18,-27]]
          this.newBlock[1] += this.blockRotation[this.rotationNotation][0]
          this.newBlock[2] += this.blockRotation[this.rotationNotation][1]
          this.newBlock[3] += this.blockRotation[this.rotationNotation][2]
          this.rotationNotation++
          if (this.rotationNotation === 2){
            this.rotationNotation = 0
          }
        }
      } else if (
        this.newBlock.some(number => number >= 190) ||
        this.occupiedItem[this.newBlock[3]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[2]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[1]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[0]+10].classList.contains('occupied') === true) {
        this.rotationNotation = 0
        return
      }
    }
    losingCondition(){
      for (let i = 10; i < 20; i++){
        if(gridItems[i].classList.contains('occupied')){
          clearInterval(this.generate)
          clearInterval(this.testInterval)
          console.log('You lose')
          this.playagainBtn.style.display ='block'
          pageWrapper.style.display ='none'
          this.highestScore()
        }
      }
    }
    playagain(){
      // location.reload()
      for (let i = 0; i < 200; i++){
        gridItems[i].classList.remove('occupied')
      }
      this.score = 0
      this.scoreText.innerHTML = 0
      pageWrapper.style.display ='flex'
      this.playagainBtn.style.display = 'none'
      this.rotationNotation = 0
      this.generateBlock()
    }
    windowListenerReset(){
      this.playagainBtn.addEventListener('click', this.playagain.bind(this))
    }
    highestScore(){
      const highestscore = localStorage.getItem('highestScore')
      console.log(this)
      if (highestscore < this.score){
        localStorage.setItem('highestScore', this.score)
        this.highestscoreboard.innerHTML = this.score
      } else {
        this.highestscoreboard.innerHTML = highestscore
      }
    }
    windowLoad(){
      window.addEventListener('load', ()=>{
        this.highestscoreboard.innerHTML = localStorage.getItem('highestScore')
        this.gameboard.style.display = 'none'
        this.heading.style.height = '100%'
        this.headingText.style.lineHeight = '600px'
      })
    }
    headingClick(){
      this.heading.addEventListener('click',()=>{
        this.gameboard.style.display = 'flex'
        this.gameboard.classList.add('animated', 'bounceInUp')
        this.heading.classList.add('animated', 'bounceInUp')
        this.heading.style.height = '15%'
        this.headingText.style.lineHeight = '0px'
      })
    }
  }
  function clear(){
    gridItems.forEach(divIndex => divIndex.classList.remove('filled'))
  }
  const block = new Shape()
})
