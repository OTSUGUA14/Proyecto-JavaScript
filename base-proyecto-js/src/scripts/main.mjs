import { getAllUsers } from "./users/getUsers.mjs";
import { addUser } from "./users/addUser.mjs";
import { getAllPost } from "./posts/getAllPost.mjs";
import { logInUser } from "./users/logIn.mjs";
import { getAllProducts } from "./productos/getAllProducts.mjs";
import { vali } from "./registro/valiRegistro.mjs";
import { valueRegex } from "./registro/valiRegistro.mjs";
import { getAllReciper } from "./recetas/getAllReciper.mjs";
import { getAllUser } from "./users/getAllUser.mjs";

window.onload = () => {
    getAllUsers();
    vali();

    // Cargar la última sección guardada
    const lastSection = loadLastSection();
    if (lastSection) {
   
        
        const sectionElement = document.querySelector(`#${lastSection}`);
        if (sectionElement) {
            toggleContainers(sectionElement);
            const sectionType = lastSection.replace("conter", "").toLowerCase();
            switchContainer(sectionType);
           
            
            loadSectionData(sectionType);  // Cargar los datos desde la API
            sectionElement.classList.remove("ocultar")
        }
    }
};


    

const $ = selector => document.querySelector(selector)

// ____FORM______ 
const $btnFormRegistro = $('.registro')
const $btnFormInicio = $('.inicio')
const $Registrar = $('#btn-registro')
const $btnLogIn = $('#btn-login')

// _______FORM REGISTRO INPUT_________
const $nombre = $('#nombre')
const $apellido = $('#apellido')
const $usuario = $('#usuario')
const $password = $('#password')

// _______FORM LOGIN INPUT_________
const $logInUser = $('#login-user')
const $logInPassword = $('#login-password')

// _______SELECTOR HOME  = YA INICIADO_________
const $home = $(".r-s")
const $sectionHome = $("#sect-home")

// ______NAV_________ 
const $btnRegistrarse = $('#registrarse')
const $btnIniciar = $('#iniciar-sesion')
const $btnPosts = $('#show-posts')
const $btnReceta = $('#show-recetas')
const $btnProducto = $('#show-products')
const $btnUser = $('#show-users')
const $btnCerrarSesion = $('#cerrar-sesion')
const $More=$('.cta')
const $Less=$('.cta1')


// ______CONTENEDOREs_________ 
const $conterPro=$('#products')
const $conterRece=$('#recipes')
const $conterUser=$('#users')
const $conterPost=$('#posts')
const $conterArrow=$('#arrow')



// Nueva función para cargar datos al restaurar una sección
const loadSectionData = (sectionType) => {
    switch (sectionType) {
        case 'posts':
            getAllPost(counters['post']);
            break;
        case 'products':
            getAllProducts(counters['product']);
            break;
        case 'recipes':
            getAllReciper(counters['recipes']);
            break;
        case 'users':
            getAllUser(counters['user']);
            break;
        default:
            console.log("No se encontró la sección.");
    }
};
// Función para guardar la última sección activa en localStorage
const saveLastSection = (section) => {
    localStorage.setItem('lastSection', section);
};

// Función para cargar la última sección desde localStorage
const loadLastSection = () => {
    return localStorage.getItem('lastSection');
};

// Modifica toggleContainers para guardar la sección
const toggleContainers = (visibleContainer) => {
    $conterArrow.classList.remove("ocultar");
    const containers = [$conterPost, $conterPro, $conterRece, $conterUser];
    containers.forEach(container => container.classList.add("ocultar"));
    if (visibleContainer) {
        visibleContainer.classList.remove("ocultar");
        // Guardar la sección visible en localStorage
        saveLastSection(visibleContainer.id);  // Guarda el ID de la sección visible
    }
};

// Restaurar la última sección al cargar la página

// Objeto para almacenar el valor de 'cant' para cada contenedor
const counters = {
    post: 0,
    product: 0,
    recipe: 0,
    user: 0
};

