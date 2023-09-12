
class Link {
    constructor (bodyA, bodyB) {
     var l = bodyA.body.bodies.length-2
    this.link = Matter.Constraint.create({
        bodyA:bodyA.body.bodies [l], bodyB: bodyB, length: 1, stiffness: 1
    })
    Matter.World.add(w, this.link)
    }
    cut () {
        Matter.World.remove (w, this.link)
    }
}
