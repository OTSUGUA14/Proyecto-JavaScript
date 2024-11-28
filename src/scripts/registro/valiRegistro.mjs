// Definición de expresiones regulares para la validación de campos
const regex = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,20}$/, // Nombre: 4-20 letras
    apellido: /^[a-zA-ZÀ-ÿ\s]{4,20}$/, // Apellido: 4-20 letras
    edad: /^[\d]{2,2}$/, // Edad: exactamente 2 dígitos
    usuario: /^[a-zA-ZÁ-ÿ\s][^@$!%*#?&]{1,16}$/, // Usuario: 2-16 caracteres sin caracteres especiales
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/, // Contraseña: 8-12 caracteres con al menos una mayúscula, una minúscula y un número
    email: /^[a-zA-Z0-9\.\-_]+@[a-zA-Z]+\.(com|net|gov\.ar)$/, // Email: formato válido
    repetir: function(value) { // Validación de coincidencia de contraseñas
        return value === document.querySelector('input[name="password"]').value;
    }
};

// Función principal para manejar la validación
export const vali = () => {
    const parrafo = document.getElementsByTagName('p'); // Elementos <p> para mensajes de advertencia
    const input = document.querySelectorAll('.registro input, #btn-registro'); // Inputs a validar

    // Inicializa el objeto de resultados de validación
    input.forEach(input => {
        // Evento de entrada para validar en tiempo real
        input.addEventListener('input', () => {
            validacion(input.name, input.value);
        });

        // Evento de pérdida de foco para validar
        input.addEventListener('blur', () => {
            validacion(input.name, input.value);
        });
    });

    // Función de validación
    function validacion(names, value) {
        if (names in regex) {
            // Valida el campo según su nombre
            if (names === 'repetir') {
                valueRegex[names] = regex.repetir(value);
            } else {
                valueRegex[names] = regex[names].test(value);
            }
        }
        
        // Mostrar u ocultar mensajes de advertencia
        for (let i = 0; i < parrafo.length; i++) {
            if (parrafo[i].getAttribute('name') === names) {
                if (valueRegex[names]) {
                    parrafo[i].classList.add('ocultar'); // Ocultar si es válido
                } else {
                    parrafo[i].classList.remove('ocultar'); // Mostrar si no es válido
                }
            }
        }
    }
};

// Objeto para almacenar resultados de validación
export const valueRegex = {
    nombre: false,
    apellido: false,
    edad: false,
    usuario: false,
    password: false,
    repetir: false,
    email: false
};
