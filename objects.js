class Camera{
    constructor(x,y,z,width,height){
       this.camerax = x;
       this.cameray = y;
       this.cameraz = z;
       this.planex = width+height;
       this.planey = Math.floor(width/2);
       this.planez = Math.floor(height/2);
       this.widthVector = new Vector(0,-width,0);
       this.heightVector = new Vector(0,0,-height);
    }
 
   getViewVector(scale, x, y){
       var startpoint = [this.camerax, this.cameray, this.cameraz];
       var widthDisplacement = r3.rescale(this.widthVector, scale*(x+0.5)).getComponents();
       var heightDisplacement = r3.rescale(this.heightVector,  scale*(y+0.5)).getComponents();
       var endpoint = [this.planex + widthDisplacement[0]+heightDisplacement[0], this.planey + widthDisplacement[1]+heightDisplacement[1], this.planez + widthDisplacement[2]+heightDisplacement[2]]
       return new Vector(startpoint, endpoint)
       
   }
   
   
}

class Sphere{
    constructor(r, x, y, z,  color = [255,0,0], vx = 0, vy = 0, vz = 0, ax = 0, ay = 0, az = 0){
        this.radius = r
        this.x = x;
        this.y = y;
        this.z = z;
        this.vx = vx;
        this.vy = vy;
        this.vz = vz;
        this.ax = ax;
        this.ay = ay;
        this.az = az;
        this.color = color;
    }
    
    update(FPS){
        this.x += this.vx/FPS;
        this.y += this.vy/FPS;
        this.z += this.vz/FPS;
        this.vx += this.ax/FPS;
        this.vy += this.ay/FPS;
        this.vz += this.az/FPS;
    }
}


class LightSource extends Sphere{
    constructor(r, x, y, z, color = [255,255,255], brightness = 255, vx = 0, vy = 0, vz = 0, ax = 0, ay = 0, az = 0){
        super(r, x, y, z,  color, vx, vy , vz, ax, ay, az)
        this.brightness = brightness
    }
}

