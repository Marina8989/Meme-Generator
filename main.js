//for this project I used w3schools material provided about HTML Canvas
//https://www.w3schools.com/graphics/canvas_intro.asp
// and MDN :   https://developer.mozilla.org/en-US/docs/Web/API/FileReader

let topTextInput; 
let bottomTextInput;
let imageInput;
let btn;
let memeCanvas;
let ctx;


function memeGenerate(img, top, bottom) {
      memeCanvas.width = img.width;
      memeCanvas.height = img.height;
      
      
    //   .clearRect() - method clears the specified pixels within a given rectangle
    //  context.clearRect(x,y,width,height)
    // x - the x-coordinate of the upper-left corner of the rectangle to clear
    // y - the y-coordinate of the upper-left corner of the rectangle to clear
    // width - the width of the rectangle to clear, in pixels
    // height - the height of the rectangle to clear, in pixels
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);

    // .drawImage() - method draws an image, canvas, or video onto the canvas, parts of an image etc.
    // context.drawImage(img, x, y)
    // Position the image on the canvas, and specify width and height of the image
    // img - specifies teh image, canvas, or video element to use
    // x - the x coordinate where to place the image on the canvas
    // y - the y coordinate where to place the omage on the canvas
    ctx.drawImage(img, 0, 0);

    let fontSize = memeCanvas.width / 10;
    ctx.font = fontSize + 'px Schoolbell';
    // fillStyle - sets or returns the color, gradient, or pattersn used to fill the drawing
    //context.fillStyle = color|gradient|pattern
    //color - default value is #000
    //gradient - a gradient object (liner or radial) used to fill the drawing
    //pattern - a psttern object to use to fill the drawing
    ctx.fillStyle = 'red';
    
    //.lineWidth - sets or returns the current line width, in pixels
    //context.lineWidth = number
    ctx.lineWidth = fontSize / 10;
    //textAlign - sets or returns the current alignment for text content, according to the anchor point
    //context.textAlign = 'center|end|left|right|start;
    ctx.texAlign = 'center';

    //.textBaseline - sets or returns the current text baseline used when drawing text
    //context.textBaseline = "alphabetic|top|hanging|middle|ideographic|bottom";
    ctx.textBaseline = 'top';
    //if user wants to add text with new line it has to be split, in order to be displyed properly on page
    top.split("\n").forEach((text, i) => {
      //fillText() - method draws text on the canvas. The default color of the text is black
      //context.fillText(text, x, y, maxWidth)
      ctx.fillText(text, memeCanvas.width / 2, i * fontSize, memeCanvas.width);
      
    });
        //same thing is the bottom text, with one differense of having .reverse(), to make sure the text is displayed in order
      ctx.textBaseline = 'bottom';
      bottom.split('\n').reverse().forEach((text, i) => {
          ctx.fillText(text, memeCanvas.width / 2, memeCanvas.height - i * fontSize, memeCanvas.width);
      });
      
}


function init() {
   topTextInput = document.querySelector("#top");
   bottomTextInput = document.querySelector("#bottom");
   imageInput = document.querySelector("#image");
   btn = document.querySelector("#btn");
   memeCanvas = document.querySelector('#meme-canvas');


    // .getContext('2d') --> a built-in object, with methods and properties for drawing.
    ctx = memeCanvas.getContext('2d');
    memeCanvas.width = memeCanvas.height = 0;

    //add an event listener in order to create a new img obj and display it on screen
    btn.addEventListener('click', function() {
        //create a new obj and assign it to a variable.
        //This new variable will hold the image and attributes
        // I used this for refs:  https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        //this will readt the file off of the users computer
        
        let reader = new FileReader();
        reader.onload = function() {
            //create a new img obj and assign it to a variable
            let img = new Image();
            //set the source of the image
            img.src = reader.result;
             
            //call the function memeGenerate() and pass all the arguments neeeded
            memeGenerate(img, topTextInput.value, bottomTextInput.value);
     
            setTimeout(() => {
              topTextInput.value = "";
              bottomTextInput.value = "";
              
            }, 5000);
        };
        // The readAsDataURL method is used to read the contents of the specified Blob or File. When the read operation is finished, the readyState becomes DONE, and the loadend is triggered. At that time, the result attribute contains the data as a data: URL representing the file's data as a base64 encoded string.
        // found these resources at https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
       
        reader.readAsDataURL(imageInput.files[0]);
    
         let removeBtn = document.querySelector("#remove-btn");
         removeBtn.classList.toggle("remove");  
        
         const frame = document.querySelector('#canvas-frame');
         removeBtn.addEventListener('click', function(){
           frame.remove();
         });
    });

}
console.log(init());