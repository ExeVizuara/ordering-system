import { recortarTexto } from "./utils.js";

// Lista no ordenada para iterar los pedidos
const listaPedidos = document.querySelector('#orderList');

const orderName = document.getElementById('orderName');
const orderAddress = document.getElementById('orderAddress');
const orderText = document.getElementById('orderText');

// Función para obtener todos los pedidos almacenados
export const getAllOrdersFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('orders')) || [];
};

// Función para agregar un pedido al almacenamiento local
export const addOrderToLocalStorage = async () => {

    let orders = await getAllOrdersFromLocalStorage();
    const orderNameInput = orderName.value;
    const orderAddressInput = orderAddress.value;
    const orderTextInput = orderText.value;
    const newDate = new Date().toISOString().split('T')[0] // Obtener la fecha actual en formato ISO (YYYY-MM-DD)

    // Se crea un objeto para el nuevo pedido
    const newOrder = {
        id: orders.length + 1, // Asignar un nuevo ID al pedido
        client: orderNameInput, // Nombre del cliente
        order: orderTextInput, // Contenido del pedido escrito por el cliente
        address: orderAddressInput, // Dirección donde se hará la entrega
        CP: 4000, // Código postal fijo en 4000, ya que en este hipotético caso, sería solo para clientes de San Miguel de Tucumán
        date: newDate
    };
    await orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    const li = document.createElement('li');
    const formattedText = recortarTexto(newOrder.order, 70);
    li.textContent = "Fecha: " + newOrder.date + " Dirección: " + newOrder.address + " CP: " + newOrder.CP + " Pedido: " + formattedText;
    li.style.cursor = "pointer";
    li.style.paddingBlock = "0.5rem";
    listaPedidos.appendChild(li);

    // Limpiar los campos del formulario después de enviar el pedido
    orderName.value = "";
    orderAddress.value = "";
    orderText.value = "";

    // Mostrar un mensaje de éxito o realizar otra acción si es necesario
    alert("Pedido enviado correctamente:", newOrder);
};