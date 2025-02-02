document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const medicoId = urlParams.get('id');

    // Simulación de datos de médicos
    const medicos = [
        { id: 1, nombre: 'Dra. Hamila', especialidad: 'Oftalmología', ubicacion: 'Barcelona', descripcion: 'Experto en oftalmología con más de 10 años de experiencia.' },
        { id: 2, nombre: 'Dra. Claudia', especialidad: 'Odontología', ubicacion: 'Barcelona', descripcion: 'Experto en odontologíacon más de 10 años de experiencia.' },
        { id: 3, nombre: 'Dra. Gloria', especialidad: 'Psicología', ubicacion: 'Barcelona', descripcion: 'Experto en psicología con más de 10 años de experiencia.' },
        { id: 4, nombre: 'Dra. Carolina', especialidad: 'Podología', ubicacion: 'Barcelona', descripcion: 'Experto en podología con más de 10 años de experiencia.' },
        { id: 5, nombre: 'Dr. Ghassan', especialidad: 'Dermatología', ubicacion: 'Barcelona', descripcion: 'Experto en dermatología con más de 10 años de experiencia.' },
        { id: 6, nombre: 'Dr. Sarkis', especialidad: 'Cardiología', ubicacion: 'Barcelona', descripcion: 'Experto en cardiología con más de 10 años de experiencia.' },
        { id: 7, nombre: 'Dr. Borras', especialidad: 'Psiquiatría', ubicacion: 'Barcelona', descripcion: 'Experto en psiquiatría con más de 10 años de experiencia.' },
        { id: 8, nombre: 'Dr. Rius', especialidad: 'Urología', ubicacion: 'Barcelona', descripcion: 'Experto en urología con más de 10 años de experiencia.' },
    ];

    const medico = medicos.find(m => m.id == medicoId);

    if (medico) {
        document.getElementById('nombre-medico').textContent = medico.nombre;
        document.getElementById('especialidad-medico').textContent = medico.especialidad;
        document.getElementById('ubicacion-medico').textContent = medico.ubicacion;
        document.getElementById('descripcion-medico').textContent = medico.descripcion;
    } else {
        document.getElementById('detalle-medico').innerHTML = '<p>Médico no encontrado.</p>';
    }

    // Cargar reservas existentes
    cargarReservas(medicoId);

    // Manejar el formulario de reserva
    document.getElementById('form-reserva').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;

        const reserva = {
            medicoId: medicoId,
            nombre: nombre,
            email: email,
            fecha: fecha,
            hora: hora
        };

        guardarReserva(reserva);
        cargarReservas(medicoId);
        document.getElementById('form-reserva').reset();
        document.getElementById('mensaje-reserva').textContent = 'Reserva realizada con éxito.';
    });
});

function guardarReserva(reserva) {
    // Obtener reservas existentes del localStorage
    const reservas = JSON.parse(localStorage.getItem(`reservas-${reserva.medicoId}`)) || [];
    reservas.push(reserva);
    localStorage.setItem(`reservas-${reserva.medicoId}`, JSON.stringify(reservas));
}

function cargarReservas(medicoId) {
    const reservas = JSON.parse(localStorage.getItem(`reservas-${medicoId}`)) || [];
    const tbody = document.querySelector('#tabla-reservas tbody');
    tbody.innerHTML = '';

    reservas.forEach(reserva => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reserva.nombre}</td>
            <td>${reserva.email}</td>
            <td>${reserva.fecha}</td>
            <td>${reserva.hora}</td>
        `;
        tbody.appendChild(row);
    });
}