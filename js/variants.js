/* Texas Holdem Cards */
var card1 = document.querySelector('.card1');
var card2 = document.querySelector('.card2');
var card3 = document.querySelector('.card3');
var card4 = document.querySelector('.card4');
var card5 = document.querySelector('.card5');

/* Omhaha Cards */
var card6 = document.querySelector('.card6');
var card7 = document.querySelector('.card7');
var card8 = document.querySelector('.card8');
var card9 = document.querySelector('.card9');

/* Seven Card Stud Cards */
var card10 = document.querySelector('.card10');
var card11 = document.querySelector('.card11');
var card12 = document.querySelector('.card12');
var card13 = document.querySelector('.card13');
var card14 = document.querySelector('.card14');


/* 2-7 Cards */
var card15 = document.querySelector('.card15');
var card16 = document.querySelector('.card16');
var card17 = document.querySelector('.card17');
var card18 = document.querySelector('.card18');
var card19 = document.querySelector('.card19');


/* Variants */
var card20 = document.querySelector('.card20');
var card21 = document.querySelector('.card21');
var card22 = document.querySelector('.card22');
var card23 = document.querySelector('.card23');
var card24 = document.querySelector('.card24');


var texas_flopButton = document.querySelector('#table-texas');
var omaha_flopButton = document.querySelector('#table-omaha');
var stud_flopButton = document.querySelector('#table-stud');
var two7_flopButton = document.querySelector('#table-2-7');
var variants_flopButton = document.querySelector('#table-variants');

var texas_done = false; 
texas_flopButton.addEventListener('click', function() {
  var duration = 1000; // in milliseconds
  var delay = 0;

  if (texas_done == false){
    
    // animate card 1
    setTimeout(function() {
      card1.style.transform = 'translate(10px, 100px)';
      card1.style.left = parseInt(card1.style.left) - 50 + 'px';
    }, delay);
    
    // animate card 2
    setTimeout(function() {
      card2.style.transform = 'translate(60px, 100px)';
      card2.style.left = parseInt(card2.style.left) - 25 + 'px';
    }, delay + 100);
    
    // animate card 3
    setTimeout(function() {
      card3.style.transform = 'translate(60px, 0)';
    }, delay + 200);
  
  // animate card 3
  setTimeout(function() {
      card4.style.transform = 'translate(110px, 0)';
      }, delay + 200);
  
          // animate card 3
    setTimeout(function() {
      card5.style.transform = 'translate(160px, 0)';
    }, delay + 200);
    
    texas_done = true; 
    return

  }else{
    
    // animate card 1
    setTimeout(function() {
      card1.style.transform = 'translate(-0, -0)';
      card1.style.left = parseInt(card1.style.left) - 50 + 'px';
    }, delay);
    
    // animate card 2
    setTimeout(function() {
      card2.style.transform = 'translate(-0, -0)';
      card2.style.left = parseInt(card2.style.left) - 25 + 'px';
    }, delay + 100);
    
    // animate card 3
    setTimeout(function() {
      card3.style.transform = 'translate(-0, 0)';
    }, delay + 200);
  
  // animate card 3
  setTimeout(function() {
      card4.style.transform = 'translate(-0, 0)';
      }, delay + 300);
  
          // animate card 3
    setTimeout(function() {
      card5.style.transform = 'translate(-0, 0)';
    }, delay + 300);

    texas_done = false;
    return
  }

});

/* Omaha */
var omaha_done =false;
omaha_flopButton.addEventListener('click', function() {
  var duration = 1000; // in milliseconds
  var delay = 0;

  if (omaha_done == false){
    
    // animate card 1
    setTimeout(function() {
      card6.style.transform = 'translate(20px, 100px)';
      card6.style.left = parseInt(card1.style.left) - 50 + 'px';
    }, delay);
    
    // animate card 2
    setTimeout(function() {
      card7.style.transform = 'translate(75px, 100px)';
      card7.style.left = parseInt(card2.style.left) - 25 + 'px';
    }, delay + 100);
    
    // animate card 3
    setTimeout(function() {
      card8.style.transform = 'translate(130px, 100px)';
    }, delay + 200);
  
  // animate card 3
  setTimeout(function() {
      card9.style.transform = 'translate(185px, 100px)';
      }, delay + 200);
  
    
    omaha_done = true; 
    return

  }else{
    
    // animate card 1
    setTimeout(function() {
      card6.style.transform = 'translate(-0, -0)';
      card6.style.left = parseInt(card1.style.left) - 50 + 'px';
    }, delay);
    
    // animate card 2
    setTimeout(function() {
      card7.style.transform = 'translate(-0, -0)';
      card7.style.left = parseInt(card2.style.left) - 25 + 'px';
    }, delay + 100);
    
    // animate card 3
    setTimeout(function() {
      card8.style.transform = 'translate(-0, 0)';
    }, delay + 200);
  
  // animate card 3
  setTimeout(function() {
      card9.style.transform = 'translate(-0, 0)';
      }, delay + 200);
  


    omaha_done = false;
    return
  }

});


