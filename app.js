const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const generateMemeBtn = document.getElementById('generateMemeBtn');
const postOnTwitterBtn = document.getElementById('postOnTwitterBtn');

const currentImage = new Image();
currentImage.src = '/images/Image1.png'; // Set the default image source if needed

function drawText() {
  const topText = topTextInput.value;
  const bottomText = bottomTextInput.value;

  ctx.font = '48px Impact';
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.textAlign = 'center';
  ctx.fillText(topText, canvas.width / 2, 50);
  ctx.strokeText(topText, canvas.width / 2, 50);
  ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
  ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
  drawText();
}

function loadImage(src) {
  currentImage.src = src;
  currentImage.onload = updateCanvas;
}

document.querySelectorAll('.img-thumbnail').forEach(img => {
  img.addEventListener('click', function() {
    loadImage(this.dataset.src);
  });
});

topTextInput.addEventListener('input', updateCanvas);
bottomTextInput.addEventListener('input', updateCanvas);

generateMemeBtn.addEventListener('click', function() {
  // Save the image
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/jpeg');
  link.download = 'meme.jpg';
  link.click();
});


// Add a click event listener to the canvas to save the image when clicked
canvas.addEventListener('click', function() {
    saveMeme();
  });
  
  
  
  // Function to save the meme
  function saveMeme() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'meme.jpg';
    link.click();
  }
  