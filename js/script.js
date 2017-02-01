// maps
"use strict";
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x444444);
renderer.setSize( 1000, 600 );
document.body.appendChild( renderer.domElement );

var levels = new levelLoader();
levels.init();

function render() {
	requestAnimationFrame(render);
	renderer.render(levels.level.scene, levels.player.camera);
  levels.player.move(levels.level.scene);
}
render();
