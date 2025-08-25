// Configuración de la aplicación
const CONFIG = {
    BCV_URL: 'http://www.bcv.org.ve/',
    AUTO_REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutos
    CACHE_DURATION: 10 * 60 * 1000 // 10 minutos
};

// Estado de la aplicación
let appState = {
    currencies: null,
    lastUpdate: null,
    isLoading: false,
    autoRefreshInterval: null,
    cache: {
        data: null,
        timestamp: null
    }
};

// Elementos del DOM
const elements = {
    currenciesGrid: document.getElementById('currenciesGrid'),
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    errorMessage: document.getElementById('errorMessage'),
    lastUpdate: document.getElementById('lastUpdate'),
    refreshBtn: document.getElementById('refreshBtn'),
    retryBtn: document.getElementById('retryBtn'),
    autoRefresh: document.getElementById('autoRefresh')
};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    elements.refreshBtn.addEventListener('click', refreshData);
    elements.retryBtn.addEventListener('click', refreshData);
    elements.autoRefresh.addEventListener('change', toggleAutoRefresh);
}

// Inicializar la aplicación
function initializeApp() {
    showLoading();
    
    // Intentar cargar datos del cache primero
    if (loadFromCache()) {
        updateUI();
        startAutoRefresh();
    } else {
        fetchData();
    }
}

// Función principal para obtener datos
async function fetchData() {
    if (appState.isLoading) return;
    
    appState.isLoading = true;
    showLoading();
    hideError();
    
    try {
        // Usar nuestra API local en lugar de proxies externos
        const response = await fetch('./api.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const currencies = await response.json();
        
        if (currencies && currencies.monitors) {
            appState.currencies = currencies;
            appState.lastUpdate = new Date();
            saveToCache(currencies);
            updateUI();
            startAutoRefresh();
        } else {
            throw new Error('Formato de datos inválido recibido de la API');
        }
        
    } catch (error) {
        console.error('Error fetching data from API:', error);
        showError('Error al obtener los datos del BCV. ' + error.message);
    } finally {
        appState.isLoading = false;
        hideLoading();
    }
}

// Parsear los datos HTML del BCV y convertir al formato JSON API
function parseBCVData(html) {
    try {
        // Crear un DOM parser temporal
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const now = new Date();
        const currencies = {
            datetime: {
                date: now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
                time: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
            },
            monitors: {
                eur: { change: 0, color: "green", image: "https://res.cloudinary.com/dcpyfqx87/image/upload/v1729921474/monitors/public_id:european-union.webp", last_update: "", percent: 0, price: 0, price_old: 0, symbol: "\\u25b2", title: "Euro" },
                cny: { change: 0, color: "green", image: "https://res.cloudinary.com/dcpyfqx87/image/upload/v1729921473/monitors/public_id:china.webp", last_update: "", percent: 0, price: 0, price_old: 0, symbol: "\\u25b2", title: "Yuan chino" },
                try: { change: 0, color: "green", image: "https://res.cloudinary.com/dcpyfqx87/image/upload/v1729921474/monitors/public_id:turkey.webp", last_update: "", percent: 0, price: 0, price_old: 0, symbol: "\\u25b2", title: "Lira turca" },
                rub: { change: 0, color: "green", image: "https://res.cloudinary.com/dcpyfqx87/image/upload/v1729921474/monitors/public_id:russia.webp", last_update: "", percent: 0, price: 0, price_old: 0, symbol: "\\u25b2", title: "Rublo ruso" },
                usd: { change: 0, color: "green", image: "https://res.cloudinary.com/dcpyfqx87/image/upload/v1729921474/monitors/public_id:united-states.webp", last_update: "", percent: 0, price: 0, price_old: 0, symbol: "\\u25b2", title: "Dólar estadounidense" }
            }
        };
        
        // Buscar los valores en el HTML del BCV
        const selectors = [
            { key: 'eur', selector: 'div[id="euro"] strong' },
            { key: 'cny', selector: 'div[id="yuan"] strong' },
            { key: 'try', selector: 'div[id="lira"] strong' },
            { key: 'rub', selector: 'div[id="rublo"] strong' },
            { key: 'usd', selector: 'div[id="dolar"] strong' }
        ];
        
        const lastUpdateStr = now.toLocaleDateString('es-ES') + ", " + now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
        
        selectors.forEach(({ key, selector }) => {
            const element = doc.querySelector(selector);
            if (element) {
                const text = element.textContent.trim();
                const value = parseFloat(text.replace(',', '.'));
                if (!isNaN(value)) {
                    const oldPrice = currencies.monitors[key].price || value * 0.95; // Simular precio anterior
                    currencies.monitors[key].price = value;
                    currencies.monitors[key].price_old = oldPrice;
                    currencies.monitors[key].change = value - oldPrice;
                    currencies.monitors[key].percent = ((value - oldPrice) / oldPrice * 100);
                    currencies.monitors[key].color = value > oldPrice ? "green" : "red";
                    currencies.monitors[key].symbol = value > oldPrice ? "\\u25b2" : "\\u25bc";
                    currencies.monitors[key].last_update = lastUpdateStr;
                }
            }
        });
        
        // Si no se encontraron datos reales, usar datos de ejemplo
        const hasRealData = Object.values(currencies.monitors).some(m => m.price > 0);
        if (!hasRealData) {
            console.warn('No se pudieron obtener datos reales del BCV, usando datos de ejemplo');
            return null; // Esto hará que se use el fallback
        }
        
        return currencies;
        
    } catch (error) {
        console.error('Error parsing BCV data:', error);
        return null;
    }
}

// Actualizar la interfaz de usuario
function updateUI() {
    if (!appState.currencies) return;
    
    // Actualizar timestamp usando el nuevo formato JSON
    if (appState.currencies.datetime) {
        elements.lastUpdate.textContent = `Última actualización: ${appState.currencies.datetime.date}, ${appState.currencies.datetime.time}`;
    } else if (appState.lastUpdate) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit' 
        };
        elements.lastUpdate.textContent = `Última actualización: ${appState.lastUpdate.toLocaleDateString('es-ES', options)}`;
    }
    
    // Renderizar las tarjetas de monedas
    renderCurrencyCards();
    
    // Ocultar loading y error
    hideLoading();
    hideError();
}

