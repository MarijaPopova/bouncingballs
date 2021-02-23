# bouncingballs

 Bouncing balls simulation using JavaScript, CSS and HTML. (no third party libraries are used) . 
 
 User interaction: new ball is fired when the user clicks on the playground.
 Ball could be in random dimension, color and speed. 
 More balls could be present on the screen at the same time. 
 Edge case: if the ball is near to the right bottom corner of the playground, disapears. 
 
 
Instructions how to try this out locally: 

1. Install NodeJS following the instructions on their website.
2. Download this repository.
3. Open your terminal and run npm install.
4. Install mocha in this project npm install mocha.
5. Run npm start and navigate to localhost:1234 in your browser.


Testing
Mocha framework is used for unit testing. 
Run the tests from this project npm test.


Code structure: 
src - root 
  index.html - a simple HTML page, JS and CSS files are imported and the choices and canvas are defined here.
  css/styles.css - used to define media queries (for responsiveness), and other very simple CSS rules.
  js/playground.js - handles the user interaction (on every mouse click adds new ball) 
  js/balls.js -how the ball is bouncing, in which direction disapears
test 
  balls.js-test testing the object ball. 




