const scene = new THREE.Scene();
scene.background = new THREE.Color("#181818");
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize(0.75*window.innerWidth, 0.75*window.innerHeight);

const canvas = document.getElementById("canvas");
canvas.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);


camera.position.set(0,2,10).setLength(25);


window.reset=function() {
    controls.reset();
    camera.position.set(0,2,10).setLength(25);
    
}

controls.maxDistance = 500;
controls.update();

const xyAxis = new THREE.GridHelper(25,2);
scene.add(xyAxis);

const xzAxis = new THREE.GridHelper(25,2);
xzAxis.rotation.z = (Math.PI) / 2;

scene.add(xzAxis);

const yzAxis = new THREE.GridHelper(25,2);
yzAxis.rotation.x = (Math.PI) / 2;
scene.add(yzAxis);


function addArrow(x,y,z,colour,vectorID) { 
    const dir = new THREE.Vector3(y,z,x);

    //normalize the direction vector (convert to vector of length 1)
    dir.normalize();

    const origin = new THREE.Vector3( 0, 0, 0 );
    const length = Math.sqrt(y**2+z**2+x**2);
    const hex = colour;

    const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    arrowHelper.name = vectorID;
    console.log(arrowHelper.name);
    scene.add( arrowHelper );
    animate();
}

function removeArrow(id) {
    var Selectedarrow = scene.getObjectByName(id);
    scene.remove( Selectedarrow );
    animate();
    console.log("Removed arrow " + id);
}

// addArrow(10,10,10,"#eb346e");





function drawText(text, position,theSize) {
    var ourloader = new THREE.FontLoader();

    ourloader.load('three.js-master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
    var textGeom = new THREE.TextGeometry( text, {
        font: font,
        size: theSize,
        height: 0.1,
        curveSegments: 21,
        bevelEnabled: false
    } );

        var sometextMaterial = new THREE.MeshBasicMaterial( { color: "#FFFFFF" } );
        var someMesh = new THREE.Mesh( textGeom, sometextMaterial );
        someMesh.position.set(...position);
        scene.add( someMesh );
    } );
}

drawText("x", [-0.4, -0.5, 13],1);
drawText("y", [13, -0.5, 0],1);
drawText("z", [-0.5, 13, 0],1);
drawText("25", [12, -0.25, 12.5],0.5);
drawText("25", [-0.5, 12.1, 12.5],0.5);
drawText("25", [12, 12.25, 0],0.5);

function animate() {
    requestAnimationFrame(animate);
    // xyAxis.rotation.z += 0.01;
    document.getElementById('inputDiv').style.height = window.innerHeight.toString() + 'px';
    camera.aspect = window.innerWidth / window.innerHeight;     //update aspect ratio in case window is resized
    renderer.setSize(0.75*window.innerWidth, 0.75*window.innerHeight);  //update renderer size in case window resize
    renderer.render(scene,camera);  //render the final scene 
}

animate();


var i = 2;

function addVectorInput() {
    var inputDiv = document.getElementById("inputDiv");

    var input = document.createElement("input");
    input.type = "input";
    input.id = String(i);
    console.log("added input with id " + input.id)
    input.className = "form-control";
    // input.addEventListener("input",alert(input.id));
    
    inputDiv.appendChild(input);
    input.addEventListener("input",function(e) {checkForValidInput(input.id);});
    i++;
}

function removeVectorInput() {
    i--;
    // var inputDiv = document.getElementById("inputDiv");
    document.getElementById(String(i)).remove();
    if (scene.getObjectByName(String(i)) != null) {
        removeArrow(String(i));
    }
    
}

function checkForValidInput(id) {
    // try {
    let vectInput = document.getElementById(id).value;
    // }
    // catch (error) {
    //     console.log(error);
    // }
    
    if (scene.getObjectByName(id) != null) {
        removeArrow(id);
    }
    //vectors should follow the format of -> (x,y,z)
    //the regular expression below checks for two parentheses and 3 digits
    if (/[\(]\d+,\d+,\d+[\)]/.test(vectInput) == true && vectInput[vectInput.length - 2] != ")" && vectInput[vectInput.length - 1] == ")") {

        let arrOfInts = vectInput.slice(1,vectInput["length"] - 1).split(",");
        arrOfInts = arrOfInts.map(function (x) { 
            return parseInt(x, 10); 
        });
        addArrow(...arrOfInts, '#' + Math.random().toString(16).substr(-6), id);

    }
    

    //check if vector already exists on scene
    // if (scene.getObjectByName(id) != null) {
    //     console.log("exists");
    // }

    // check if input starts with '(' and ends with ')'
    // if (vectInput[0] == "(" && vectInput[vectInput["length"] - 1] == ")" && hasOnlyUniqueCharacters(vectInput) == true) {
    //     let arrOfInts = vectInput.slice(1,vectInput["length"] - 1).split(",");
    //     arrOfInts = arrOfInts.map(function (x) { 
    //         return parseInt(x, 10); 
    //       });
        
    //     if (arrOfInts.length == 3) {
    //         console.log(arrOfInts);
    //         //pass our elements into our function that adds the arrow to the scene and use a random colour
    //         addArrow(...arrOfInts, '#' + Math.random().toString(16).substr(-6));
    //     }
    // }
    // else {
    //     removeArrow(id);
    // }
}

