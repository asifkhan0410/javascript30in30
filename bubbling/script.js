const divs = document.querySelectorAll('div');
  const button = document.querySelector('button');

  function logText(e) {
    console.log(this.classList.value);
    e.stopPropagation(); //this stops the propagation when the bubbling starts.
  }

  divs.forEach(div => div.addEventListener('click', logText, {
    capture: false, //helps to determine whether the capture will be fron inside to outside or vice-versa
    once: true //this allows an element to be clicked once.
  }));

  button.addEventListener('click', () => {
    console.log('Click!!!');
  }, {
    once: true
  }); // once is used in checkout pages when the user just needs to click once.