/* Stud */
var stud_done =false;
stud_flopButton.addEventListener('click', function() {
  var duration = 1000; // in milliseconds
  var delay = 0;

  if (stud_done == false){
    
    // animate card 1
    setTimeout(function() {
      card10.style.transform = 'translate(10px, 100px)';
      card10.style.left = parseInt(card1.style.left) - 50 + 'px';
    }, delay);
    
    // animate card 2
    setTimeout(function() {
      card11.style.transform = 'translate(60px, 100px)';
      card11.style.left = parseInt(card2.style.left) - 25 + 'px';
    }, delay + 100);
    
    // animate card 3
    setTimeout(function() {
      card12.style.transform = 'translate(110px, 100px)';
    }, delay + 200);
  
  // animate card 3
  setTimeout(function() {
      card13.style.transform = 'translate(160px, 100px)';
      }, delay + 200);
  
          // animate card 3
    setTimeout(function() {
      card14.style.transform = 'translate(210px, 100px)';
    }, delay + 200);
  
  
              
    stud_done = true; 
    return

  }else{
    
    // animate card 1
    setTimeout(function() {
      card10.style.transform = 'translate(-0, -0)';
      card10.style.left = parseInt(card1.style.left) - 50 + 'px';
    }, delay);
    
    // animate card 2
    setTimeout(function() {
      card11.style.transform = 'translate(-0, -0)';
      card11.style.left = parseInt(card2.style.left) - 25 + 'px';
    }, delay + 100);
    
    // animate card 3
    setTimeout(function() {
      card12.style.transform = 'translate(-0, 0)';
    }, delay + 200);
  
  // animate card 3
  setTimeout(function() {
      card13.style.transform = 'translate(-0, 0)';
      }, delay + 300);
  
          // animate card 3
    setTimeout(function() {
      card14.style.transform = 'translate(-0, 0)';
    }, delay + 300);

    stud_done = false;
    return
  }

});


/* 2-7 */
var two7 =false;
two7_flopButton.addEventListener('click', function() {
  var duration = 1000; // in milliseconds
  var delay = 0;

  if (two7 == false){
    
    // animate card 1
    setTimeout(function() {
      card15.style.transform = 'translate(10px, 100px)';
      card15.style.left = parseInt(card1.style.left) - 50 + 'px';
    }, delay);
    
    // animate card 2
    setTimeout(function() {
      card16.style.transform = 'translate(60px, 100px)';
      card16.style.left = parseInt(card2.style.left) - 25 + 'px';
    }, delay + 100);
    
    // animate card 3
    setTimeout(function() {
      card17.style.transform = 'translate(110px, 100px)';
    }, delay + 200);
  
  // animate card 3
  setTimeout(function() {
      card18.style.transform = 'translate(160px, 100px)';
      }, delay + 200);
  
          // animate card 3
    setTimeout(function() {
      card19.style.transform = 'translate(210px, 100px)';
    }, delay + 200);
  
  
              
    two7 = true; 
    return

  }else{
    
    // animate card 1
    setTimeout(function() {
      card15.style.transform = 'translate(-0, -0)';
      card15.style.left = parseInt(card1.style.left) - 50 + 'px';
    }, delay);
    
    // animate card 2
    setTimeout(function() {
      card16.style.transform = 'translate(-0, -0)';
      card16.style.left = parseInt(card2.style.left) - 25 + 'px';
    }, delay + 100);
    
    // animate card 3
    setTimeout(function() {
      card17.style.transform = 'translate(-0, 0)';
    }, delay + 200);
  
  // animate card 3
  setTimeout(function() {
      card18.style.transform = 'translate(-0, 0)';
      }, delay + 300);
  
          // animate card 3
    setTimeout(function() {
      card19.style.transform = 'translate(-0, 0)';
    }, delay + 300);

    two7 = false;
    return
  }

});


/* Other variants */
var variants =false;
variants_flopButton.addEventListener('click', function() {
  var duration = 1000; // in milliseconds
  var delay = 0;

  if (variants == false){
    
    // animate card 1
    setTimeout(function() {
      card20.style.transform = 'translate(10px, 100px)';
      card20.style.left = parseInt(card1.style.left) - 50 + 'px';
    }, delay);
    
    // animate card 2
    setTimeout(function() {
      card21.style.transform = 'translate(60px, 100px)';
      card21.style.left = parseInt(card2.style.left) - 25 + 'px';
    }, delay + 100);
    
    // animate card 3
    setTimeout(function() {
      card22.style.transform = 'translate(110px, 100px)';
    }, delay + 200);
  
  // animate card 3
  setTimeout(function() {
      card23.style.transform = 'translate(160px, 100px)';
      }, delay + 200);
  
          // animate card 3
    setTimeout(function() {
      card24.style.transform = 'translate(210px, 100px)';
    }, delay + 200);
  
  
              
    variants = true; 
    return

  }else{
    
    // animate card 1
    setTimeout(function() {
      card20.style.transform = 'translate(-0, -0)';
      card20.style.left = parseInt(card1.style.left) - 50 + 'px';
    }, delay);
    
    // animate card 2
    setTimeout(function() {
      card21.style.transform = 'translate(-0, -0)';
      card21.style.left = parseInt(card2.style.left) - 25 + 'px';
    }, delay + 100);
    
    // animate card 3
    setTimeout(function() {
      card22.style.transform = 'translate(-0, 0)';
    }, delay + 200);
  
  // animate card 3
  setTimeout(function() {
      card23.style.transform = 'translate(-0, 0)';
      }, delay + 300);
  
          // animate card 3
    setTimeout(function() {
      card24.style.transform = 'translate(-0, 0)';
    }, delay + 300);

    variants = false;
    return
  }

});