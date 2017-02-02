'use strict';
function Player (x,z) {
  this.camera = new THREE.PerspectiveCamera( 75, 1000 / 600, 0.1, 1000 );
  this.camera.position.x = x; //start coordinates
  this.camera.position.z = z;
  this.camera.position.y = 0;
  var speed = 0;
  var rotation = 0;
  var fw = false;
  var bw = false;
  var rot = 0;
  var moveSpeed = 0.5;
  var rotationSpeed = 0.001;
  this.keydown = function (e) {
      switch(e.keyCode) {
          case 38:
          fw = true;
          break;
          case 40:
          bw = true;
          break;
          case 37:
          rot = 1;
          break;
          case 39:
          rot = -1;
          break;
      }

  };
  this.keyup = function (e) {
    switch(e.keyCode) {
        case 38:
          fw = false;
          speed = 0;
        break;
        case 40:
          bw = false;
          speed = 0;
        break;
        case 37:
          rot = 0;
        break;
        case 39:
          rot = 0;
        break;
    }
  };
  this.collision = function (pos, scene){
    var lookVector = new THREE.Vector3(0, 0, pos);
    var axis = new THREE.Vector3(0, 1, 0);
    lookVector.applyAxisAngle(axis, this.camera.rotation.y);
    var raycaster = new THREE.Raycaster();
    raycaster.set(this.camera.position, lookVector);
    var intersection = raycaster.intersectObjects(scene.children);
    if(intersection.length > 0){
      //check for wall (door =0 means wall)
      if(intersection[0].distance < 5 && intersection[0].object.door === 0) {
        return true;
      }
      //check for door
      if(intersection[0].distance < 2 && intersection[0].object.door === 1) {
        levels.nextLevel();
      }
    }
    return false;
  };
  this.move = function (scene) {
    document.getElementById("coords").innerHTML = "X: " + Math.floor(this.camera.position.x) +
    " Y: " + Math.floor(this.camera.position.z);
    if(this.collision(-1, scene)) {
      fw = false;
    }
    if(this.collision(1, scene))
      bw = false;
    if(fw) {
      speed =- moveSpeed;
  	  this.camera.translateZ(speed);
    }
    if(bw) {
      speed =+ moveSpeed;
      this.camera.translateZ(speed);
    }
    if(rot > 0)
      rotation += rotationSpeed;
    if(rot < 0)
      rotation -= rotationSpeed;
    this.camera.rotation.y = rotation * 180 / Math.PI;
  };
}
