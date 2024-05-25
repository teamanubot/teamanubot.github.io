document.getElementById('downloadBtn').addEventListener('click', function() {
    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: 200,
      height: 200
    });
  
    const animationElement = document.getElementById('animation');
    const duration = 10000;
    const fps = 10;
    const totalFrames = (duration / 1000) * fps;
    let frame = 0;
  
    function captureFrame() {
      html2canvas(animationElement, { backgroundColor: null }).then(canvas => {
        gif.addFrame(canvas, { copy: true, delay: 1000 / fps });
        frame++;
        if (frame < totalFrames) {
          requestAnimationFrame(captureFrame);
        } else {
          gif.render();
        }
      });
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
  
    captureFrame();
  });  