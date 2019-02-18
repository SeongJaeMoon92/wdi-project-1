window.addEventListener('DOMContentLoaded', () => {
  const pageWrapper = document.querySelector('.page-wrapper')
  const gridItems = pageWrapper.childNodes
  let arrowKey = null

  console.log(gridItems)
  function gameSetup(){
    boardDivs(200)
    boardArray()
  }

  function boardArray(){
    const x = []
    for(let i = 0; i < 200; i++) {
      x.push(0)
    }
    console.log(x)
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
    // console.log(pageWrapper)
  }

  gameSetup()

  class Shape {
    constructor () {
      this.newIndex = null
      this.emptyArray = []
      this.newShape = null
      // this.falling()
    }

    falling(){
      setInterval(()=>{
        clear()
        this.emptyArray = []
        for (let i = 0; i < this.index.length; i++){
          if(this.index[i] < 200){
            this.index[i] += 10
            this.newIndex = this.index[i]
            this.newShape = gridItems[this.newIndex]
            this.emptyArray.push(this.newShape)
          }
        }
        this.fill()
      },1000)
    }

    fill(){
      this.emptyArray.forEach(shapeIndex => shapeIndex.classList.add('filled'))
    }

    movement(e){
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
    // console.log(arrayBlocks)
    return arrayBlocks
  }

  newRandomShape()
  console.log(arrayBlocks)
  arrayBlocks[arrayBlocks.length-1].falling()

  function clear(){
    gridItems.forEach(divIndex => divIndex.classList.remove('filled'))
  }

  document.addEventListener('keydown', (e) => {
    arrayBlocks[arrayBlocks.length-1].movement(e)
  })

  // let pick = document.querySelector('[data-array="' + i + '"]')

})
