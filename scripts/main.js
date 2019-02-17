window.addEventListener('DOMContentLoaded', () => {
  const pageWrapper = document.querySelector('.page-wrapper')
  const gridItems = pageWrapper.childNodes
  let arrowKey = null

  console.log(gridItems)
  
  function gameSetup(){
    divCreation(200)
    arrayCreation()
  }

  function arrayCreation(){
    const x = []
    for(let i = 0; i < 200; i++) {
      x.push([])
    }
    console.log(x)
  }

  function divCreation(num) {
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
      this.shapeL = [[1,0,0],[1,1,1]]
      this.shapeLAlternate = [[0,0,1],[1,1,1]]
      this.shapeZ = [[1,1,0],[0,1,1]]
      this.shapeZAlternate = [[0,1,1],[1,1,0]]
      this.shapeO = [[1,1],[1,1]]
      this.shapeT = [[0,1,0],[1,1,1]]
      this.shapeT = [1,1,1,1]
      this.shape = [this.shapeL, this.shapeLAlternate, this.shapeZ,this.shapeZAlternate, this.shapeO, this.shapeT, this.shapeT]
      this.gameArrayIndex = [[4, 14, 15, 16],[6, 14, 15, 16],[4, 5, 15, 16],[5, 6, 14, 15],[4, 5,14, 15],[5, 14, 15, 16],[13, 14, 15, 16]]
      this.newGameArrayIndex = null
      this.emptyArrayForIndex = []
      this.newShape
      this.randomBlockGenerator()
    }

    randomBlockGenerator(){
      this.randomIndex = Math.floor(Math.random()*this.shape.length)
      this.randomGameArrayIndex = this.gameArrayIndex[this.randomIndex]
      this.randomShape = this.shape[this.randomIndex]
      console.log(this.randomShape, this.randomGameArrayIndex)
    }

    falling(){
      for (let i = 0; i < this.randomShape.length; i++){
        this.randomGameArrayIndex[i] += 10
        this.newGameArrayIndex = this.randomGameArrayIndex[i]
        this.newShape = gridItems[this.newGameArrayIndex]
        this.emptyArrayForIndex.push(this.newShape)
      }
      this.fill()
    }

    fill(){
      this.emptyArrayForIndex.forEach(shapeIndex => shapeIndex.classList.add('filled'))
    }

    clear(){
      gridItems.forEach(divIndex => divIndex.classList.remove('filled'))
    }

    movement(e){
      for (let k = 0; k < this.randomShape.length; k++){
        if (e.keyCode === 37){
          this.randomGameArrayIndex[k]--
        } else if (e.keyCode === 39) {
          this.randomGameArrayIndex[k]++
        } else if(e.keyCode === 40) {
          this.randomGameArrayIndex[k]+= 10
        } else {
          return false
        }
        this.newGameArrayIndex = this.randomGameArrayIndex[k]
        console.log(this.newGameArrayIndex)
        this.newShape = gridItems[this.newGameArrayIndex]
        this.emptyArrayForIndex.push(this.newShape)
      }
      this.fill()
    }
  }

  const newShape = new Shape()
  newShape.falling()

  document.addEventListener('keydown', (e) => {
    newShape.movement(e)
    console.log(e.keyCode)
  })

  // const shapeL = [4, 14, 15, 16]
  // const shapeLAlternate = [6, 14, 15, 16]
  // const shapeZ = [4, 5, 15, 16]
  // const shapeZAlternate = [5, 6, 14, 15]
  // const shapeO = [4, 5, 14, 15]
  // const shapeT = [5, 14, 15, 16]
  // const shapeI = [13, 14, 15, 16]
  //
  // const shape = [shapeL, shapeLAlternate, shapeZ, shapeZAlternate, shapeO, shapeT, shapeI]
  //
  // function randomBlockGenerator() {
  //   const randomShapeIndex = Math.floor(Math.random()*shape.length)
  //   console.log(randomShapeIndex)
  //   const randomShape = shape[randomShapeIndex]
  //   // console.log(randomShape)
  //   return randomShape
  // }
  //
  // const randomBlock = randomBlockGenerator()
  //
  // function falling() {
  //   clear()
  //   let newShape
  //   const empty = []
  //   let newValue = 0
  //   for (let i = 0; i < randomBlock.length; i++){
  //     randomBlock[i] += 10
  //     newValue = randomBlock[i]
  //     // console.log(newValue)
  //     newShape = gridItems[newValue]
  //     empty.push(newShape)
  //   }
  //   console.log(randomBlock)
  //   // console.log(empty)
  //   empty.forEach(shapeIndex => shapeIndex.classList.add('filled'))
  // }
  //
  // // setInterval(falling, 2000)
  //
  // function clear(){
  //   gridItems.forEach(divIndex => divIndex.classList.remove('filled'))
  // }
  //
  // function fill(){
  //   // console.log(randomBlock)
  //   clear()
  //   let newShape
  //   const empty = []
  //   let newValue = 0
  //   for (let k = 0; k < randomBlock.length; k++){
  //     if (arrowKey === 'left'){
  //       randomBlock[k]--
  //     } else if (arrowKey === 'right') {
  //       randomBlock[k]++
  //     } else if(arrowKey === 'down') {
  //       randomBlock[k]+= 10
  //     }
  //     newValue = randomBlock[k]
  //     // console.log(newValue)
  //     newShape = gridItems[newValue]
  //     empty.push(newShape)
  //   }
  //   // console.log(empty)
  //   empty.forEach(shapeIndex => shapeIndex.classList.add('filled'))
  // }
  //
  //
  //
  // function direction(e){
  //   if (e.keyCode === 37){
  //     arrowKey = 'left'
  //   } else if (e.keyCode === 39){
  //     arrowKey = 'right'
  //   } else if (e.keyCode === 40){
  //     arrowKey = 'down'
  //   } else {
  //     return false
  //   }
  //   console.log(e.keyCode)
  //   fill()
  // }
  //
  // document.addEventListener('keydown', direction)

  // let pick = document.querySelector('[data-array="' + i + '"]')

})
