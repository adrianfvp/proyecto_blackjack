
(() => {
    'use strict'


    let deck = [];
    const   tipos = ['c', 'd', 'p', 't'], 
            especiales = ['a', 'j', 'q', 'k'];

    let puntosJugadores = [];

    //REFERENCIAS HTML
    const   btnPedir = document.querySelector('#btnPedir'),
            btnPlantar = document.querySelector('#btnPlantar'),
            btnNuevo = document.querySelector('#btnNuevo');

    const   divCartasJugadores = document.querySelectorAll('.divCartas'),
            puntosHTML = document.querySelectorAll('strong');

    
    const iniciarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        for ( let i=0; i< numJugadores; i++ ) {
                puntosJugadores.push(0);
        }
    }

    // AQUI CREAMOS UNA NUEVA BARAJA MEZCLADA
    const crearDeck = () => {

        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for ( let tipo of tipos ) {
                deck.push( i + tipo );
            }
        }

        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push( esp + tipo );
            }
        } 
        return _.shuffle( deck );
    }


    // TOMAR UNA CARTA

    const pedirCarta = () => {

        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }
        
    // ASIGNACIÓN DE VALOR A LA CARTA
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ?
                ( valor === 'a' ) ? 11 : 10
                : valor * 1;
    }

    // Turno: 0 = jugador1 y el último siempre será la computadora
    
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta ); 
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append( imgCarta );

     }

     const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ){
                alert('Naide ha ganado');
            } else if( puntosMinimos > 21 ){
                alert('La computadora ha ganado')
            } else if( puntosComputadora > 21 ){
                alert('¡HAS GANADO, FELICIDADES!')
            } else{
                alert('Has perdido, intentalo de nuevo')
            }
        }, 100); 

     }
            



    // TURNO COMPUTADOR 
    const turnoComputador = ( puntosMinimos ) =>{

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta(); 
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
            crearCarta(carta, puntosJugadores.length -1)

        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    }
            
    // EVENTOS 

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(); 
        const puntosJugador = acumularPuntos( carta, 0);

        crearCarta(carta, 0);


        if ( puntosJugador > 21 ){
            console.warn('Lo siento, perdiste')
            btnPedir.disabled = true;
            btnPlantar.disabled = true;
            turnoComputador(puntosJugador);
        } else if( puntosJugador === 21 ){
            console.warn('Genial, tienes 21')
            btnPedir.disabled = true;
            btnPlantar.disabled = true;
            turnoComputador(puntosJugador);
        }


    });

    btnPlantar.addEventListener('click', () => {
        btnPedir.disabled =true;
        btnPlantar.disabled = true;

        turnoComputador(puntosJugador);
    })

    btnNuevo.addEventListener('click', () => {

        console.clear();
        iniciarJuego();
        
        // deck = [];
        // deck = crearDeck();

        // puntosJugador = 0;
        // puntosComputadora = 0;

        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;

        // divCartasComputadora.innerHTML = '';
        // divCartasJugador.innerHTML = '';

        // btnPedir.disabled = false;
        // btnPlantar.disabled = false;

})

})();









