$(document).ready(function() {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    
    const imageThumbnails = document.querySelectorAll('.img-thumbnail');
    const topTextInput = document.getElementById('topText');
    const bottomTextInput = document.getElementById('bottomText');
    const generateMemeBtn = document.getElementById('generateMeme');
    
    let currentImage = new Image();
    
    function loadImage(src) {
        currentImage.src = src;
        currentImage.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
            drawText();
        };
    }
    
    function drawText() {
        const topText = topTextInput.value;
        const bottomText = bottomTextInput.value;
        
        ctx.font = '40px Impact';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        
        ctx.fillText(topText, canvas.width / 2, 50);
        ctx.strokeText(topText, canvas.width / 2, 50);
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
    }

    imageThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            loadImage(thumbnail.dataset.src);
        });
    });

    // Replace the previous event listener with this one
postOnTwitterBtn.addEventListener('click', async function() {
    // Save the image as a data URL
    const dataURL = canvas.toDataURL('image/jpeg');
  
    // Convert the data URL to a Blob
    const response = await fetch(dataURL);
    const blob = await response.blob();
  
    // Create an instance of the IPFS HTTP client
    const ipfs = window.IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  
    // Add the image to IPFS
    const { path } = await ipfs.add(blob);
  
    // Construct the public IPFS URL
    const publicURL = `https://ipfs.io/ipfs/${path}`;
  
    // Construct the tweet
    const tweetText = encodeURIComponent('Check out my meme! @meetnippy');
    const tweetURL = `https://twitter.com/intent/tweet?url=${publicURL}&text=${tweetText}`;
  
    // Open the tweet dialog in a new window
    window.open(tweetURL, '_blank');
  });
  

    topTextInput.addEventListener('focus', function() {
        this.value = '';
      });
      
      bottomTextInput.addEventListener('focus', function() {
        this.value = '';
      });
      

      generateMemeBtn.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
        drawText();
      
        // Save the image
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'meme.jpg';
        link.click();
      });
      
    

    loadImage(imageThumbnails[0].dataset.src);
});
