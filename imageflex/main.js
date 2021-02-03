const panels = document.querySelectorAll(".panel");
      let activepanel;
      
      function toggleOpen(){
        activepanel= document.querySelector('.open.open-active');
          if(!activepanel){
              this.classList.toggle('open');
          }else{
            this.classList.toggle("open");
            activepanel.classList.remove('open')
          }
      }
      function toggleActive(e){
          if(e.propertyName.includes("flex")){
                this.classList.toggle('open-active');
          }
      }
      console.log(activepanel)
      panels.forEach(panel => panel.addEventListener('click', toggleOpen))
      panels.forEach(panel => panel.addEventListener('transitionend', toggleActive))
