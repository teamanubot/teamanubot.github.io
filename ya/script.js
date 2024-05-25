document.getElementById('downloadBtn').addEventListener('click', function() {
    const gif = new GIF({
      workers: 2,
      quality: 10
    });
  
    const lngkrn = document.querySelector('.lngkrn');
    const rect = lngkrn.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');
  
    let startTime = null;
    const duration = 10000;
  
    function captureFrame(time) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      lngkrn.style.animation = 'none';
      lngkrn.style.transform = `rotate(${-360 * (elapsed / duration)}deg)`;
      const img = lngkrn.querySelector('img');
      img.style.animation = 'none';
      img.style.transform = `translateY(${(-5 + 15 * (elapsed % 600) / 600)}%)`;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(lngkrn, 0, 0, canvas.width, canvas.height);
  
      gif.addFrame(ctx, {copy: true, delay: 1000 / 60});
  
      if (elapsed < duration) {
        requestAnimationFrame(captureFrame);
      } else {
        gif.render();
      }
    }
  
    gif.on('finished', function(blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'animation.gif';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  
    requestAnimationFrame(captureFrame);
  });  