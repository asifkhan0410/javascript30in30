const canvas= document.querySelector('#draw');
    const clear = document.querySelector('.clear');
    const inputmin = document.querySelector('#minwidth');
    const inputmax = document.querySelector('#maxwidth');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.strokeStyle= 'BADA55';
    ctx.lineJoin = 'round'
    ctx.lineCap= 'round'
    let minwidth=inputmin.value;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue =0;
    let direction= true;
    let maxwidth =inputmax.value;

    function clearUp(){ctx.clearRect(0,0, canvas.width, canvas.height);}    
    function handleMin(){minwidth = this.value;}
    function handleMax(){maxwidth= this.value;}

    ctx.lineWidth= minwidth;

    function draw(e){
        if(!isDrawing) return; //stop the fn when mouse is not down
        ///console.log(e)
        ctx.strokeStyle= `hsl(${hue},100%,50%)`
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
        [lastX,lastY]=[e.offsetX,e.offsetY];

        hue++;
        if(hue>=360){hue=0;}
        if(ctx.lineWidth>=maxwidth || ctx.lineWidth <minwidth){direction= !direction;}

        if(direction){ctx.lineWidth++;}
        else{ctx.lineWidth--;}
        //console.log(ctx.lineWidth)
    }
    
    inputmin.addEventListener('change', handleMin);
    inputmax.addEventListener('change',handleMax);
    canvas.addEventListener('mousedown',(e) => {
        isDrawing=true;
        [lastX,lastY]=[e.offsetX,e.offsetY];
    });
    canvas.addEventListener('mousemove',draw);
    
    canvas.addEventListener('mouseup',()=> {
        isDrawing=false
        hue=0;
    });
    canvas.addEventListener('mouseout',()=> {
        isDrawing=false
        hue=0;
    });
    clear.addEventListener('click', clearUp);