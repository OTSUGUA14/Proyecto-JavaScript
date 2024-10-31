const instru = async (id, ver) => {
    // Realiza una solicitud para obtener los detalles de la receta
    const res = await fetch(`https://dummyjson.com/recipes/${id}`);
    const { ingredients, instructions } = await res.json(); // Desestructura la respuesta
    const container = document.querySelector(`#inst${id}`); // Selecciona el contenedor para mostrar los detalles
    container.innerHTML = ""; // Limpia el contenido previo

    if (ver) {
        // Si 'ver' es verdadero, se muestran los ingredientes y las instrucciones
        let inContent = document.createElement("p");
        inContent.innerHTML = "Ingredientes:<br>";
        ingredients.forEach(ingre => {
            inContent.innerHTML += `${ingre}<br>`;
        });
        inContent.classList.add('instrucciones');
        container.appendChild(inContent); // Agrega los ingredientes al contenedor

        let agre = document.createElement("p");
        agre.innerHTML = `INTRUCCIONES:<br>`;
        instructions.forEach(intro => {
            agre.innerHTML += `${intro}<br>`;
        });
        agre.classList.add('instrucciones');
        container.appendChild(agre); // Agrega las instrucciones al contenedor

        container.classList.remove('ocultar'); // Muestra el contenedor
        document.querySelector(`.info${id}`).classList.add('ocultar'); // Oculta la información básica
    } else {
        container.classList.add('ocultar'); // Oculta el contenedor
        document.querySelector(`.info${id}`).classList.remove('ocultar'); // Muestra la información básica
    }
};


export const getAllReciper = async (salt) => {
    document.querySelector('#recipes').innerHTML = ""; // Limpia el contenedor de recetas
    try {
        // Realiza una solicitud para obtener las recetas
        const res = await fetch(`https://dummyjson.com/recipes?limit=8&skip=${salt}`);
        const { recipes } = await res.json(); // Desestructura la respuesta

        // Recorre cada receta y crea su representación en el DOM
        recipes.forEach(receta => {
            document.querySelector('#recipes').innerHTML += `
                <div class="card">
                    <div class="content">
                        <div class="back">
                            <div class="back-content">
                                <img src="${receta.image}" height="80%" width="80%">
                                <strong>Hover me</strong>
                            </div>
                        </div>
                        <div class="front">
                            <div class="img">
                                <div class="circle"></div>
                                <div class="circle" id="right"></div>
                                <div class="circle" id="bottom"></div>
                            </div>
                            <div class="front-content">
                                <small class="badge">${receta.cuisine}</small>
                                <div class="description">
                                    <div class="title">
                                        <p class="title">
                                            <strong>${receta.name}</strong>
                                        </p>
                                        <button class="Button" data-id=${receta.id}>Instrucciones</button>
                                    </div>
                                    <p class="card-footer info${receta.id}">
                                        ${receta.prepTimeMinutes} Mins preparar <br>${receta.cookTimeMinutes} Mins de Cocción
                                    </p>
                                    <p id="inst${receta.id}" class="dynamic-content"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        });

        // Añade eventos a los botones de instrucciones
        const buttons = document.querySelectorAll('.Button');
        buttons.forEach(button => {
            let ver = true;
            button.addEventListener('click', () => {
                instru(button.dataset.id, ver);
                ver = !ver; // Alterna el estado de 'ver'
            });
        });
    } catch (e) {
        console.error(e); // Maneja cualquier error en la solicitud
    }
};
