"use strict";
function Level02 (hardness) {
  this.scene = new THREE.Scene();
  this.scene.fog = new THREE.Fog(0x111111, 0.015, 80);
  var resources = new resourceLoader();
  var cubesize = 10;
  var geometry = new THREE.CubeGeometry(cubesize,16,cubesize);
  this.loadMap = function () {
    //load map's geometry
    // 0 to n-1 materials
    // -1 doors
    //n floors
    var cubemap = new mazeGenerator(10 * hardness, 10 * hardness);
    cubemap[10 * hardness][10 * hardness - 1] = -1; //the door
    var cubes=new Array(cubemap.length);
    for(var i=0;i<cubemap.length;i++)
      cubes[i]=new Array(cubemap[0].length);
    for(var j=0;j<cubemap[0].length;j++)
    for(var i=0;i<cubemap.length;i++){
      //walls
      if(cubemap[i][j] > 0) {
       cubes[i][j]= new THREE.Mesh(geometry, resources.materials[cubemap[i][j]-1]);
       cubes[i][j].position.x = j * 10;
       cubes[i][j].position.z = i * 10;
       cubes[i][j].door = 0;
       this.scene.add(cubes[i][j]);
     }
     //door for the next level
     if(cubemap[i][j] === -1) {
       cubes[i][j]= new THREE.Mesh(geometry, resources.materials[1]);
       cubes[i][j].position.x = j * 10;
       cubes[i][j].position.z = i * 10;
       cubes[i][j].door = 1;
       this.scene.add(cubes[i][j]);
     }
    }
    //load map's floor
    var meshFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(cubesize*cubemap[0].length, cubesize*cubemap.length),
      resources.materials[3]
    );
    meshFloor.position.y = - cubesize/2;
    meshFloor.position.x = cubesize * cubemap[0].length/2;
    meshFloor.position.z = cubesize * cubemap.length/2;
    meshFloor.rotateX(4.71);
    this.scene.add(meshFloor);
  };
  this.init = function () {
    resources.load();
    this.loadMap();
  };
}
