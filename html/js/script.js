// Función para formatear números como moneda
const formatMoney = (amount) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
};

// Función para actualizar un elemento con animación
const updateElementWithAnimation = (elementId, newValue) => {
    const element = document.getElementById(elementId);
    element.classList.remove('update-animation');
    // Forzar un reflow para reiniciar la animación
    void element.offsetWidth;
    element.classList.add('update-animation');
    element.textContent = newValue;
};

// Función para actualizar los indicadores circulares
const updateStatusIndicator = (elementId, value) => {
    const element = document.getElementById(elementId);
    const parentDiv = element.closest('.progress-ring');
    
    // Actualizar el valor
    updateElementWithAnimation(elementId, `${value}%`);
    
    // Cambiar el color basado en el valor
    if (value <= 25) {
        parentDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
    } else if (value <= 50) {
        parentDiv.style.backgroundColor = 'rgba(255, 165, 0, 0.2)';
    } else {
        parentDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    }
};

// Escuchar mensajes del cliente
window.addEventListener('message', function(event) {
    if (event.data.type === 'updateHUD') {
        try {
            // Actualizar dinero y ID
            updateElementWithAnimation('handCash', formatMoney(event.data.handCash));
            updateElementWithAnimation('bankMoney', formatMoney(event.data.bankMoney));
            updateElementWithAnimation('playerId', `ID: ${event.data.playerId}`);
            
            // Actualizar estados de hambre y sed
            updateStatusIndicator('hunger', event.data.hunger);
            updateStatusIndicator('thirst', event.data.thirst);
            
        } catch (error) {
            console.error('Error al actualizar el HUD:', error);
        }
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarse de que todos los elementos estén visibles al cargar
    document.body.style.display = 'block';
});
