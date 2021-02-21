const nav = document.querySelector('#main');
    let topOfNav = nav.offsetTop; //gives the height of top top of nav

    function fixNav() {
      if (window.scrollY >= topOfNav) {
        document.body.style.paddingTop = nav.offsetHeight + 'px'; //this adds a padding by calculating the height of the nav as when an element gets sticky the space it acquires gets vanished so the below elemts gets pushed up.
        document.body.classList.add('fixed-nav'); //adding a class to body helps in using it throughout the body elemets
      } else {
        document.body.classList.remove('fixed-nav');
        document.body.style.paddingTop = 0;
      }
    }

    window.addEventListener('scroll', fixNav);