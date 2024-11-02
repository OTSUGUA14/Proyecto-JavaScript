import { handleLogInState } from "../main.mjs";

// Función para iniciar sesión de un usuario
export const logInUser = (currentUser, currentPassword) => {
    // Recupera la lista de usuarios almacenados en localStorage
    const users = JSON.parse(localStorage.getItem('DBTT'));
    
    // Busca al usuario que coincide con el nombre de usuario proporcionado
    const usuario = users.find(user => user.username === currentUser);

    // Si no se encuentra el usuario, se muestra un mensaje de alerta
    if (!usuario) {
        return alert('No se encontró el usuario pasado');
    }

    // Desestructura las propiedades del usuario encontrado
    const { firstName, lastName, username, email, image } = usuario;

    // Verifica si la contraseña proporcionada coincide con la almacenada
    if (usuario.password === currentPassword) {
        // Si las credenciales son correctas, se actualiza el estado de inicio de sesión
        handleLogInState(firstName, lastName, username, email, image, true);
        return true; // Inicio de sesión exitoso
    }

    return false; // Inicio de sesión fallido
}
