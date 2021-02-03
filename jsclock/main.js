const secondHand = document.querySelector('.second-hand');
            const minsHand = document.querySelector('.minute-hand');
            const hourHand = document.querySelector('.hour-hand');
            const digitaltime= document.getElementById("digitaltime");

            function setDate() {
                const now = new Date();
                //console.log(now);
                let seconds = now.getSeconds();
                const secondsDegrees = ((seconds / 60) * 360) + 90;
                secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

                let mins = now.getMinutes();
                const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
                minsHand.style.transform = `rotate(${minsDegrees}deg)`;

                const hour = now.getHours();
                const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
                hourHand.style.transform = `rotate(${hourDegrees}deg)`;

                if(seconds==0){
                    secondHand.style.transition = none;
                }
                let ampm="AM";
                let updatedhour = 0;
                if(hour>= Number(12)){
                    updatedhour= hour- Number(12);
                    ampm="PM";
                }
                if(mins<9){
                    mins="0"+mins;
                }
                if(seconds<9){
                    seconds="0"+seconds
                }

                digitaltime.innerHTML = updatedhour + ":" + mins + ":" + seconds + ampm; 
            }

            setInterval(setDate, 1000);

            setDate();
