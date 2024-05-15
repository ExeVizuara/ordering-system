// Cargar registro de usuarios desde LocalStorage

export const loadUsers = () => {
    const users = JSON.parse(localStorage.getItem('usuarios')) || [
        { username: 'admin', password: 'admin', role: 'admin' }, // Admin ejemplo que recibirá los pedidos para enviarlos
        { username: 'user1', password: 'user1', role: 'user' }, // Usuario ejemplo que realiza pedidos a la distribuidora 
    ];

    // Se registran las cuentas de usuario y admin en el localStorage si no están presentes
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(users));
    }
    return users;
};