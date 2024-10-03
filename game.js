        // Obtener datos del localStorage
        let nombre = localStorage.getItem("nombre");
        let dificultad = localStorage.getItem("dificultad");
        let imagenID = localStorage.getItem("imagen");
        
        // Mapeo de imágenes
        const images = {
            1: "https://c4.wallpaperflare.com/wallpaper/315/901/274/tahiti-st-regis-bora-bora-french-polynesia-luxury-bungalows-wallpaper-preview.jpg",
            2: "https://cdn0.bodas.com.mx/vendor/6184/3_2/960/jpg/foro_5_116184.webp",
            3: "https://www.cetys.mx/noticias/wp-content/uploads/2016/02/500hxns_011.jpg",
            4: "https://content.r9cdn.net/rimg/dimg/9b/2d/0aeefb46-city-53588-162aa932673.jpg?width=1366&height=768&xhint=1388&yhint=923&crop=true",
            5: "https://live.staticflickr.com/7406/10476076654_96724f88d5_b.jpg"
        };
        const levels = {
            1: {pieces: 4, grid: 2},
            2: {pieces: 9, grid: 3},
            3: {pieces: 16, grid: 4},
            4: {pieces: 36, grid: 6}
        };

        let moveCount = 0;
        let timerInterval;
        let isPuzzleSolved = false;

        function createPuzzle() {
            const container = document.getElementById('puzzle-container');
            container.innerHTML = "";
            const imageUrl = images[imagenID];
            const level = levels[dificultad];
            const size = level.grid;
        
            container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
            container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
            container.style.gap = '0';
        
            const pieces = Array.from({ length: size * size }, (_, i) => i);
                pieces.sort(() => Math.random() - 0.5);
        
                pieces.forEach((pieceIndex) => {
                    const piece = document.createElement('div');
                    piece.className = 'puzzle-piece';
                    piece.style.backgroundImage = `url(${imageUrl})`;
                    piece.style.backgroundSize = `${size * 100}% ${size * 100}%`;
                    piece.style.backgroundPosition = `${-(pieceIndex % size) * 100}% ${-(Math.floor(pieceIndex / size) * 100)}%`;
                    piece.setAttribute('draggable', true);
                    piece.dataset.index = pieceIndex;
    
                    piece.addEventListener('dragstart', dragStart);
                    piece.addEventListener('dragover', dragOver);
                    piece.addEventListener('drop', drop);
                    piece.addEventListener('dragend', dragEnd);
    
                    container.appendChild(piece);
                });
            }

        function dragStart(e) {
            e.dataTransfer.setData("text/plain", e.target.dataset.index);
            e.target.style.opacity = 0.5;
        }

        function dragOver(e) {
            e.preventDefault();
        }

    function drop(e) {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData("text/plain");
        const targetIndex = e.target.dataset.index;

        const draggedPiece = document.querySelector(`[data-index='${draggedIndex}']`);
        const targetPiece = e.target;

        if (draggedPiece && targetPiece) {
            // Intercambiar los dataset.index
            const tempIndex = draggedPiece.dataset.index;
            draggedPiece.dataset.index = targetPiece.dataset.index;
            targetPiece.dataset.index = tempIndex;

            // Intercambiar los backgroundPosition
            const tempBackground = draggedPiece.style.backgroundPosition;
            draggedPiece.style.backgroundPosition = targetPiece.style.backgroundPosition;
            targetPiece.style.backgroundPosition = tempBackground;

            moveCount++;
            document.getElementById('move-count').textContent = moveCount;

            // Comprobar si el rompecabezas está resuelto
            checkIfSolved();
        }
    }

        function dragEnd(e) {
            e.target.style.opacity = 1;
        }
        function checkIfSolved() {
            const pieces = document.querySelectorAll('.puzzle-piece');
            const level = levels[dificultad];
            const size = level.grid; // Get the correct grid size based on difficulty
            
            // Comprobar si todas las piezas están en su lugar correcto
            isPuzzleSolved = Array.from(pieces).every((piece, currentPosition) => {
                const currentIndex = parseInt(piece.dataset.index);
                return currentIndex == currentPosition;
            });
            
            if (isPuzzleSolved) {
                clearInterval(timerInterval);
        
                // Obtener el tiempo y los movimientos
                const tiempoTotal = document.getElementById('timer').textContent;
                const movimientoTotal = moveCount;
        
                // Crear objeto con los datos a enviar
                const datosJuego = {
                    nombre: nombre,
                    rompecabezas: imagenID,
                    tiempo: tiempoTotal,
                    movimientos: movimientoTotal,
                    dificultad: dificultad
                };
        
                // Enviar datos al servidor
                fetch('http://localhost:3000/saveGame', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosJuego)
                })
                .then(response => {
                    if (response.ok) {
                        window.location.href = 'leaderboard.html';
                    } else {
                        throw new Error('Error al guardar los datos');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('No se pudieron guardar los datos. Inténtalo de nuevo.');
                });
            }
        }
        // Temporizador
        function startTimer() {
            let seconds = 0;
            timerInterval = setInterval(() => {
                seconds++;
                document.getElementById('timer').textContent = seconds;
            }, 1000);
        }

        // Reiniciar el juego
        document.getElementById('restartBtn').addEventListener('click', () => {
            moveCount = 0;
            document.getElementById('move-count').textContent = moveCount;
            createPuzzle();
            document.getElementById('timer').textContent = "0";
            clearInterval(timerInterval);
            startTimer();
        });

        // Inicializar
        createPuzzle();
        startTimer();