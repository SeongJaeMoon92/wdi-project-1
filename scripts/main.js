window.addEventListener('DOMContentLoaded', () => {
  const pageWrapper = document.querySelector('.page-wrapper')
  const gridItems = pageWrapper.childNodes
  // console.log(gridItems)
  function gameSetup(){
    boardDivs(200)
    // boardArray()
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
  gameSetup()

  class Shape {
    constructor () {
      this.newIndex = null
      this.emptyArray = []
      this.newShape = null
      this.newBlock = null
      this.arrayBlocks = []
      this.randomIndex = null
      this.occupiedBlockArray = []
      this.currentShape = null
      this.generateBlock()
      this.windowListener()
    }
    falling(){
      setInterval(()=>{
        if (!this.newBlock.some(number => number > 190)) {
          clear()
          this.emptyArray = []
          for (let i = 0; i < this.newBlock.length; i++){
            this.newBlock[i] += 10
            this.newIndex = this.newBlock[i]
            this.newShape = gridItems[this.newIndex]
            this.emptyArray.push(this.newShape)
          }
          this.fill()
          console.log('New Index: ' + this.newIndex)
          this.occupied()
        }
      },1000)
    }
    fill(){
      this.emptyArray.forEach(shapeIndex => shapeIndex.classList.add('filled'))
    }
    movement(e){
      if (!this.newBlock.some(number => number > 190)) {
        this.emptyArray = []
        for (let k = 0; k < this.newBlock.length; k++){
          if (e.keyCode === 37){
            this.newBlock[k]--
          } else if (e.keyCode === 39) {
            this.newBlock[k]++
          } else if(e.keyCode === 40) {
            this.newBlock[k]+= 10
          } else {
            return false
          }
          this.newIndex = this.newBlock[k]
          this.newShape = gridItems[this.newIndex]
          this.emptyArray.push(this.newShape)
        }
        clear()
        this.fill()
        this.occupied()
      }
    }
    newRandomShape(){
      this.indexArray = [[4, 14, 15, 16], [6, 14, 15, 16], [4, 5, 15, 16], [5, 6, 14, 15], [4, 5, 14, 15], [5, 14, 15, 16], [13, 14, 15, 16]]
      this.randomIndex = Math.floor(Math.random()*this.indexArray.length)
      this.newBlock = this.indexArray[this.randomIndex]
      this.arrayBlocks.push(this.newBlock)
      // console.log(this.arrayBlocks)
    }
    generateBlock(){
      setInterval(() => {
        if (this.newBlock === null){
          this.newRandomShape()
        } else if (this.newBlock.some(number => number > 190)){
          this.newRandomShape()
          this.occupied()
          console.log(this.arrayBlocks)
        }
      },1000)
      this.falling(this.arrayBlocks[this.arrayBlocks.length - 1])
    }
    handleKeys(e) {
      this.movement(e)
    }
    windowListener(){
      window.addEventListener('keydown', this.handleKeys.bind(this))
    }
    occupied(){
      if (this.newBlock.some(number => number > 190)) {
        for (let i = 0; i < this.arrayBlocks.length; i++){
          this.arrayBlockIndex = this.arrayBlocks[i]
          for (let j = 0; j < this.arrayBlockIndex.length; j++){
            this.occupiedBlock = gridItems[this.arrayBlockIndex[j]]
            this.occupiedBlockArray.push(this.occupiedBlock)
          }
          this.occupiedBlockArray.forEach(color => color.classList.add('occupied'))
        }
      }
    }
  }

  const block = new Shape()

  function clear(){
    gridItems.forEach(divIndex => divIndex.classList.remove('filled'))
  }


})
