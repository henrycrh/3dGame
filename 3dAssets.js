"use strict";

//sandbox = function (string){

class Vector{
    constructor(x=null,y=null,z=null){
        if (x != null && y!= null && z!= null){
            this.xcomponent=parseFloat(x);
            this.ycomponent=parseFloat(y);
            this.zcomponent=parseFloat(z);
        }
        else if (x!= null && x.length == 3 && y != null && y.length == 3){
            this.xcomponent=parseFloat(y[0]-x[0]);
            this.ycomponent=parseFloat(y[1]-x[1]);
            this.zcomponent=parseFloat(y[2]-x[2]);
        }
        else if (x!= null && x.length == 3){
            this.xcomponent=parseFloat(x[0]);
            this.ycomponent=parseFloat(x[1]);
            this.zcomponent=parseFloat(x[2]);
        }
        else{
            throw "Incorrect Vector Declaration Exception";
        }
        this.magnitude = null;
    }
    
    getComponents(){
        return [this.xcomponent,this.ycomponent,this.zcomponent];
    }
    getMagnitude(){
        if(!this.magnitude){
            this.magnitude = Math.sqrt(Math.pow(this.xcomponent,2)+Math.pow(this.ycomponent,2)+Math.pow(this.zcomponent,2));
            //console.log("MAH WALLET")
        }
        return this.magnitude;
    }
    
    getSqMagnitude(){
        return Math.pow(this.xcomponent,2)+Math.pow(this.ycomponent,2)+Math.pow(this.zcomponent,2);
    }
        
    setComponents(components){
        this.xcomponent = parseFloat(components[0]);
        this.ycomponent = parseFloat(components[1]);
        this.zcomponent = parseFloat(components[2]);
        this.magnitude = null;
    }    
    setX(val){
        this.xcomponent=parseFloat(val);
        this.magnitude = null;
    }
    setY(val){
        this.ycomponent=parseFloat(val);
        this.magnitude = null;
    }
    setZ(val){
        this.zcomponent=parseFloat(val);
        this.magnitude = null;
    }
    rescale(val=1){
        var m = this.getMagnitude()
        this.setComponents([this.xcomponent/m*val, this.ycomponent/m*val,this.zcomponent/m*val]);
    }
    
    scalarMulti(val){
        this.setComponents([this.xcomponent*val, this.ycomponent*val,this.zcomponent*val]);
    }
    
    projectOnto(vector2){
        return this.scalarMulti(vector2,this.dotProduct(this, vector2)/vector2.getSqMagnitude());
    }
    
    reflectAcross(vector2){
        this.setComponents(r3.sub(this, r3.scalarMulti(vector2, 2 * r3.dotProduct(this, vector2) / vector2.getSqMagnitude())).getComponents());
    }
    
    toString(){
        return "("+this.xcomponent+", "+this.ycomponent+", "+this.zcomponent+")"
    }
};

class Ray extends Vector{
    constructor(x=null,y=null,z=null, color = null){
        super(x,y,z);
        this.color = color;
    }
    
}

class R3MathAssistant{

    constructor(){
        console.log("Welcome to the 3d Assets Library. Made by Chenry");
    }

    dotProduct(vector1, vector2){
        var v1 = vector1.getComponents();
        var v2 = vector2.getComponents();
        return v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2];
    };

    crossProduct(vector1, vector2){
        var v1 = vector1.getComponents();
        var v2 = vector2.getComponents();
        return new Vector(v1[1]*v2[2]-v1[2]*v2[1],v1[2]*v2[0]-v1[0]*v2[2],v1[0]*v2[1]-v1[1]*v2[0]);
    };

    getAngle(vector1, vector2){
        return Math.acos(this.dotProduct(vector1,vector2)/(vector1.getMagnitude()*vector2.getMagnitude()));
    }
    
    add(vector1, vector2){
        var v1 = vector1.getComponents();
        var v2 = vector2.getComponents();
        return new Vector(v1[0]+v2[0],v1[1]+v2[1],v1[2]+v2[2]);
    }
    
    sub(vector1, vector2){
        var v1 = vector1.getComponents();
        var v2 = vector2.getComponents();
        return new Vector(v1[0]-v2[0],v1[1]-v2[1],v1[2]-v2[2]);
    }
    
    scalarMulti(vector1, val){
        var v1 = vector1.getComponents();
        return new Vector(v1[0]*val,v1[1]*val,v1[2]*val);
    }
    
    rescale(vector, val=1){
        var v = vector.getComponents();
        var m = vector.getMagnitude()
        return new Vector(v[0]/m*val, v[1]/m*val, v[2]/m*val);
    }
    
    projection(vector1, vector2){
        return this.scalarMulti(vector2,this.dotProduct(vector1, vector2)/vector2.getSqMagnitude());
    }
    
    floatEquals(float1, float2){
        var maxError = 0.0001
        return (((1-maxError) < (float1/float2)) && ((float1/float2) < (1+maxError)));
        
    }    
    
    reflect(vector1, vector2){
        return this.sub(vector1, this.scalarMulti(vector2, 2 * this.dotProduct(vector1, vector2) / vector2.getSqMagnitude()));
    }
}

var r3=new R3MathAssistant();



//eval(string);

//}
