let intervalId; 
let selected = "";
let errores  = 0;

shuffleArray = (array) => {
    for ( let i = array.length - 1; i > 0; i-- ) 
    {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
  }

function createHTMLStructure() 
{
    document.getElementById("Contenedores").innerHTML = "";

    const imagenes           = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];
    const imagenesDuplicadas = [...imagenes, ...imagenes];

    shuffleArray(imagenesDuplicadas);

    for ( let i = 1; i <= 3; i++ ) 
    {
      const contenedor     = document.createElement('div');
      contenedor.className = 'Contenedor';
  
      for ( let j = 1; j <= 4; j++ ) 
      {
        const flip     = document.createElement('div');
        flip.className = `flip flipSize flip_${4 * (i - 1) + j}`;
  
        flip.onclick = clickflipped;
          
        const img1     = document.createElement('img');
        img1.src       = 'img/question.png';
        img1.className = 'flip-1';

        const nameImg = imagenesDuplicadas.pop();

        const img2     = document.createElement('img');
        img2.src       = `img/${nameImg}`;
        img2.className = 'flip-2';

        flip.setAttribute( "nameimg", nameImg );
  
        flip.appendChild( img1 );
        flip.appendChild( img2 );
        
        contenedor.appendChild( flip );
      }
  
      document.getElementById("Contenedores").appendChild(contenedor);
    }
}

function clickflipped()
{
    this.classList.toggle('flipped');

    const att = this.getAttribute('nameimg');

    if( selected == "" )
    {
        selected = att;
    }
    else if ( selected == att )
    {
        const elementos = Array.from( document.getElementsByClassName('flipped') );

        for ( let i = 0; i < elementos.length; i++ ) 
        {
            var _att = elementos[i].getAttribute('nameimg');
			
            if ( _att == att || _att == selected )
            {
                elementos[i].onclick = null;
            }
        }    
		
        selected = "";

        if( elementos.length == 12 )
        {
            stopChronometer();
            setTimeout( () => alert( "Successful Game" ), 100);
        }
    }
    else
    {
        setTimeout( () => 
		{
            const elementos = Array.from(document.getElementsByClassName('flipped'));

            let isError = false;
            for ( let i = 0; i < elementos.length; i++ ) 
            {
                var _att = elementos[i].getAttribute('nameimg');
				
                if ( _att == att || _att == selected )
                {
                    elementos[i].classList.toggle('flipped')
                    isError = true;
                    
                }
            }
			
            if( isError )
            {
                errores += 1;
                document.getElementById('totalErrores').textContent = errores;
            }

            selected = "";
			
        }, 1000);
    }
}

function formatTime(seconds) {
    const hours            = Math.floor(seconds / 3600);
    const minutes          = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours   = hours   < 10 ? `0${hours}`   : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function startChronometer() {
    let seconds = 0;

    selected = "";
    errores  = 0;
    
    document.getElementById('totalErrores').textContent = errores;

    createHTMLStructure();
    habilitaDiv();

    intervalId = setInterval(() => 
    {
        seconds++;
        document.getElementById('cronometro').innerText = formatTime(seconds);
    }, 1000);
}

function stopChronometer() 
{
    clearInterval(intervalId);
    deshabilitaDiv();
}

function habilitaDiv()
{
    var c = document.getElementById("Contenedores");

    c.style.pointerEvents = 'auto';
    c.style.opacity = '1';

    document.getElementById('startButton').disabled = true;
}

function deshabilitaDiv()
{
    var c = document.getElementById("Contenedores");

    c.style.pointerEvents = 'none';
    c.style.opacity = '0.5';

    document.getElementById('startButton').disabled = false;
}

createHTMLStructure();
deshabilitaDiv();

