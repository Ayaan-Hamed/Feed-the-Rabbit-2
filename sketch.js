var e, w, g, b, c, r, bi, fi, ri, bunny, btn, blink, eat, sad, bgs, ss, cs, es, air, bln, m, btn2, btn3, r2, r3, wi, he,
simg, s1, s2

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

function preload () {
bi = loadImage("./assets/background.png")
fi = loadImage ("./assets/melon.png")
ri = loadImage ("./assets/Rabbit-01.png")
blink = loadAnimation ("./assets/blink_1.png", "./assets/blink_2.png", "./assets/blink_3.png")
eat = loadAnimation ("./assets/eat_0.png", "./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png")
sad = loadAnimation ("./assets/sad_1.png", "./assets/sad_2.png", "./assets/sad_3.png")
eat.looping = false
sad.looping = false
bgs = loadSound ("./assets/sound1.mp3")
cs = loadSound ("./assets/rope_cut.mp3")
ss = loadSound ("./assets/sad.wav")
es = loadSound ("./assets/eating_sound.mp3")
air = loadSound ("./assets/air.wav")
simg = loadImage ("./assets/star.png")
}

function setup() {
// var flag = /iPhone|iPad|iPod|Android|Chrome/i.test (navigator.userAgent)
// if (flag) {
// wi = displayWidth
// he = displayHeight
// createCanvas(displayWidth, displayHeight);
// } else {
//   wi = windowWidth
//   he = windowHeight
  createCanvas(800, 1000)
// }
 e = Matter.Engine.create()
 w = e.world
 g = Matter.Bodies.rectangle(width / 2, height - 10, width, 20, {isStatic: true})
 Matter.World.add(w, g)
 b = Matter.Bodies.circle(width / 2, -10, 50)
 Matter.World.add(w, b)
 ellipseMode(RADIUS)
 rectMode(CENTER)
 imageMode (CENTER)
// c = Matter.Constraint.create({pointA:{x: 100, y: 100}, 
// bodyB: b, length: 100, stiffness: 0.02})
// Matter.World.add(w, c)
r = new Rope (8, {x:100, y:200})
r2= new Rope (8, {x:500, y:200})
// r3 = new Rope (8, {x:550, y:450})
Matter.Composite.add(r.body, b)
c = new Link (r, b)
c2 = new Link (r2, b)
// c3 = new Link (r3, b)
blink.frameDelay = 10
bunny = createSprite (500, height - 150, 50, 50)
// bunny.addImage (ri)
bunny.addAnimation ("blink", blink)
bunny.addAnimation ("eat", eat)
bunny.addAnimation ("sad", sad)

bunny.scale = 0.35
btn = createImg ("./assets/cut_btn.png")
btn.position (100, 200)
btn.size (100, 100) 
btn.mouseClicked (cut)

bln = createImg ("./assets/balloon.png")
bln.position (230, 500)
bln.size (150, 150) 
bln.mouseClicked (blowair)

btn2 = createImg ("./assets/cut_btn.png")
btn2.position (500, 200)
btn2.size (100, 100) 
btn2.mouseClicked (cut2)

// btn3 = createImg ("./assets/cut_btn.png")
// btn3.position (550, 450)
// btn3.size (100, 100) 
// btn3.mouseClicked (cut3)

// bgs.play ()
// bgs.setVolume (0.5)

m = createImg ("./assets/mute.png")
m.position (width - 50, 0)
m.size (50, 50) 
m.mouseClicked (mute)

s1 = createSprite(300, 50)
s1.addImage(simg)
s1.scale = 0.02

s2 = createSprite(130, 450)
s2.addImage(simg)
s2.scale = 0.02
}

function draw() 
{
  background(220);
  image (bi, width / 2, height / 2, width, height)
  Matter.Engine.update(e)
  rect(g.position.x, g.position.y, width, 20)
  if (b != null)
  image (fi, b.position.x, b.position.y, 100, 100)
  // line(c.pointA.x, c.pointA.y, b.position.x, b.position.y) 
  r.show()
  r2.show()
  // r3.show()
if (collide (b, bunny)) {
bunny.changeAnimation ("eat")
console.log ("eat")
es.play ()
}
if ( b != null && b.position.y > bunny.y ) {
bunny.changeAnimation ("sad")
ss.play ()
console.log ("sad")
setInterval (()=>{ss.stop ();b = null}, 2000)
}

  drawSprites()
  
}


function cut () {
 r.break ()
 c.cut ()
 c = null 
cs.play ()
} 
function cut2 () {
  r2.break ()
  c2.cut ()
  c2 = null 
 cs.play ()
}
function cut3 () {
  r3.break ()
  c3.cut ()
  c3 = null 
 cs.play ()
}
function collide (b1, s) {
  if (b1 != null) {
      var d = dist (b1.position.x, b1.position.y, s.position.x, s.position.y)
      if (d <= 120) {
        // console.log (91, d, b1)
        Matter.World.remove (w, b)
        b = null
        return true

      }
  else {
    return false
  }
  }

}

function blowair () {
  Matter.Body.applyForce (b, b.position, {x:0.3, y:0})
  air.play ()
}

function mute () {
  if (bgs.isPlaying()) {
    bgs.stop ()
  }
  else {bgs.play ()}
}