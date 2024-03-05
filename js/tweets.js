//declarar los Selectores
const formulario = document.querySelector('#formulario');
const listaTweets =document.querySelector('#lista-tweets');
//estructura para almacenar los tweets
let tweets = [];


//eventos
eventListener()
function eventListener(){
    formulario.addEventListener('submit',agregarTweet)
}

function agregarTweet(e){
    e.preventDefault()
    //console.log('ingrese a la funcion')

    const tweet = document.querySelector('#tweet').value;
    //console.log(tweet)
    
    
    //validacion
    if(tweet.length > 50){
        mostrarError('el tweet no puede se mayor a 50 caracteres')
        return
    }
    if(tweet===""){
        //console.log('campo vacio')
        mostrarError('El tweet no puede estar vacio')
        return
    }else{
        //crear obj
        const tweetObj ={
            tweet : tweet,
            id:Date.now()
        }
        
            tweets = [...tweets,tweetObj]
            console.log(tweets)

            crearHTML();
            formulario.reset()
    }


  //mostrar error al usuario en pantalla
    function mostrarError(mensaje){
        const mensajeError= document.createElement('p')
        mensajeError.textContent= mensaje
        mensajeError.classList.add('error')
        //insertar el mensaje error 
        const contenido = document.querySelector('#contenido')
        contenido.appendChild(mensajeError);

        //eliminar la alerta despues de 3 segundos

        setTimeout(()=>{
            mensajeError.remove()
        },3000)
    }

}

function crearHTML(){
    //console.log('ingrese a la funcion crearhtml')
    limpiarHTML();
    //mostrar informacion en el arreglo de tweets

    if(tweets.length > 0){
        // ak menos hay un twwet guardado en el arregol creo y muestroel html

        //recorrer el arreglo

        tweets.forEach(tweets=>{
            const li =document.createElement('li');
            const btnEliminar =document.createElement('a');
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerText='X';

            btnEliminar.onclick=()=>{
                borrarTweet(tweets.id)
            }

            li.innerText = tweets.tweet
            li.appendChild(btnEliminar)
            listaTweets.appendChild(li)
        })
    }
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

function borrarTweet(id){
    tweets = tweets.filter(tweets=> tweets.id !== id)
    crearHTML()
}