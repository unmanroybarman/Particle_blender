/* STEPS as follows :-
1. Creating Canvas & resizing it
2. Drawing Elements in Canvas eg: line,arc,rect etc
3. Animating Elements
4. Interacting with Elements */

//console.log('reddit');//testing

//searching html document and when it finds canvas element, it grabs that and puts it in canvas variable
var canvas = document.querySelector('canvas');
//console.log(canvas); // testing 

//grabbing window's innerWidth and setting it to our canvas width 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//c is Context and we are putting all the methods needed to draw in canvas in var c
var c = canvas.getContext('2d');

// mouse object, we want to get x,y coordiantes of our mouse, set x,y to undefined, we are setting x,y in our mouseEvent
var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
//var minRadius = 2;

// to change color of each circle, colorArray is created
var colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9',
];


//EventListener, we want to monitor mouse movement,whenever we move mouse across screen & a function to call whenever this event occurs
// we need to compare mouse postion with each individual x,y position of each circle
// we need to get mouse position by event argument
window.addEventListener('mousemove', 
           function(event) {
    // Testing the function, whenever we move mouse,function is called 
    //console.log('werw'); 
    //console.log(event); // this event gives all the data associated with the event
    
    mouse.x = event.x;
    mouse.y = event.y;
   // console.log(mouse);
    
})

//eventListener for resizing browser
window.addEventListener('resize', function()
 {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //each time we call init(); we are refreshing our browser
    init();
})



//object oriented javascript
// creating objects,Circle object, so that we can have many circles, with each circle having its own x,y values,dx,dy values,funct
// we took the circle code arc and pasted it inside here,we geta satic circle
// so to move circle we create update func and copy the code for bouncing ball and paste it inside update func
// each time we instatiate new circle,we are going to pass arguments
 function Circle(x, y, dx, dy, radius){
     this.x = x;
     this.y = y;
     this.dx = dx;
     this.dy = dy;
     this.radius = radius;
     this.minRadius = radius;
     this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
     
     this.draw = function(){
         //console.log('aabbcad');
         c.beginPath();
         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
         c.fillStyle = this.color;
         c.fill();
     }  
     
     this.update = function(){
          if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
              this.dx = - this.dx;
          }
      
          if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
              this.dy = - this.dy;
          }
          this.x = this.x + this.dx;
          this.y = this.y + this.dy;
         
         //interactivity
         if (mouse.x - this.x < 50 && mouse.x - this.x > -50
           && mouse.y - this.y < 50 && mouse.y - this.y > -50
            ){
             if(this.radius < maxRadius){
                 this.radius += 1; // grow circles
             }
         } else if(this.radius > this.minRadius){
             this.radius -= 1; // shrink circles to their actual particle position
         }
         
         
          this.draw();
     }
 }


 // storing all circles in array
 var circleArray = [];

// pushing each objects in array,instantiating 100 circles
/*for(var i =0; i < 800; i++){
     // radius in a range [1 to 4]
     var radius = Math.random() * 3 + 1;
     var x = Math.random() * (innerWidth - radius * 2) + radius;
     var y = Math.random() * (innerHeight - radius * 2) + radius; 
     // we want to have random values for velocity,(both negative and positive values)
     var dx = (Math.random() - 0.5);
     var dy = (Math.random() - 0.5);
     circleArray.push(new Circle(x, y, dx, dy, radius)); 
} */



function init(){
    
    circleArray = [];
    for(var i =0; i < 800; i++){
     // radius in a range [1 to 4]
     var radius = Math.random() * 3 + 1;
     var x = Math.random() * (innerWidth - radius * 2) + radius;
     var y = Math.random() * (innerHeight - radius * 2) + radius; 
     // we want to have random values for velocity,(both negative and positive values)
     var dx = (Math.random() - 0.5);
     var dy = (Math.random() - 0.5);
     circleArray.push(new Circle(x, y, dx, dy, radius)); 
}}

// testing, created 100 circles in array, with independent values
//console.log(circleArray);

// animate function draws things in screen
function animate(){
    requestAnimationFrame(animate);
    
    //each time we clear canvas from 0,0 to innerWidth,height of screen before drawing arc
    c.clearRect(0, 0, innerWidth, innerHeight);
      
    //drawing 800 circles in "SCREEN", accessing each cicrle through array
    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
      
}

init();
animate();












