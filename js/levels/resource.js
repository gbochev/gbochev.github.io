function resourceLoader () {
  this.materials = [];
  this.load = function () {
    var brick = new THREE.TextureLoader().load('texture/brix3.jpg');
    var wood = new THREE.TextureLoader().load('texture/wood-fibre.png');
    var hitler = new THREE.TextureLoader().load('texture/trump.jpg');
    var floor1 = new THREE.TextureLoader().load('texture/floor2.jpg');
    floor1.wrapS = THREE.RepeatWrapping;
    floor1.wrapT = THREE.RepeatWrapping;
    floor1.repeat.set(16, 16);
    var floor2 = new THREE.TextureLoader().load('texture/floor2.png');
    floor2.wrapS = THREE.RepeatWrapping;
    floor2.wrapT = THREE.RepeatWrapping;
    floor2.repeat.set(16, 16);
    this.materials.push(new THREE.MeshBasicMaterial( { map : brick } ));
    this.materials.push(new THREE.MeshBasicMaterial( { map : wood} ));
    this.materials.push(new THREE.MeshBasicMaterial( { map : hitler }));
    this.materials.push(new THREE.MeshBasicMaterial({map : floor1}));
    this.materials.push(new THREE.MeshBasicMaterial({map : floor2}));
  };
}
function levelLoader() {
  this.levelIndex = 0;
  this.level = null;
  this.player = null;
  this.init = function () {
    this.level = new Level01();
    this.level.init();
    //x,y from the top left corner
    this.player = new Player(100,70);
    document.addEventListener('keydown', this.player.keydown);
    document.addEventListener('keyup', this.player.keyup);
  };
  this.nextLevel = function () {
    document.removeEventListener('keydown', this.player.keydown);
    document.removeEventListener('keyup', this.player.keyup);
    this.levelIndex++;
    switch (this.levelIndex) {
      case 1:
        this.level = new Level02();
        this.level.init();
        this.player = new Player(10,10);
        document.addEventListener('keydown', this.player.keydown);
        document.addEventListener('keyup', this.player.keyup);
      break;
    }
  };
}
