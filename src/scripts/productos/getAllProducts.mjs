// Función asíncrona para agregar un producto
const agregar = async (id) => {
    // Realiza una solicitud para obtener el producto por su ID
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    // Extrae el precio del producto de la respuesta JSON
    const { price } = await res.json();
    
    // Selecciona el elemento que muestra la cantidad del producto
    var cantidad = document.querySelector(`.card2__counter-score${id}`);
    
    // Modifica la cantidad del producto
    var actual = parseFloat(cantidad.textContent, 10); // Convierte el texto a número
    actual++; // Aumenta la cantidad en 1
    cantidad.textContent = actual; // Actualiza el texto en el DOM
    
    // Modifica el total del precio según la cantidad seleccionada
    let precio = parseFloat(price, 10); // Convierte el precio a número
    console.log(precio); // Muestra el precio en la consola
    var preci = document.querySelector(`.card2__price${id}`); // Selecciona el elemento del precio
    
    // Actualiza el precio total en el DOM
    preci.textContent = `$${(precio * actual).toFixed(2)}`; // Calcula y formatea el precio
}

// Función asíncrona para quitar un producto
const quitar = async (id) => {
    // Realiza una solicitud para obtener el producto por su ID
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    // Extrae el precio del producto de la respuesta JSON
    const { price } = await res.json();
    
    // Selecciona el elemento que muestra la cantidad del producto
    var cantidad = document.querySelector(`.card2__counter-score${id}`);
    
    // Modifica la cantidad del producto
    var actual = parseFloat(cantidad.textContent, 10); // Convierte el texto a número
    if (actual != 1) { // Evita que la cantidad sea menor a 1
        actual--; // Disminuye la cantidad en 1
    }
    cantidad.textContent = actual; // Actualiza el texto en el DOM
    
    // Modifica el precio total según la cantidad seleccionada
    let precio = parseFloat(price, 10); // Convierte el precio a número
    var preci = document.querySelector(`.card2__price${id}`); // Selecciona el elemento del precio
    
    // Actualiza el precio total en el DOM
    preci.textContent = `$${(precio * actual).toFixed(2)}`; // Calcula y formatea el precio
}

// Función asíncrona para obtener todos los productos
export const getAllProducts = async (salt) => {
    document.querySelector('#products').innerHTML = ""; // Limpia el contenedor de productos
    try {
        // Realiza una solicitud para obtener un conjunto de productos
        const res = await fetch(`https://dummyjson.com/products?limit=8&skip=${salt}`);
        const { products } = await res.json(); // Extrae la lista de productos de la respuesta
        
        // Itera sobre cada producto y lo agrega al DOM
        products.forEach(product => {
            document.querySelector('#products').innerHTML += `
            <div class="card2">
                <div class="card2__wrapper">
                    <div class="card2__back"><svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 24" height="24" width="14"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="#fff" d="M12 2L2 12L12 22"></path></svg></div>
                    <div class="card2__menu"><svg xmlns="https://www.w3.org/2000/svg" width="29" viewBox="0 0 29 14" height="14" fill="none"><path fill="#fff" d="m16.5714 9.16667h10.3572c.5493 0 1.0762.22827 1.4647.6346s.6067.95743.6067 1.53203c0 .5747-.2182 1.1258-.6067 1.5321s-.9154.6346-1.4647.6346h-10.3572c-.5493 0-1.0762-.2283-1.4647-.6346s-.6067-.9574-.6067-1.5321c0-.5746.2182-1.1257.6067-1.53203s.9154-.6346 1.4647-.6346zm-14.49997-8.66667h24.85717c.5493 0 1.0762.228273 1.4647.6346.3885.40633.6067.95743.6067 1.53207 0 .57463-.2182 1.12573-.6067 1.53206s-.9154.6346-1.4647.6346h-24.85717c-.54938 0-1.076254-.22827-1.464722-.6346s-.606708-.95743-.606708-1.53206c0-.57464.21824-1.12574.606708-1.53207.388468-.406327.915342-.6346 1.464722-.6346z"></path></svg></div>
                </div>
                <div class="card2__img"> 
                    <div class="tamaño"> 
                        <img src="${product.images[0]}">
                    </div>
                </div> 
                <div class="card2__title">${product.title}</div>
                <div class="card2__subtitle">${product.description}</div>
                <div class="card2__wrapper">
                    <div class="card2__price${product.id}">$${product.price}</div>
                    <div class="card2__counter">
                        <button class="card2__btn menos" data-id=${product.id}>-</button>
                        <div class="card2__counter-score${product.id}">1</div>
                        <button class="card2__btn card2__btn-plus mas" data-id=${product.id}>+</button>
                    </div>
                </div>
            </div>
            `;
        });
        
        // Selecciona todos los botones de resta y suma
        const restar = document.querySelectorAll('.menos');
        const sumar = document.querySelectorAll('.mas');
        
        // Asigna un evento de clic para sumar la cantidad
        sumar.forEach(suma => {
            suma.addEventListener('click', () => {
                agregar(suma.dataset.id); // Llama a la función agregar con el ID del producto
            });
        });
        
        // Asigna un evento de clic para restar la cantidad
        restar.forEach(resta => {
            resta.addEventListener('click', () => {
                quitar(resta.dataset.id); // Llama a la función quitar con el ID del producto
            });
        });

    } catch (e) {
        console.error("Error al obtener productos:", e); // Maneja cualquier error que ocurra durante la solicitud
    }
}
