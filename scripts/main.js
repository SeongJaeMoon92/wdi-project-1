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
      const newText = document.createTextNode(i)
      newDivs.dataset.array = i
      newDivs.setAttribute('class', 'grid')
      newDivs.appendChild(newText)
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
      this.currentShape = null
      this.occupiedItem = document.getElementsByClassName('grid')
      this.testInterval = null
      this.wall = null
      this.arrowKey = null
      this.clearBlocks = []
      this.generateBlock()
      this.windowListener()
      this.checkingRows()
    }
    falling(){
      this.testInterval = setInterval(()=>{
        if (!this.newBlock.some(number => number > 190)) {
          this.emptyArray = []
          clear()
          for (let i = 0; i < this.newBlock.length; i++){
            this.newBlock[i] += 10
            this.emptyArray.push(gridItems[this.newBlock[i]])
          }
          this.fill()
          this.occupied()
          this.checkingRows()
        }
        for (let j = 0; j < this.newBlock.length; j++){
          if(this.newBlock.some(number => number > 190)||
            this.occupiedItem[this.newBlock[j]+10].classList.contains('occupied') === true){
            clearInterval(this.testInterval)
            this.generateBlock()
            this.occupied()
            this.checkingRows()
          }
        }
      },1000)
    }
    fill(){
      this.emptyArray.forEach(shapeIndex => shapeIndex.classList.add('filled'))
    }
    movement(){
      if (!this.newBlock.some(number => number > 190)) {
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
        this.fill()
      }
      this.occupied()
      // this.checkingRows()
    }
    movementCondition(e){
      if(
        this.newBlock === null ||
        this.newBlock.some(number => number > 190)||
        this.occupiedItem[this.newBlock[3]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[2]+10].classList.contains('occupied') === true ||
        this.occupiedItem[this.newBlock[1]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[0]+10].classList.contains('occupied') === true){
        return
      } else {
        for (let k = 0; k < this.newBlock.length; k++){
          if (e.keyCode === 37){
            if (this.newBlock[k] % 10 === 0){
              return false
            } else {
              this.arrowKey = 'left'
            }
          } else if (e.keyCode === 39){
            if (this.newBlock[k] % 10 === 9) {
              return false
            } else {
              this.arrowKey = 'right'
            }
          } else if (e.keyCode === 40){
            this.arrowKey = 'down'
          } else {
            return
          }
        }
        this.movement(e)
      }
    }
    newRandomShape(){
      this.indexArray = [[4, 14, 15, 16], [6, 14, 15, 16], [4, 5, 15, 16], [5, 6, 14, 15], [4, 5, 14, 15], [5, 14, 15, 16], [13, 14, 15, 16]]
      this.randomIndex = Math.floor(Math.random()*this.indexArray.length)
      // console.log(this.randomIndex)
      this.newBlock = this.indexArray[this.randomIndex]
      // this.newBlock = this.indexArray[4]
      // console.log(this.newBlock)
      this.arrayBlocks.push(this.newBlock)
    }
    generateBlock(){
      setInterval(() => {
        if (this.newBlock === null){
          this.newRandomShape()
        } else if (this.newBlock.some(number => number > 190)){
          this.newRandomShape()
        } else if (
          this.occupiedItem[this.newBlock[3]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[2]+10].classList.contains('occupied') === true ||
          this.occupiedItem[this.newBlock[1]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[0]+10].classList.contains('occupied') === true){
          this.newRandomShape()
        }
      },1000)
      this.falling(this.arrayBlocks[this.arrayBlocks.length - 1])
    }
    handleKeys(e) {
      this.movementCondition(e)
    }
    windowListener(){
      window.addEventListener('keydown', this.handleKeys.bind(this))
    }
    occupied(){
      if (
        this.newBlock.some(number => number > 190) ||
      this.occupiedItem[this.newBlock[3]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[2]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[1]+10].classList.contains('occupied') === true || this.occupiedItem[this.newBlock[0]+10].classList.contains('occupied') === true) {
        // for (let i = 0; i < this.arrayBlocks.length; i++){
        this.arrayBlockIndex = this.arrayBlocks[this.arrayBlocks.length-1]
        for (let j = 0; j < this.arrayBlockIndex.length; j++){
          this.occupiedBlock = gridItems[this.arrayBlockIndex[j]]
          this.occupiedBlockArray.push(this.occupiedBlock)
        }
        this.occupiedBlockArray.forEach(color => color.classList.add('occupied'))
        // }
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
            }
          }
        }
        this.clearBlocks = []
      }
    }
    rotation(){

    }
  }
  function clear(){
    gridItems.forEach(divIndex => divIndex.classList.remove('filled'))
  }
  const block = new Shape()
})
