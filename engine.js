var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var camera = new Camera(0,0,0,canvas.width,canvas.height)
var objects = []
var lightSources = []
var ping = 0;
var pong = 0;
var framesPassed = 0
var recording = false;
var encoder;

objects[0] = new Sphere(50, 900, 200, 0, [255,0,0,],-180,-60,0,60)
objects[1] = new Sphere(150, 800, 0, 0, [0,255,0])
lightSources[0] = new LightSource(10,  1000, -200, 0, [255,255,255])

function render(){
    var scale = 10
    for(var i = 0; i < canvas.width/scale; i++){
        for (var j = 0; j < canvas.height/scale; j++){
            var viewVector = camera.getViewVector(scale, i, j);
            var color = getColor(viewVector, objects, lightSources,0);
            drawRect(ctx, i*scale, j*scale, scale, scale, "#"+numToHex(color[0])+numToHex(color[1])+numToHex(color[2]));
        }
    }
    
    if(recording)
        encoder.addFrame(ctx);
    
    framesPassed++;
    if (framesPassed > 400){
        if(recording){
            encoder.finish();
            encoder.download("download.gif");
        }
        return
    }
    //window.requestAnimationFrame(render)    
    
    ping++;
    update(FPS)
};


function update(FPS){
    
    objects.forEach(function(object){
        object.update(FPS)
    });
    
    pong++;
}

var FPS = 60

setInterval(function(){ document.getElementById("FPS").innerHTML = ping + ", "+pong }, 10);

if(recording){
    encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(1000/FPS); 
    encoder.start();
}

render()
