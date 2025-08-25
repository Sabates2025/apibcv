# Guía de Contribución

¡Gracias por tu interés en contribuir a BCV Cursos! Este documento te guiará a través del proceso de contribución.

## ¿Cómo puedo contribuir?

### Reportar Bugs
- Usa la plantilla de issue para bugs
- Incluye pasos detallados para reproducir el problema
- Agrega capturas de pantalla si es posible
- Especifica tu navegador y sistema operativo

### Solicitar Características
- Usa la plantilla de issue para características
- Describe claramente la funcionalidad que te gustaría ver
- Explica por qué esta característica sería útil

### Contribuir Código
- Haz fork del repositorio
- Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
- Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
- Haz push a la rama (`git push origin feature/AmazingFeature`)
- Abre un Pull Request

## Estándares de Código

### JavaScript
- Usa ES6+ cuando sea posible
- Mantén funciones pequeñas y enfocadas
- Agrega comentarios para código complejo
- Usa nombres descriptivos para variables y funciones

### CSS
- Usa BEM o una metodología similar para nombrar clases
- Mantén especificidad baja
- Usa variables CSS para colores y valores reutilizables
- Asegúrate de que sea responsive

### HTML
- Usa HTML5 semántico
- Mantén la accesibilidad en mente
- Usa atributos ARIA cuando sea necesario

## Proceso de Pull Request

1. **Fork y Clone**: Haz fork del repositorio y clónalo localmente
2. **Rama**: Crea una rama para tu feature
3. **Desarrollo**: Desarrolla tu feature siguiendo los estándares
4. **Tests**: Asegúrate de que todo funcione correctamente
5. **Commit**: Haz commit con mensajes descriptivos
6. **Push**: Haz push a tu fork
7. **Pull Request**: Abre un PR con una descripción clara

## Mensajes de Commit

Usa el formato convencional:
- `feat:` para nuevas características
- `fix:` para correcciones de bugs
- `docs:` para cambios en documentación
- `style:` para cambios de formato
- `refactor:` para refactorización de código
- `test:` para agregar o modificar tests
- `chore:` para tareas de mantenimiento

Ejemplo: `feat: add dark mode toggle`

## Configuración del Entorno de Desarrollo

1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. Para desarrollo local, puedes usar un servidor:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

## Testing

Antes de hacer commit:
- [ ] La aplicación funciona en diferentes navegadores
- [ ] Es responsive en diferentes tamaños de pantalla
- [ ] No hay errores en la consola
- [ ] Las funcionalidades principales funcionan correctamente

## Preguntas Frecuentes

**¿Puedo contribuir si no sé programar?**
¡Sí! Puedes reportar bugs, sugerir mejoras, o ayudar con la documentación.

**¿Qué pasa si mi PR es rechazado?**
No te desanimes. Los mantenedores te darán feedback constructivo para mejorar tu contribución.

**¿Cómo puedo contactar al equipo?**
Puedes abrir un issue o usar la sección de discusiones del repositorio.

## Agradecimientos

Gracias a todos los contribuidores que han ayudado a hacer de BCV Cursos una mejor aplicación para la comunidad venezolana.

---

**¿Tienes más preguntas?** ¡No dudes en preguntar abriendo un issue!
