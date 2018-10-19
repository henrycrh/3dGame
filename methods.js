function numToHex(num){
    var conversion = "0123456789abcdef"
    return conversion.charAt(Math.floor(num/16)) + conversion.charAt(num%16)   
}

function drawRect(ctx, x, y, width, height, color){
    ctx.fillStyle = color
    ctx.fillRect(x,y,width,height);
}
function getSphereCollisionDistance(viewVector, object){
    var moveVector = new Vector([object.x, object.y, object.z],[camera.camerax, camera.cameray, camera.cameraz]);
    var sqrt = Math.pow(r3.dotProduct(viewVector, moveVector), 2)/viewVector.getSqMagnitude() - moveVector.getSqMagnitude() + Math.pow(object.radius, 2);
    if (sqrt < 0){
        return Infinity;
    } 
    else{
        return -1*r3.dotProduct(r3.rescale(viewVector), moveVector) - Math.sqrt(sqrt)
    }
}

function getClosestObject(vector, objects){
    var smallestDistance = Infinity;
    var objectIdx = -1;
    for(var i = 0; i < objects.length; i++){
        object = objects[i];
        var dist = getSphereCollisionDistance(vector, object)
        if ( dist < smallestDistance){
            objectIdx = i;
            smallestDistance = dist
        }
    }
    
    return objects[objectIdx]
}

function getCollisionPoint(vector, objects){
    
}


function getColor(vector, objects, lightSources, depth){
    var color = [0, 0, 0]
    
    var nearestObject = getClosestObject(vector, objects)
    if(!nearestObject){
        return color
    }
    
    var collisionPoint = getCollisionPoint(vector, nearestObject)
    
    var addedColors = []
    var absorbedColors = [nearestObject.color]
    
    if(depth > 0){
        addedColors.push(getColor(reflected, objects, lightSources, depth-1))
    }
    
    lightSources.forEach(function(lightsource){
        
        addedColors.push(lightsource.color)
    });
    
    for (let i = 0; i < color.length; i++){
        addedColors.forEach(function(theColor){
            color[i] += theColor[i]
        });
        absorbedColors.forEach(function(theColor){
            color[i] -= theColor[i]
        });
        if(color[i] < 0){
            color[i] = 0
        }
        if(color[i] > 255){
            color[i] = 255
        }
    }
    return color
}