// Array para mapear los contenedores con sus funciones y contadores
const containers = [
    { element: $conterPost, type: 'post', fetchFunction: getAllPost },
    { element: $conterPro, type: 'product', fetchFunction: getAllProducts },
    { element: $conterRece, type: 'recipe', fetchFunction: getAllReciper },
    { element: $conterUser, type: 'user', fetchFunction: getAllUser }
];

// Función para validar si un contenedor está activo (no oculto)
const getActiveContainer = () => {
    return containers.find(container => !container.element.classList.contains("ocultar"));
};

// Función para actualizar la visibilidad de los botones (Less/More)
const updateButtonsVisibility = (cant) => {
    console.log(counters);
    
    if (cant >= 8) {
        $Less.classList.remove("ocultar");
    } else {
        $Less.classList.add("ocultar");
    }
};

// Evento para "More", que incrementa el contador del contenedor activo
$More.addEventListener('click', () => {
    const activeContainer = getActiveContainer();
    if (activeContainer) {
        counters[activeContainer.type] += 8;  // Incrementa el contador correspondiente
        activeContainer.fetchFunction(counters[activeContainer.type]);  // Llama a la función con el nuevo contador
        updateButtonsVisibility(counters[activeContainer.type]);  // Actualiza visibilidad de botones
    }
});

// Evento para "Less", que decrementa el contador del contenedor activo
$Less.addEventListener('click', () => {
    const activeContainer = getActiveContainer();
    if (activeContainer && counters[activeContainer.type] >= 8) {
        counters[activeContainer.type] -= 8;  // Decrementa el contador correspondiente
        activeContainer.fetchFunction(counters[activeContainer.type]);  // Llama a la función con el nuevo contador
        updateButtonsVisibility(counters[activeContainer.type]);  // Actualiza visibilidad de botones
    }
});

// Función para cambiar de contenedor sin resetear el valor de `cant`
const switchContainer = (containerType) => {
    containers.forEach(container => {
        if (container.type === containerType) {
            container.element.classList.remove("ocultar");  // Muestra el contenedor
            container.fetchFunction(counters[containerType]);  // Carga los datos con el contador guardado
        } else {
            container.element.classList.add("ocultar");  // Oculta los demás contenedores
        }
    });
};

// Eventos para cambiar de contenedor
$btnReceta.addEventListener('click', () => {
    updateButtonsVisibility(counters["recipe"]);
    toggleContainers($conterRece);
    switchContainer('recipe');  // Cambiar al contenedor de recetas
});

$btnPosts.addEventListener('click', () => {
    updateButtonsVisibility(counters["post"]);
    toggleContainers($conterPost);
    switchContainer('post');  // Cambiar al contenedor de posts
});

$btnProducto.addEventListener('click', () => {
    updateButtonsVisibility(counters["product"]);
    
    toggleContainers($conterPro);
    switchContainer('product');  // Cambiar al contenedor de productos
});

$btnUser.addEventListener('click', () => {
    updateButtonsVisibility(counters["user"]);

    toggleContainers($conterUser);
    switchContainer('user');  // Cambiar al contenedor de usuarios
});

// Manejo nuestro estado de LOGIN.

if(!localStorage.getItem('stateLogin')){
    localStorage.setItem('stateLogin', JSON.stringify({
            state: false,
            user:{
                firstName : "",
                lastName : "",
                username:"",
                email:"",
                image:"",
                cart: []
            }
    }))
}else{
    console.log("Ya está creado el stateLogin");
}



export let logInState = JSON.parse(localStorage.getItem('stateLogin'))

