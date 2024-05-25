document.getElementById('downloadBtn').addEventListener('click', function() {
  console.log('Download button clicked'); // Log untuk memastikan tombol berfungsi

  const gif = new GIF({
    workers: 2,
    quality: 10,
    width: 200,
    height: 200,
    workerScript: 'https://cdn.jsdelivr.net/npm/gif.js.optimized/dist/gif.worker.js' // Ubah jalur sesuai dengan CDN yang Anda gunakan
  });

  const animationElement = document.getElementById('animation');
  const duration = 10000; // 10 seconds
  const fps = 10; // Frames per second
  const totalFrames = (duration / 1000) * fps;
  let frame = 0;

  function captureFrame() {
    html2canvas(animationElement, { backgroundColor: null, willReadFrequently: true }).then(canvas => {
      gif.addFrame(canvas, { copy: true, delay: 1000 / fps });
      frame++;
      console.log(`Captured frame ${frame} of ${totalFrames}`); // Log untuk melihat proses capture frame
      if (frame < totalFrames) {
        requestAnimationFrame(captureFrame);
      } else {
        console.log('Rendering GIF'); // Log untuk memastikan render GIF mulai
        gif.render();
      }
    }).catch(error => {
      console.error('Error capturing frame:', error); // Log jika ada error saat menangkap frame
    });
  }

  gif.on('finished', function(blob) {
    console.log('GIF rendering finished'); // Log untuk memastikan render GIF selesai
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
