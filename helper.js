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

var counter = 0;

function addArrow(x,y,z,colour) { 
    const dir = new THREE.Vector3(y,z,x);

    //normalize the direction vector (convert to vector of length 1)
    dir.normalize();

    const origin = new THREE.Vector3( 0, 0, 0 );
    const length = Math.sqrt(y**2+z**2+x**2);
    const hex = colour;

    const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    arrowHelper.name = String(counter);
    console.log(arrowHelper.name);
    scene.add( arrowHelper );
    animate();
    counter++;
}

function removeArrow(id) {
    var Selectedarrow = scene.getObjectByName(id);
    scene.remove( Selectedarrow );
    animate();
    console.log("Removed arrow " + id);
    counter--;
}

addArrow(10,10,10,"#eb346e");





function drawText(text, position) {
    var ourloader = new THREE.FontLoader();

    ourloader.load('three.js-master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
    var textGeom = new THREE.TextGeometry( text, {
        font: font,
        size: 1,
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

drawText("x", [-0.4, -0.5, 13]);
drawText("y", [13, -0.5, 0]);
drawText("z", [-0.5, 13, 0]);

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
    input.type = "text";
    input.id = "i" + String(i);
    console.log("added input with id " + input.id)
    input.className = "form-control";
    inputDiv.appendChild(input);
    i++;
}

function removeVectorInput() {
    i--;
    // var inputDiv = document.getElementById("inputDiv");
    document.getElementById("i" + String(i)).remove();
    
}

function checkForValidInput(id) {
    let vectInput = document.getElementById(id).value;

    // check if input starts with '(' and ends with ')'
    if (vectInput[0] == "(" && vectInput[vectInput["length"] - 1] == ")") {
        let arrOfInts = vectInput.slice(1,vectInput["length"] - 1).split(",");
        arrOfInts = arrOfInts.map(function (x) { 
            return parseInt(x, 10); 
          });
        
        if (arrOfInts.length == 3) {
            //pass our elements into our function that adds the arrow to the scene and use a random colour
            addArrow(...arrOfInts, '#' + Math.random().toString(16).substr(-6));
        }
    }
}