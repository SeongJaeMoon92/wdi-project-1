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
  const gridItems = document.querySelectorAll('.grid')

  function arrayCreation(){
    const x = []
    for(let i = 0; i < 10; i++) {
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
      newDivs.setAttribute('class', 'grid')
      pageWrapper.appendChild(newDivs)
    }
  }

  // class Shape{
  //   constructor(){
  //     this.piece = gridItems[16]
  //     this.color = gridItems[16].style.backgroundColor = 'red'
  //   }
  // }
  // gridItems[16].style.backgroundColor = 'red'

  function init(){
    divCreation(200)
    arrayCreation()
  }

  console.log(gridItems.item(16).style.backgroundColor = 'red')

  init()
})
