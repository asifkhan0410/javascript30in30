const triggers = document.querySelectorAll('.cool > li');
  const background  = document.querySelector('.dropdownBackground');
  const nav  = document.querySelector('.top');

  function handleEnter(){
    this.classList.add('trigger-enter'); // we are adding two classes so as to get a transition effect as we hover
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150); //this adds the second class after checking whether the first class is added after 150ms
    background.classList.add('open'); //this brings the followalong functionality
  }

  function handleLeave(){
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
  }

  triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
  triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));