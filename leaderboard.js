// Función para obtener el leaderboard filtrado por imagen y dificultad
function obtenerLeaderboard() {
    const imagen = localStorage.getItem('imagen');
    const dificultad = localStorage.getItem('dificultad');

    if (!imagen || !dificultad) {
        document.getElementById('leaderboard').textContent = 'No se encontró la imagen o la dificultad seleccionada.';
        return;
    }

    fetch(`http://localhost:3000/getLeaderboard?imagen=${imagen}&dificultad=${dificultad}`)
        .then(response => response.json())
        .then(leaderboard => {
            mostrarLeaderboard(leaderboard);
        })
        .catch(error => {
            console.error('Error al obtener el leaderboard:', error);
            document.getElementById('leaderboard').textContent = 'Error al cargar la clasificación.';
        });
}

// Función para mostrar el leaderboard
function mostrarLeaderboard(leaderboard) {
    const leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = '';

    if (leaderboard.length === 0) {
        leaderboardContainer.textContent = 'No hay datos disponibles para este rompecabezas y nivel.';
        return;
    }

    leaderboard.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('leaderboard-entry');
        entryDiv.innerHTML = `#${index + 1} <span>${entry.nombre}</span> - Tiempo: ${entry.tiempo} - Movimientos: ${entry.movimientos}`;
        leaderboardContainer.appendChild(entryDiv);
    });
}
// Función para obtener el leaderboard filtrado por imagen y dificultad
function obtenerLeaderboard() {
    const imagen = localStorage.getItem('imagen');
    const dificultad = localStorage.getItem('dificultad');

    if (!imagen || !dificultad) {
        document.getElementById('leaderboard').textContent = 'No se encontró la imagen o la dificultad seleccionada.';
        return;
    }

    fetch(`http://localhost:3000/getLeaderboard?imagen=${imagen}&dificultad=${dificultad}`)
        .then(response => response.json())
        .then(leaderboard => {
            mostrarLeaderboard(leaderboard);
        })
        .catch(error => {
            console.error('Error al obtener el leaderboard:', error);
            document.getElementById('leaderboard').textContent = 'Error al cargar la clasificación.';
        });
}

// Función para mostrar el leaderboard
function mostrarLeaderboard(leaderboard) {
    const leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = '';

    if (leaderboard.length === 0) {
        leaderboardContainer.textContent = 'No hay datos disponibles para este rompecabezas y nivel.';
        return;
    }

    leaderboard.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('leaderboard-entry');
        entryDiv.innerHTML = `#${index + 1} <span>${entry.nombre}</span> - Tiempo: ${entry.tiempo} - Movimientos: ${entry.movimientos}`;
        leaderboardContainer.appendChild(entryDiv);
    });
}

// Llamada para obtener el leaderboard cuando la página se cargue
window.onload = obtenerLeaderboard;

// Manejador de eventos para regresar al menú principal
document.getElementById('backToMenu').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Llamada para obtener el leaderboard cuando la página se cargue
window.onload = obtenerLeaderboard;