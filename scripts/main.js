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
      // this.currentPosition()
      // this.init()
    }

    falling(){
      setInterval(()=>{
        if (!this.index.some(number => number > 190)) {
          clear()
          this.emptyArray = []
          for (let i = 0; i < this.index.length; i++){
            this.index[i] += 10
            this.newIndex = this.index[i]
            // console.log('New Index: '+this.newIndex)
            this.newShape = gridItems[this.newIndex]
            this.emptyArray.push(this.newShape)
          }
          this.fill()
          console.log('New Index: ' + this.newIndex)
        }
      },1000)
    }
    fill(){
      this.emptyArray.forEach(shapeIndex => shapeIndex.classList.add('filled'))
    }
    movement(e){
      if (this.index[0] < 180 || this.index[1] < 180 || this.index[2] < 190 || this.index[3] < 190) {
        this.emptyArray = []
        for (let k = 0; k < this.index.length; k++){
          if (e.keyCode === 37){
            this.index[k]--
          } else if (e.keyCode === 39) {
            this.index[k]++
          } else if(e.keyCode === 40) {
            this.index[k]+= 10
          } else {
            return false
          }
          this.newIndex = this.index[k]
          this.newShape = gridItems[this.newIndex]
          this.emptyArray.push(this.newShape)
        }
        clear()
        this.fill()
      }
    }
    currentPosition(){
      this.newIndex
    }
  }

  class ShapeL extends Shape {
    constructor(){
      super()
      this.shape = [[1,0,0],[1,1,1]]
      this.index = [4, 14, 15, 16]
    }
  }
  class ShapeLAlternate extends Shape {
    constructor(){
      super()
      this.shape = [[0,0,1],[1,1,1]]
      this.index = [6, 14, 15, 16]
    }
  }
  class ShapeZ extends Shape {
    constructor(){
      super()
      this.shape = [[1,1,0],[0,1,1]]
      this.index = [4, 5, 15, 16]
    }
  }
  class ShapeZAlternate extends Shape {
    constructor(){
      super()
      this.shape = [[0,1,1],[1,1,0]]
      this.index = [5, 6, 14, 15]
    }
  }
  class ShapeO extends Shape {
    constructor(){
      super()
      this.shape = [[1,1],[1,1]]
      this.index = [4, 5, 14, 15]
    }
  }
  class ShapeT extends Shape {
    constructor(){
      super()
      this.shape = [[0,1,0],[1,1,1]]
      this.index = [5, 14, 15, 16]
    }
  }
  class ShapeI extends Shape {
    constructor(){
      super()
      this.shape = [1,1,1,1]
      this.index = [13, 14, 15, 16]
    }
  }
  const shape1 = new ShapeL()
  const shape2 = new ShapeLAlternate()
  const shape3 = new ShapeZ()
  const shape4 = new ShapeZAlternate()
  const shape5 = new ShapeO()
  const shape6 = new ShapeT()
  const shape7 = new ShapeI()
  let arrayBlocks = []

  function newRandomShape(){
    const randomArray = [shape1, shape2, shape3, shape4, shape5, shape6, shape7]
    const randomIndex = Math.floor(Math.random()*randomArray.length)
    const newBlock = randomArray[randomIndex]
    arrayBlocks.push(newBlock)
    return arrayBlocks
  }

  newRandomShape()
  console.log(arrayBlocks)
  arrayBlocks[arrayBlocks.length-1].falling()

  function clear(){
    gridItems.forEach(divIndex => divIndex.classList.remove('filled'))
  }

  // console.log(arrayBlocks[arrayBlocks.length - 1].newIndex)

  document.addEventListener('keydown', (e) => {
    arrayBlocks[arrayBlocks.length-1].movement(e)
  })

})
