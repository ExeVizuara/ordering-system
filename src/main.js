// Datos de admin y usuarios "falsos"
import { addOrderToLocalStorage, getAllOrdersFromLocalStorage } from "./orders.js";
import { recortarTexto } from "./utils.js";
import { login } from "./utils.js";

// Login
const username = document.getElementById('login_name');
const password = document.getElementById('login_password');
const err = document.getElementById('login_error');
const divLogin = document.getElementById('divLogin');
const formLogin = document.getElementById('formLogin');

// Elementos UI
const orderListQuery = document.querySelector('#orderList');
const orderList = document.getElementById('orderList');
const adminInterface = document.getElementById('adminInterface');
const userInterface = document.getElementById('userInterface');
const quitButtonAdmin = document.getElementById('quitButtonAdmin');
const quitButtonUser = document.getElementById('quitButtonUser');
const backButton = document.getElementById('backButton');

// Pedidos
const formOrder = document.getElementById('formOrder');
const openOrder = document.getElementById('openOrder');
const orderName = document.getElementById('clientName');
const orderAddress = document.getElementById('clientAddress');
const orderText = document.getElementById('clientOrder');
const aditionalMessage = document.getElementById('aditionalMessage');

// Loguear
function access(event) {
    event.preventDefault();
    login();
}

// Enviar pedido al LocalStorage
function sendOrder(event) {
    event.preventDefault();
    addOrderToLocalStorage();
}

//Salir de la aplicación
function quitApplication() {
    adminInterface.style.display = "none";
    userInterface.style.display = "none";
    divLogin.style.display = "block";
    err.style.display = "none";
    aditionalMessage.style.opacity = "0";
    username.value = "";
    password.value = "";
}

// Mostrar detalles del pedido desde administración
function showOrderDetails(order) {
    orderList.style.display = "none";
    quitButtonAdmin.style.display = "none";
    backButton.style.display = "block";
    openOrder.style.display = "grid";
    const spanName = document.createElement('span');
    const spanAddress = document.createElement('span');
    const spanText = document.createElement('span');
    spanName.textContent = order.client;
    spanAddress.textContent = order.address;
    spanText.textContent = order.order;
    orderName.appendChild(spanName);
    orderAddress.appendChild(spanAddress);
    orderText.appendChild(spanText);
}

// Cargar la lista de pedidos existentes desde el LocalStorage
const loadList = async () => {

    orderList.style.display = "block";
    quitButtonAdmin.style.display = "block";
    backButton.style.display = "none";
    openOrder.style.display = "none";
    orderListQuery.innerHTML = "";
    const orders = await getAllOrdersFromLocalStorage();
    
    // Verificar si hay algún pedido registrado
    if (orders.length === 0) {
        console.log("No hay pedidos registrados")
        const noOrders = document.createElement('li');
        noOrders.textContent = "No hay pedidos realizados aún.";
        orderListQuery.appendChild(noOrders); // Mensaje que indica que no hay pedidos aún
    } else {
        // Iterar sobre los pedidos existentes y crear un <li> para cada uno
        orders.forEach(order => {
            const li = document.createElement('li');
            const formattedText = recortarTexto(order.order, 70);
            li.textContent = "Fecha: " + order.date + " Dirección: " + order.address + " CP: " + order.CP + " Pedido: " + formattedText;
            li.style.cursor = "pointer";
            li.style.paddingBlock = "0.5rem";
            orderListQuery.appendChild(li);

            // Mostrar los detalles del pedido al hacerle click
            li.addEventListener('click', () => {
                showOrderDetails(order);
            });
        });
    };
}

// Volver a la lista de pedidos
function back() {
    loadList();
}

// Función para mostrar la interfaz de administrador
export const showAdminInterface = async () => {
    divLogin.style.display = "none";
    adminInterface.style.display = "block";
    console.log("Bienvenido Admin!");
    loadList();
};

// Función para mostrar la interfaz de usuario
export const showUserInterface = () => {
    divLogin.style.display = "none";
    userInterface.style.display = "block";
    aditionalMessage.style.opacity = "100%";
    console.log("Bienvenido Usuario!");
    loadList();
}

// Event listener para el formulario de inicio de sesión
formLogin.addEventListener('submit', access);
formOrder.addEventListener('submit', sendOrder)
quitButtonAdmin.addEventListener('click', quitApplication);
quitButtonUser.addEventListener('click', quitApplication);
backButton.addEventListener('click', back);