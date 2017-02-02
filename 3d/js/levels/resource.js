function createArray(k, l) {
    var arr = new Array(k);
    for(var i=0;i < l;i++)
      arr[i]=new Array(l);
    return arr;
}
//loads textures
function resourceLoader () {
  this.materials = [];
  this.load = function () {
    var brick = new THREE.TextureLoader().load('texture/brix3.jpg');
    var wood = new THREE.TextureLoader().load('texture/wood-fibre.png');
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
    this.materials.push(new THREE.MeshBasicMaterial({map : floor1}));
    this.materials.push(new THREE.MeshBasicMaterial({map : floor2}));
  };
}
//generates mazes for each map
//Originally coded by Michael Zdravkov
//This is js translation
function mazeGenerator(width, height) {
var spacing = 2;
var position_checked = createArray(width / spacing, height / spacing);
var level = createArray(width, height);
for(i in level)
  level[i].fill(1);

DirX = function (d, l) {
    if(d==0)return l;
    if(d==2)return -l;
    return 0;
};
DirY = function (d, l) {
    if(d==1)return -l;
    if(d==3)return l;
    return 0;
};
pathGeneration = function (x,y,w,h,dist) {
  position_checked[x][y] = 1;
    level[x*spacing][y*spacing] = 0;
  var dir = new Array(4);
  dir[0] = Math.floor((Math.random() * 4));
  dir[1]=(dir[0]>2)?0:dir[0]+1;
    dir[2]=(dir[1]>2)?0:dir[1]+1;
    dir[3]=(dir[2]>2)?0:dir[2]+1;
    var num_paths=0;
    var next_x,next_y;
    for( var i = 0; i < 4; i++ ) {
        next_x = x + DirX( dir[i], 1 );
        next_y = y + DirY( dir[i], 1 );
        if( next_x >= 0 && next_y >= 0 &&
    next_x < width/spacing &&
    next_y < height/spacing &&
    !position_checked[next_x][next_y] ) {
            for( var j=0; j <= spacing; j++ ) {
                level[x*spacing+DirX(dir[i],j)][y*spacing+DirY(dir[i],j)] = 0;
            }
            num_paths++;
            pathGeneration( next_x, next_y, width, height, dist + 1 );
        }
    }
    return dist;
};

pathGeneration(0,0,width,height,1);
for(i in level)
  level[i].unshift(1);
var wall = [];
for(i in level[0])
  wall.push(1)
level.unshift(wall);
return level;
}
//console.log(level.join("\n"));

function levelLoader() {
  this.levelIndex = 0;
  this.level = null;
  this.player = null;
  this.init = function () {
    document.getElementById("level").innerHTML = "Level " + this.levelIndex;
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
   // switch (this.levelIndex) {
     // case 1:
        document.getElementById("level").innerHTML = "Level " + this.levelIndex;
        this.level = new Level02(this.levelIndex);
        this.level.init();
        this.player = new Player(10,10);
        document.addEventListener('keydown', this.player.keydown);
        document.addEventListener('keyup', this.player.keyup);
      //break;
   // }
  };
}
//timer
var count=3600;
var counter=setInterval(timer, 1000);
function timer()
{
  count=count-1;
  if (count <= 0) {
     clearInterval(counter);

     return;
  }
  document.getElementById("time").innerHTML = count + "s left";
}
