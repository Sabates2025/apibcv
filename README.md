# BCV Cursos - Tasas de Cambio

Una aplicación web moderna y responsiva para consultar las tasas de cambio del Banco Central de Venezuela (BCV) en tiempo real.

## 🌟 Características

- **Interfaz moderna**: Diseño elegante con gradientes y efectos visuales
- **Responsive**: Funciona perfectamente en dispositivos móviles y de escritorio
- **Actualización automática**: Se actualiza cada 5 minutos automáticamente
- **Cache local**: Almacena datos localmente para mejor rendimiento
- **Sin dependencias externas**: Solo HTML, CSS y JavaScript vanilla
- **Offline**: Funciona incluso sin conexión a internet (con datos cacheados)

## 🚀 Demo

Visita la aplicación en: [https://tu-usuario.github.io/tu-repositorio](https://tu-usuario.github.io/tu-repositorio)

## 💻 Tecnologías utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño moderno con CSS Grid, Flexbox y animaciones
- **JavaScript ES6+**: Lógica de la aplicación y manejo de datos
- **Font Awesome**: Iconos vectoriales
- **Google Fonts**: Tipografía Inter para mejor legibilidad

## 📱 Monedas soportadas

- 🇪🇺 **Euro (EUR)** - €
- 🇨🇳 **Yuan (CNY)** - ¥
- 🇹🇷 **Lira (TRY)** - ₺
- 🇷🇺 **Rublo (RUB)** - ₽
- 🇺🇸 **Dólar (USD)** - $

## 🛠️ Instalación y uso

### Opción 1: GitHub Pages (Recomendado)

1. Haz fork de este repositorio
2. Ve a Settings > Pages en tu repositorio
3. Selecciona "Deploy from a branch"
4. Elige la rama `main` y la carpeta `/ (root)`
5. ¡Listo! Tu sitio estará disponible en `https://tu-usuario.github.io/tu-repositorio`

### Opción 2: Local

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

2. Abre `index.html` en tu navegador web

### Opción 3: Servidor local

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

## 📁 Estructura del proyecto

```
bcvcurs/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── README.md           # Este archivo
└── .github/            # Configuración de GitHub (opcional)
    └── workflows/      # GitHub Actions (opcional)
```

## 🔧 Configuración

### Personalización de colores

Puedes modificar los colores principales editando las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ffd700;
}
```

### Cambiar intervalo de actualización

Modifica la constante en `script.js`:

```javascript
const CONFIG = {
    AUTO_REFRESH_INTERVAL: 5 * 60 * 1000, // Cambiar a 5 minutos
    // ...
};
```

## 🌐 API y datos

La aplicación obtiene datos del sitio oficial del BCV: [http://www.bcv.org.ve/](http://www.bcv.org.ve/)

**Nota importante**: Debido a restricciones de CORS, la aplicación utiliza un proxy para obtener los datos. En un entorno de producción, considera implementar tu propio backend o usar la API oficial del BCV si está disponible.

## 📱 PWA (Progressive Web App)

La aplicación incluye características de PWA:
- Cache offline
- Instalable en dispositivos móviles
- Service Worker para mejor rendimiento

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Banco Central de Venezuela](http://www.bcv.org.ve/) por proporcionar los datos
- [Font Awesome](https://fontawesome.com/) por los iconos
- [Google Fonts](https://fonts.google.com/) por la tipografía Inter

## 📞 Soporte

Si tienes alguna pregunta o problema:

1. Revisa los [Issues](https://github.com/tu-usuario/tu-repositorio/issues) existentes
2. Crea un nuevo Issue si no encuentras solución
3. Contacta al mantenedor del proyecto

---

**Desarrollado con ❤️ para la comunidad venezolana**