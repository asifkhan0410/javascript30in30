window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
  recognition.interimResults = true; // gives immediated population of what we speak
  
  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p); //adding a p element

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results) // converting to array so that we can map
    .map(result => result[0]) // taking the first element
    .map(result => result.transcript) // pulling the transcript 
    .join(''); //converting it into  a long string

    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩'); //replaces words with poop emoji
      p.textContent = poopScript; // putting the content in p element

      if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
      }
  });

  recognition.addEventListener('end', recognition.start); //helps to break the line and calls the function again

  recognition.start();//starts the recognition