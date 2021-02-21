const divs = document.querySelectorAll('div');
  const button = document.querySelector('button');

  function logText(e) {
    console.log(this.classList.value);
    e.stopPropagation(); //this stops the propagation when the bubbling starts.
  }

  divs.forEach(div => div.addEventListener('click', logText, {
    capture: false, //helps to determine whether the capture will be fron inside to outside or vice-versa
  }));