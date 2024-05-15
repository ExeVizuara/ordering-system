// Datos de admin y usuarios (falsos)
const users = [
    { username: 'admin', password: 'admin', role: 'admin' }, // Admin ejemplo que recibira los pedidos para enviarlos
    { username: 'user1', password: 'user1', role: 'user' }, // Usuario ejemplo que realiza pedidos a la distribuidora 
];

const username = document.getElementById('login_name');
const password = document.getElementById('login_password');
const divLogin = document.getElementById('divLogin');
const formLogin = document.getElementById('formLogin');
const adminInterface = document.getElementById('adminInterface');
const userInterface = document.getElementById('userInterface');
const quitButton = document.getElementById('quitButton');

// Obtener la lista de pedidos del almacenamiento local
const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

// Seleccionar el elemento <ul> donde se mostrarán los pedidos
const listaPedidos = document.querySelector('#orderList');

const orders = [
    {
        id: 1,
        client: "Maxikiosco Luna",
        order: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat ea saepe itaque quo iure temporibus incidunt corporis",
        address: "Islas Malvinas 473",
        CP: 4000,
        date: '2024-05-13'
    },
    {
        id: 2,
        order: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat ea saepe itaque quo iure temporibus incidunt corporis",
        address: "Av Manuel Belgrano 558",
        CP: 4000,
        date: '2024-05-12'
    },
    {
        id: 3,
        order: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat ea saepe itaque quo iure temporibus incidunt corporis",
        address: "Italia 2725",
        CP: 4000,
        date: '2024-05-12'
    },
    {
        id: 4,
        order: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat ea saepe itaque quo iure temporibus incidunt corporis",
        address: "Crisostomo Álvarez 2900",
        CP: 4000,
        date: '2024-05-11'
    },
    {
        id: 5,
        order: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat ea saepe itaque quo iure temporibus incidunt corporis",
        address: "Crisostomo Álvarez 2900",
        CP: 4000,
        date: '2024-05-11'
    }
];

function recortarTexto(texto, maximo) {
    if (texto.length > maximo) {
        return texto.substring(0, maximo) + "...";
    } else {
        return texto;
    };
};

// Iterar sobre los pedidos y crear elementos <li> para cada uno
orders.forEach(order => {
    const li = document.createElement('li');
    const formattedText = recortarTexto(order.order, 70);
    li.textContent = "Fecha: " + order.date + " Dirección: " + order.address + " CP: " + order.CP + " Pedido: " + formattedText; // Suponiendo que cada pedido tiene una propiedad "descripcion"
    li.style.cursor = "pointer";
    li.style.paddingBlock = "0.5rem";
    listaPedidos.appendChild(li);
});
// Función para manejar el inicio de sesión
function login(event) {
    event.preventDefault();

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
        const err = document.getElementById('login_error');
        err.style.display = "block";
        username.value = "";
        password.value = "";
    }
}

function quitApplication(event) {
    event.preventDefault();
    adminInterface.style.display = "none";
    divLogin.style.display = "block";
    username.value = "";
    password.value = "";
}

// Función para mostrar la interfaz de administrador
function showAdminInterface() {
    divLogin.style.display = "none";
    adminInterface.style.display = "block";
    console.log("Bienvenido Admin!");
}

// Función para mostrar la interfaz de usuario
function showUserInterface() {
    divLogin.style.display = "none";
    userInterface.style.display = "block";
    console.log("Bienvenido Usuario!");
}

// Función para agregar un pedido al almacenamiento local
// function addOrderToLocalStorage(order) {
//     let orders = JSON.parse(localStorage.getItem('orders')) || [];
//     orders.push(order);
//     localStorage.setItem('orders', JSON.stringify(orders));
// }

// Función para obtener todos los pedidos almacenados
// function getAllOrdersFromLocalStorage() {
//     return JSON.parse(localStorage.getItem('orders')) || [];
// }

// Ejemplo de uso: agregar un pedido al hacer clic en un botón

// addOrderToLocalStorage(order);

// Cuando el administrador inicie sesión, puede recuperar todos los pedidos almacenados
// const allOrders = getAllOrdersFromLocalStorage();
// console.log(allOrders);

// Event listener para el formulario de inicio de sesión
formLogin.addEventListener('submit', login);
quitButton.addEventListener('click', quitApplication);