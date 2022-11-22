
let deck = [];
const tipos = ['c', 'd', 'p', 't'];
const especiales = ['a', 'j', 'q', 'k'];

let puntosJugador = 0,
    puntosComputadora = 0;

//REFERENCIAS HTML
const btnPedir = document.querySelector('#btnPedir');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas')
const puntosHTML = document.querySelectorAll('strong');

// AQUI CREAMOS UNA NUEVA BARAJA MEZCLADA
const crearDeck = () => {

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
    deck = _.shuffle( deck );
    return deck
}

crearDeck();

// TOMAR UNA CARTA

const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    return carta

}

pedirCarta();

// ASIGNACIÓN DE VALOR A LA CARTA

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ?
            ( valor === 'a' ) ? 11 : 10
            : valor * 1;
}

// TURNO COMPUTADOR 
const turnoComputador = ( puntosMinimos ) =>{
    do {
        const carta = pedirCarta(); 

        puntosComputadora = puntosComputadora + valorCarta( carta ); 
        puntosHTML[1].innerText = puntosComputadora;

        // <img class="carta" src="./assets/cartas/10c.png"></img> //

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

    } while( puntosComputadora < puntosMinimos )
}

// EVENTOS 

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta(); 

    puntosJugador = puntosJugador + valorCarta( carta ); 
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="./assets/cartas/10c.png"></img> //

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ){
        console.warn('Lo siento, perdiste')
        btnPedir.disabled = true
    } else if( puntosJugador === 21 ){
        console.warn('Genial, tienes 21')
        btnPedir.disabled = true
    }


});


