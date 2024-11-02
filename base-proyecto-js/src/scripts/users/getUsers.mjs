// Función asíncrona para obtener todos los usuarios y almacenar en localStorage
export const getAllUsers = async () => {
    try {
        // Verifica si la base de datos local no está creada
        if (!localStorage.getItem('DBTT')) {
            // Realiza una petición GET a la API para obtener todos los usuarios
            const res = await fetch('https://dummyjson.com/users?limit=0');
            const data = await res.json();
            
            // Crea la base de datos local con el nombre 'DBTT' y almacena los usuarios en formato JSON
            localStorage.setItem('DBTT', JSON.stringify(data.users));
        } else {
            // Si la base de datos ya está creada, se muestra un mensaje en la consola
            console.log("La bd ya está creada");
        }
        
        // Mensaje para indicar que todos los datos han sido cargados
        console.log('Todos los datos cargados!');
    } catch (error) {
        // Manejo de errores: si ocurre un error, se muestra en la consola
        console.error(error);
    }
}
