let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', (e) => {
  playerState = e.target.value;
});

const canvas = document.getElementById('canvas_1');
const ctx = canvas.getContext('2d');
// Default canvas value are width: 300px & height: 150px
// Set canvas' width and height to same values as canvas HTML element
// Uppercase = global variables
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = './assets/sprites/shadow_dog.png';
// Not random numbers, results height and width of spritesheet divided by the numbers of columns/rows
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
// Change staggerFrames to make the animation foes faster or slower. The less the fastest
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
  { name: 'idle', frames: 7 },
  { name: 'jump', frames: 7 },
  { name: 'fall', frames: 7 },
  { name: 'run', frames: 9 },
  { name: 'dizzy', frames: 10 },
  { name: 'sit', frames: 5 },
  { name: 'roll', frames: 6 },
  { name: 'bite', frames: 7 },
  { name: 'ko', frames: 12 },
  { name: 'getHit', frames: 4 },
];
// Info: index is built-in
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  // Attention: see YT comment about populating array with named objectfs and this thread - https://stackoverflow.com/questions/30494323/in-an-array-of-named-objects-in-javascript-are-the-names-accessible
  spriteAnimations[state.name] = frames;
});

const animatePlayer = () => {
  // Clear a rectangle within given rectangle.
  // Coordinates 0, 0 mean from top left corner, clear a rectable with a surface of CANVAS_WIDTH, CANVAS_HEIGHT i.e. the whole canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // Makes a reference to the number of positions in the
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  // Either loc[position] or loc[0] since y never changes for a given row
  let frameY = spriteAnimations[playerState].loc[position].y;
  // See https://www.w3schools.com/tags/canvas_drawimage.asp or full list of arguments and their meaning
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

  gameFrame++;
  // Runs once. Self reference in callback makes function run indefinitely
  requestAnimationFrame(animatePlayer);
};

animatePlayer();
