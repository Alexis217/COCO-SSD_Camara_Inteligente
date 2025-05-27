# 🧠📸 Detección de Objetos con TensorFlow.js

Este proyecto permite **detectar múltiples objetos en tiempo real** utilizando la cámara web y un modelo preentrenado (`coco-ssd`) en **TensorFlow.js**. Es ideal para demostrar el poder del aprendizaje automático directamente en el navegador, sin necesidad de servidores ni instalaciones complicadas.

---

## 🚀 Tecnologías utilizadas

- 🟧 **TensorFlow.js** - Librería de ML en JavaScript
- 🎥 **getUserMedia API** - Acceso a la cámara web del navegador
- 🌐 **HTML5/CSS3** - Estructura y estilo de la página
- 🧩 **Modelo COCO-SSD** - Clasificación de objetos entrenado previamente

---

## 🖼️ Funcionalidad

1. 🕒 Espera a que el modelo cargue.
2. 🟢 Presiona **"Habilitar cámara web"** para permitir acceso a tu cámara.
3. 🔍 Acerca objetos al lente y observa la detección en tiempo real.
4. 📦 Se destacan los objetos detectados con un marcador visual (recuadro verde) y porcentaje de confianza.

---

## 🧪 Prueba el proyecto

```bash
git clone https://github.com/tu-usuario/deteccion-objetos-tfjs.git
# Abre index.html en un navegador compatible con getUserMedia
```

> ⚠️ Asegúrate de usar un navegador moderno como **Chrome** o **Firefox**, y **permite el acceso a la cámara**.

---

## 📁 Estructura del proyecto

```
├── index.html       # Estructura principal de la página
├── style.css        # Estilos para resaltado y diseño
├── script.js        # Lógica JS de detección
└── README.md        # Este archivo explicativo
```

## 🧠 Sobre el modelo COCO-SSD

- Detecta objetos como: personas, laptops, celulares, botellas, sillas, etc.
- Modelo ligero, ideal para ejecución en tiempo real en dispositivos personales.
- Proporciona clase del objeto y nivel de confianza.

---

## ✅ Requisitos

- Navegador con soporte para ES6 y `getUserMedia`
- Conexión a internet (para cargar TensorFlow\.js y el modelo)

## ✨ Autores

Desarrollado para el trabajo practico de Seminario de Actualizacion por: Alexis Albarenga y Avila Felix.
🐙 [GitHub, Alexis Albarenga](https://github.com/Alexis217) • 🐙 [GitHub, Avila Felix](https://github.com/avilafelix998)

---
