const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(localMediaStream => {
        console.log(localMediaStream);        
        if ('srcObject' in video) {
            video.srcObject = localMediaStream;
        } else {
            // Avoid using this in new browsers, as it is going away.
            video.src = URL.createObjectURL(localMediaStream);
        }
        video.play();
      })
      .catch(err => {
        console.error(`OH NO!!!`, err);
      });
  }

  function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
  
    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
    }, 10);
  }

  function takePhoto() {
    // played the sound
    snap.currentTime = 0;
    snap.play();
  
    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');    
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsomebuoy');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);
  }

  getVideo();

  video.addEventListener('canplay', paintToCanvas);