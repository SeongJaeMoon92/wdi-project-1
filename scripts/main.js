// class Game {
//   constructor(){
//     this.init
//   }
//
//   init(){
//     this.pageWrapper = document.querySelector('.page-wrapper')
//     this.divCreation
//   }
//
//   divCreation(){
//     this.newDivs = document.createElement('div')
//     this.newAttribute = this.newDivs.setAttribute('class', 'grid')
//     this.pageWrapper.appendChild(this.newDivs)
//   }
// }
//
// const game = new Game(200)

window.addEventListener('DOMContentLoaded', () => {
  const pageWrapper = document.querySelector('.page-wrapper')
  // const gridItems = document.querySelectorAll('.grid')
  const gridItems = pageWrapper.childNodes

  function gameSetup(){
    divCreation(200)
    arrayCreation()
  }

  function arrayCreation(){
    const x = []
    for(let i = 0; i < 20; i++) {
      x.push([])
      for(let j = 0; j < 10; j++) {
        x[i].push(0)
      }
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
  }

  gameSetup()

  // class Shape{
  //   constructor(i, color){
  //     this.index = document.querySelector('[data-array="'+ i + '"]')
  //     this.color = this.index.style.backgroundColor = color
  //     // this.color = this.shape.forEach(col => col.style.backgroundColor = color
  //   }
  // }

  const shapeL = [4, 14, 15, 16]
  const shapeLAlternate = [6, 14, 15, 16]
  const shapeZ = [4, 5, 15, 16]
  const shapeZAlternate = [5, 6, 14, 15]
  const shapeO = [4, 5, 14, 15]
  const shapeT = [5, 14, 15, 16]
  const shapeI = [13, 14, 15, 16]

  const shape = [shapeL, shapeLAlternate, shapeZ, shapeZAlternate, shapeO, shapeT, shapeI]



  // const blockGenerator = {
  //   randomBlockGenerator: function() {
  //     const randomShapeIndex = Math.floor(Math.random()*shape.length)
  //     console.log(randomShapeIndex)
  //     const randomShape = shape[randomShapeIndex]
  //     console.log(randomShape)
  //     return randomShape
  //   }
  // }
  //
  // const value = blockGenerator.randomBlockGenerator()
  // console.log(value[0])

  function randomBlockGenerator() {
    const randomShapeIndex = Math.floor(Math.random()*shape.length)
    console.log(randomShapeIndex)
    const randomShape = shape[randomShapeIndex]
    console.log(randomShape)
    return randomShape
  }

  const randomBlock = randomBlockGenerator()

  function clear(){
    gridItems.forEach(divIndex => divIndex.classList.remove('filled'))
  }

  function fill(){
    // console.log(randomBlock)
    clear()
    let newShape
    const empty = []
    let newValue = 0
    for (let k = 0; k < randomBlock.length; k++){
      if (arrowKey === 'left'){
        randomBlock[k]--
      } else if (arrowKey === 'right') {
        randomBlock[k]++
      } else if(arrowKey === 'down') {
        randomBlock[k]+= 10
      }
      newValue = randomBlock[k]
      // console.log(newValue)
      newShape = gridItems[newValue]
      empty.push(newShape)
    }
    // console.log(empty)
    empty.forEach(shapeIndex => shapeIndex.classList.add('filled'))
  }

  let arrowKey = null

  function direction(e){
    if (e.keyCode === 37){
      arrowKey = 'left'
    } else if (e.keyCode === 39){
      arrowKey = 'right'
    } else if (e.keyCode === 40){
      arrowKey = 'down'
    } else {
      return false
    }
    console.log(e.keyCode)
    fill()
  }


  document.addEventListener('keydown', direction)

  // let i = 14
  // let pick

  // document.addEventListener('keydown', (e)=>{
  //   if (e.keyCode === 37){
  //     i--
  //     console.log(e.keyCode)
  //   }
  //   if (e.keyCode === 39){
  //     i++
  //     console.log(e.keyCode)
  //   }
  //   if (e.keyCode === 40){
  //     i +=10
  //     console.log(e.keyCode)
  //   }
  //   console.log(i)
  //   pick = gridItems.item(i)
  //   pick.style.backgroundColor = 'red'
  // })


  // let pick = document.querySelector('[data-array="' + i + '"]')

  // const centerPiece = new Shape(15, 'red')

  // console.log([gridItems[4], gridItems[14],gridItems[15],gridItems[16]])
})
