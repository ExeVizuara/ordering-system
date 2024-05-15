import { showAdminInterface, showUserInterface } from "./main.js";
import { loadUsers } from "./users.js";

const username = document.getElementById('login_name');
const password = document.getElementById('login_password');
const err = document.getElementById('login_error');

// Función para manejar el inicio de sesión
export const login = () => {

    const users = loadUsers();
    const usernameInput = username.value;
    const passwordInput = password.value;

    // Verificar credenciales del usuario
    const user = users.find(user => user.username === usernameInput && user.password === passwordInput);

    if (user) {
        // Mostrar interfaz según el rol del usuario
        if (user.role === 'admin') {
            showAdminInterface();
        } else {
            showUserInterface();
        }
    } else {
        err.style.display = "block";
        username.value = "";
        password.value = "";
    }
}

// Vista previa del contenido del pedido
export const recortarTexto = (texto, maximo) => {
    if (texto.length > maximo) {
        return texto.substring(0, maximo) + "...";
    } else {
        return texto;
    };
};