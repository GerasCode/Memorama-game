shuffleArray = (array) => {
    for ( let i = array.length - 1; i > 0; i-- ) 
    {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
  }

function createHTMLStructure() 
{
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
        flip.className = `flip flip_${4 * (i - 1) + j}`;
  
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

let selected = "";

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
            setTimeout( () => alert( "Successful Game" ), 100);
        }
    }
    else
    {
        setTimeout( () => 
		{
            const elementos = Array.from(document.getElementsByClassName('flipped'));

            for ( let i = 0; i < elementos.length; i++ ) 
            {
                var _att = elementos[i].getAttribute('nameimg');
				
                if ( _att == att || _att == selected )
                {
                    elementos[i].classList.toggle('flipped')
                }
            }
			
            selected = "";
			
        }, 1000);
    }
}

createHTMLStructure();