if(logInState.state){
    
    $btnFormInicio.classList.add('ocultar')
        $home.classList.remove('ocultar')
        $btnReceta.classList.remove('ocultar')
        $btnProducto.classList.remove('ocultar')
        $btnUser.classList.remove('ocultar')
        $btnCerrarSesion.classList.remove('ocultar')
        $btnRegistrarse.classList.add('ocultar')
        $btnIniciar.classList.add('ocultar')
        $btnPosts.classList.remove('ocultar')
        $sectionHome.classList.remove('ocultar')
        $sectionHome.innerHTML = `
        <img src=${logInState.user.image} alt="">
		<h1>WELCOME <span id="home-name-user">${logInState.user.firstName}</span></h1>
        `
}

// ____________EVENTOS__________________

// _________ BTN NAV - SECCION REGISTRO __________

$btnRegistrarse.addEventListener('click', () =>{
    $btnFormRegistro.classList.remove('ocultar')
    $btnFormInicio.classList.add('ocultar')
    
})

// _________ BTN NAV - SECCION INICIO __________

$btnIniciar.addEventListener('click', () =>{

    $btnFormRegistro.classList.add('ocultar')
    $btnFormInicio.classList.remove('ocultar')

})


// ________ REGISTRAR UN USUARIO ______________
$Registrar.addEventListener('click', (e) => {
    e.preventDefault();
    if(valueRegex.nombre && valueRegex.apellido && valueRegex.edad && valueRegex.usuario && valueRegex.password && valueRegex.repetir && valueRegex.email){
        addUser($nombre.value, $apellido.value, $usuario.value, $password.value)
        alert('El registro fue exitoso')
        $nombre.value = ""
        $apellido.value = ""
        $usuario.value = ""
        $password.value = ""
        $btnFormRegistro.classList.add('ocultar')
        $btnFormInicio.classList.remove('ocultar')
    }
})





// ___________ FORM LOGIN __________ ( OBTENEMOS LOS DATOS PASADOS POR LOGIN Y COMPARAMOS)

$btnLogIn.addEventListener('click', (e) => {
    e.preventDefault();
    let resLogIn = logInUser($logInUser.value, $logInPassword.value)
    if(resLogIn){
        $btnFormInicio.classList.add('ocultar')
        $home.classList.remove('ocultar')
        $btnReceta.classList.remove('ocultar')
        $btnProducto.classList.remove('ocultar')
        $btnUser.classList.remove('ocultar')
        $btnCerrarSesion.classList.remove('ocultar')
        $btnRegistrarse.classList.add('ocultar')
        $btnIniciar.classList.add('ocultar')
        $sectionHome.classList.remove('ocultar')
        $btnPosts.classList.remove('ocultar')
        $sectionHome.innerHTML = `
        <img src=${logInState.user.image} alt="">
		<h1>Welcome <span id="home-name-user">${logInState.user.firstName}</span></h1>
        ` 

        $logInPassword.value = ""
        $logInUser.value = ""
    }else{
        alert('Contraseña/Usuario incorrecta')
    }
    
})

// __________ CERRAR SESION ______ (RESETEAMOS LOGINSTATE)

$btnCerrarSesion.addEventListener('click', () => {
    $btnFormInicio.classList.remove('ocultar')
        $home.classList.add('ocultar')
        $btnReceta.classList.add('ocultar')
        $btnProducto.classList.add('ocultar')
        $btnUser.classList.add('ocultar')
        $btnCerrarSesion.classList.add('ocultar')
        $btnRegistrarse.classList.remove('ocultar')
        $btnIniciar.classList.remove('ocultar')
        $sectionHome.classList.add('ocultar')
        $btnPosts.classList.add('ocultar')
        handleLogInState()

        console.log(logInState);
})





// _____________ FUNCION PARA GUARDAR DATOS DE USUARIO QUE INICIO SESION _________
export const handleLogInState = (firstName = "", lastName = "", username = "", email = "", image = "", state = false) => {
    logInState.state = state
    logInState.user.firstName = firstName
    logInState.user.lastName = lastName
    logInState.user.username = username
    logInState.user.email = email
    logInState.user.image = image
    localStorage.setItem('stateLogin', JSON.stringify(logInState))
}


