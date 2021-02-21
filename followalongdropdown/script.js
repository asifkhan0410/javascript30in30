const triggers = document.querySelectorAll('.cool > li');
  const background  = document.querySelector('.dropdownBackground');
  const nav  = document.querySelector('.top');

  function handleEnter(){
    this.classList.add('trigger-enter');
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
    background.classList.add('open');
  }

  function handleLeave(){
    this.classList.remove('trigger-enter');
    background.classList.remove('open');
  }

  triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
  triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));