// Renderizar las tarjetas de monedas
function renderCurrencyCards() {
    const currencies = appState.currencies;
    if (!currencies || !currencies.monitors) return;
    
    const currencyData = [
        { key: 'eur', data: currencies.monitors.eur },
        { key: 'cny', data: currencies.monitors.cny },
        { key: 'try', data: currencies.monitors.try },
        { key: 'rub', data: currencies.monitors.rub },
        { key: 'usd', data: currencies.monitors.usd }
    ];
    
    elements.currenciesGrid.innerHTML = currencyData.map(({ key, data }) => `
        <div class="currency-card">
            <div class="currency-header">
                <div class="currency-info">
                    <img src="${data.image}" alt="${data.title}" style="width: 24px; height: 24px; margin-right: 8px;">
                    <div>
                        <h3>${data.title}</h3>
                        <p>${key.toUpperCase()}</p>
                    </div>
                </div>
                <div class="currency-symbol" style="color: ${data.color}">
                    ${data.symbol === '\\u25b2' ? '▲' : data.symbol === '\\u25bc' ? '▼' : '●'}
                </div>
            </div>
            <div class="currency-value">
                <div class="value-number">${formatCurrency(data.price)}</div>
                <div class="value-label">VES por ${key.toUpperCase()}</div>
                <div class="price-change" style="color: ${data.color}">
                    ${data.change > 0 ? '+' : ''}${formatCurrency(data.change)} (${data.percent.toFixed(2)}%)
                </div>
            </div>
            <div class="currency-status">
                <div class="status-indicator">
                    <i class="fas fa-circle" style="color: ${data.color}"></i>
                    <span>Actualizado</span>
                </div>
                <small>Anterior: ${formatCurrency(data.price_old)}</small>
            </div>
        </div>
    `).join('');
}

// Formatear moneda
function formatCurrency(value) {
    if (value === 0) return '--';
    return value.toLocaleString('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Mostrar/ocultar estados de la UI
function showLoading() {
    elements.loading.style.display = 'block';
    elements.currenciesGrid.style.display = 'none';
}

function hideLoading() {
    elements.loading.style.display = 'none';
    elements.currenciesGrid.style.display = 'grid';
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.error.style.display = 'block';
    elements.currenciesGrid.style.display = 'none';
}

function hideError() {
    elements.error.style.display = 'none';
}

// Funciones de cache
function saveToCache(data) {
    appState.cache.data = data;
    appState.cache.timestamp = Date.now();
    localStorage.setItem('bcv_cache', JSON.stringify(appState.cache));
}

function loadFromCache() {
    try {
        const cached = localStorage.getItem('bcv_cache');
        if (!cached) return false;
        
        const cache = JSON.parse(cached);
        const now = Date.now();
        
        if (cache.timestamp && (now - cache.timestamp) < CONFIG.CACHE_DURATION) {
            appState.currencies = cache.data;
            appState.lastUpdate = new Date(cache.timestamp);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error loading cache:', error);
        return false;
    }
}

// Auto-refresh
function startAutoRefresh() {
    if (appState.autoRefreshInterval) {
        clearInterval(appState.autoRefreshInterval);
    }
    
    if (elements.autoRefresh.checked) {
        appState.autoRefreshInterval = setInterval(() => {
            fetchData();
        }, CONFIG.AUTO_REFRESH_INTERVAL);
    }
}

function toggleAutoRefresh() {
    if (elements.autoRefresh.checked) {
        startAutoRefresh();
    } else {
        if (appState.autoRefreshInterval) {
            clearInterval(appState.autoRefreshInterval);
            appState.autoRefreshInterval = null;
        }
    }
}

// Función de refresh manual
function refreshData() {
    fetchData();
}

// Manejo de errores globales
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showError('Ocurrió un error inesperado. Por favor, recarga la página.');
});

// Service Worker para cache offline (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 