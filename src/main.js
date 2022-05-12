 import Game from './Game.js'
 import { loadImage, loadJSON } from './Loader.js'
 import Sprite from './Sprite.js'
 import Cinematic from './Cinematic.js' 

 const scale = 3

 export default async function main () {
   const game = new Game({
     width: 672,
     height: 744,
     background: 'black'
   })

   document.body.append(game.canvas)

   const image = await loadImage('/sets/spritesheet.png')
   const atlas = await loadJSON('/sets/atlas.json')
 
const maze = new Sprite({
  image,
  x: 0,
  y: 0,
  width: atlas.maze.width * scale,
  height: atlas.maze.height * scale,
  frame: atlas.maze
})
game.canvas.width = maze.width
game.canvas.height = maze.height

const foods = atlas.maze.foods
 .map(food => ({
   ...food,
   x: food.x * scale,
   y: food.y * scale,
   width: food.width * scale,
   height: food.height * scale,
 }))
 .map(food => new Sprite({
   image,
   frame: atlas.food,
   ...food
 }))

  const pacman = new Cinematic({
    image,
    x: atlas.position.pacman.x * scale,
    y: atlas.position.pacman.y * scale,
    width: 13 * scale,
    height: 13 * scale,
    animations: atlas.pacman,
    //debug: true
   })
   pacman.start('right')
    
   const ghosts = ['red', 'pink', 'turquoise', 'banana']
   .map(color => {
     const ghost = new Cinematic ({
       image,
       x: atlas.position[color].x * scale,
       y: atlas.position[color].y * scale,
       width: 13 * scale,
       height: 13 * scale,
       animations: atlas[`${color}Ghost`],
       //debug: true
     })
     ghost.start(atlas.position[color].direction)

     return ghost
   })

   game.stage.add(maze)
   foods.forEach(food => game.stage.add(food))
   game.stage.add(pacman)
   ghosts.forEach(ghost => game.stage.add(ghost))
 }