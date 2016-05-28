
world = Physics(function(world){  // creates physicsJS world setting bounds within the big circle
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;

    var renderer = Physics.renderer('canvas', {
      el: 'viewport',
      width: viewWidth,
      height: viewHeight,
      meta: false, // don't display meta data
    });

    // add the renderer
    world.add( renderer );
    // render on each step
    world.on('step', function(){
      world.render();
    });

    // bounds of the window
    var viewportBounds = Physics.aabb(0, 0, viewWidth-80, viewHeight-100);
      world.add(Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.4,
      cof: 100
    }));
    // add a circle
   world.add([
      Physics.behavior('constant-acceleration')
      ,Physics.behavior('body-impulse-response')
      ,Physics.behavior('body-collision-detection')
      ,Physics.behavior('sweep-prune')
      ]);

      // subscribe to ticker to advance the simulation
      Physics.util.ticker.on(function( time, dt ){

          world.step( time );
      });

      // start the ticker
      Physics.util.ticker.start();
});

function balls(color, num_balls, x,y,vx,vy){ // these are arrays of properties for new circles 
    var c = num_balls; //RAND number
    console.log(color);
    var circles = [];
    fill_color = color;
    for(i=0;i<num_balls;i++){
        circles.push(Physics.body('circle', { // adds new circles to physics world
            x:  x[i]
            ,y: y[i]
            ,vx: vx[i]
            ,vy: vy[i]
            ,radius: (200/num_balls)
            ,mass: 1
            ,restitution: 0.5
            ,styles: {
                fillStyle: fill_color
            }
        }));
    }
    world.add(circles); // after adding all circles publishes changes and updates world
}

var socket = io();
socket.on('rand', function(data){
  $('#num').html(data['num_balls']);
  $('#num_circle').css("background-color", data['color']);
  balls(data['color'],data['num_balls'],data['x'],data['y'],data['vx'],data['vy']);

});
