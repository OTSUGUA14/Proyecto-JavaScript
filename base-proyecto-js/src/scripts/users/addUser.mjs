// Función asíncrona para agregar un nuevo usuario
const addUser = async (firstName, lastName, username, password, image = "https://cdn-icons-png.freepik.com/256/149/149071.png?semt=ais_hybrid") => {
  // Realiza una petición POST a la API para agregar un nuevo usuario
  const postUser = await fetch('https://dummyjson.com/user/add', {
      method: 'POST', // Método de la solicitud
      headers: { 'Content-Type': 'application/json' }, // Cabeceras de la solicitud
      // Cuerpo de la solicitud, convierte los datos a formato JSON
      body: JSON.stringify({
          firstName, // Nombre del usuario
          lastName,  // Apellido del usuario
          username,  // Nombre de usuario
          password,  // Contraseña del usuario
          image      // Imagen del usuario (por defecto, una imagen específica)
      })
  });
  
  // Obtiene la lista de usuarios almacenada en el localStorage
  const users = JSON.parse(localStorage.getItem('DBTT')) || []; // Asegura que haya un array incluso si es null
  
  // Guarda la respuesta de la API en una constante
  const user = await postUser.json();
  
  // Agrega el nuevo usuario a la lista existente
  users.push(user);
  
  // Actualiza el localStorage con la nueva lista de usuarios
  localStorage.setItem('DBTT', JSON.stringify(users));
};

// Exporta la función addUser para que pueda ser utilizada en otros módulos
export {
  addUser
};
