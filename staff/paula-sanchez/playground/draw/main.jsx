const rootElement = document.getElementById('root') // obtiene el nodo del DOM real
const root = ReactDOM.createRoot(rootElement) // crea la raíz de React

function WazowskiEye() { 
    return <div class="w-30 h-30 bg-white absolute left-15 top-10 rounded-full"> /* contenedor del ojo blanco */
        <div class="w-10 h-10 bg-[darkblue] absolute left-10 top-10 rounded-full"></div> /* pupila azul */
    </div> 
}

function WazowskiMouth() { 
    return <div class="w-30 h-5 bg-black absolute left-15 bottom-10"></div> /* boca negra */
}

function WazowskiHead() { 
    return <div class="w-60 h-60 bg-[yellowgreen] absolute rounded-full p-10"> /* cabeza verde */
        <WazowskiEye /> /* ojo */
        <WazowskiMouth /> /* boca */
    </div> 
}

function PigEyeLeft() { 
    return <div class="w-40 h-40 bg-white absolute left-5 top-5"> /* ojo izquierdo blanco */
        <div class="w-20 h-20 bg-black absolute left-10 top-10"></div> /* pupila negra */
    </div> 
}

function PigEyeRight() { 
    return <div class="w-40 h-40 bg-white absolute right-5 top-5"> /* ojo derecho blanco */
        <div class="w-20 h-20 bg-black absolute left-10 top-10"></div> /* pupila negra */
    </div> 
}

function PigNose() { 
    return <div class="w-50 h-30 bg-[palevioletred] absolute left-25 top-50"> /* nariz cerdito */
        <div class="w-10 h-10 bg-black absolute left-10 top-10"></div> /* agujero izquierdo */
        <div class="w-10 h-10 bg-black absolute right-10 top-10"></div> /* agujero derecho */
    </div> 
}

function PigMouth() { 
    return <div class="w-30 h-10 bg-black absolute left-35 bottom-5"></div> /* boca cerdito */
}

function PigEarLeft() { 
    return <div class="w-10 h-40 bg-pink-300 absolute -left-10"></div> /* oreja izquierda */
}

function PigEarRight() { 
    return <div class="w-10 h-40 bg-pink-300 absolute -right-10"></div> /* oreja derecha */
}

function PigHead() { 
    return <div class="w-100 h-100 bg-pink-300 absolute left-100 top-100"> /* cabeza cerdito */
        <PigEyeLeft /> /* ojo izquierdo */
        <PigEyeRight /> /* ojo derecho */
        <PigNose /> /* nariz */
        <PigMouth /> /* boca */
        <PigEarLeft /> /* oreja izquierda */
        <PigEarRight /> /* oreja derecha */
    </div> 
}

function SpaceShip() { 
    return <div class="w-50 h-100 bg-[lightgray] absolute left-100 top-300"> /* nave principal */
        <div class="w-50 h-100 bg-[lightgray] absolute left-0 -top-50 rounded-full"></div> /* cuerpo de la nave */
        <div class="w-30 h-15 bg-[aqua] absolute left-10 -top-20 rounded-tl-3xl rounded-tr-3xl"></div> /* ventana superior */
        <div class="w-[37.5rem] h-0 bg-transparent absolute -left-50 bottom-0 border-t-[10rem] border-t-transparent border-b-[12.5rem] border-b-[lightgray] border-l-[12.5rem] border-l-transparent border-r-[12.5rem] border-r-transparent"> /* parte triangular inferior */
            <div class="w-10 h-40 bg-gray-600 absolute top-10 left-20"></div> /* torre/estructura interna */
        </div>
        <div class="w-70 h-100 bg-[gold] absolute -left-10 -bottom-50 rounded-full -z-10"> /* propulsión dorada */
            <div class="w-40 h-60 bg-[tomato] absolute left-15 bottom-20 rounded-full z-10"></div> /* núcleo propulsión rojo */
        </div>
    </div> 
}

root.render([<WazowskiHead />, <PigHead />, <SpaceShip />]) // renderiza los tres elementos en pantalla
