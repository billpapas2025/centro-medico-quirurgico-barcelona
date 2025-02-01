document.getElementById('form-busqueda').addEventListener('submit', function(event) {
    event.preventDefault();
    const especialidad = document.getElementById('especialidad').value;
    const ubicacion = document.getElementById('ubicacion').value;

    // Normalizar la especialidad (eliminar tildes)
    const especialidadNormalizada = normalizarTexto(especialidad);

    // Simulación de búsqueda de médicos
    const medicos = buscarMedicos(especialidadNormalizada, ubicacion);
    mostrarResultados(medicos);
});

function buscarMedicos(especialidad, ubicacion) {
    // Simulación de datos de médicos
    const medicos = [
        { id: 1, nombre: 'Dra. Hamila', especialidad: 'Oftalmología', ubicacion: 'Barcelona', descripcion: 'Experto en oftalmología con más de 10 años de experiencia.' },
        { id: 2, nombre: 'Dra. Claudia', especialidad: 'Odontología', ubicacion: 'Barcelona', descripcion: 'Experto en odontologíacon más de 10 años de experiencia.' },
        { id: 3, nombre: 'Dra. Gloria', especialidad: 'Psicología', ubicacion: 'Barcelona', descripcion: 'Experto en psicología con más de 10 años de experiencia.' },
        { id: 4, nombre: 'Dra. Carolina', especialidad: 'Podología', ubicacion: 'Barcelona', descripcion: 'Experto en podología con más de 10 años de experiencia.' },
        { id: 5, nombre: 'Dr. Ghassan', especialidad: 'Dermatología', ubicacion: 'Barcelona', descripcion: 'Experto en dermatología con más de 10 años de experiencia.' },
        { id: 6, nombre: 'Dr. Sarkis', especialidad: 'Cardiología', ubicacion: 'Premia del Mar', descripcion: 'Experto en cardiología con más de 10 años de experiencia.' },
        { id: 7, nombre: 'Dr. Borras', especialidad: 'Psiquiatría', ubicacion: 'Barcelona', descripcion: 'Experto en psiquiatría con más de 10 años de experiencia.' },
        { id: 8, nombre: 'Dr. Rius', especialidad: 'Urología', ubicacion: 'Premia del Mar', descripcion: 'Experto en urología con más de 10 años de experiencia.' },
    ];

    return medicos.filter(medico => {
        const especialidadMedicoNormalizada = normalizarTexto(medico.especialidad);
        const ubicacionMedicoNormalizada = normalizarTexto(medico.ubicacion);

        return especialidadMedicoNormalizada.includes(especialidad) &&
               ubicacionMedicoNormalizada.includes(normalizarTexto(ubicacion));
    });
}

function mostrarResultados(medicos) {
    const listaMedicos = document.getElementById('lista-medicos');
    listaMedicos.innerHTML = '';

    if (medicos.length === 0) {
        listaMedicos.innerHTML = '<p>No se encontraron médicos.</p>';
        return;
    }

    medicos.forEach(medico => {
        const medicoDiv = document.createElement('div');
        medicoDiv.className = 'medico';
        medicoDiv.innerHTML = `
            <h3>${medico.nombre}</h3>
            <p><strong>Especialidad:</strong> ${medico.especialidad}</p>
            <p><strong>Ubicación:</strong> ${medico.ubicacion}</p>
            <a href="detalle-medico.html?id=${medico.id}">Ver detalles</a>
        `;
        listaMedicos.appendChild(medicoDiv);
    });
}

// Función para normalizar texto (eliminar tildes y convertir a minúsculas)
function normalizarTexto(texto) {
    return texto
        .toLowerCase() // Convertir a minúsculas
        .normalize('NFD') // Separar caracteres y tildes
        .replace(/[\u0300-\u036f]/g, ''); // Eliminar tildes
}