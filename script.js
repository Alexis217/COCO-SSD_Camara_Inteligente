const video = document.getElementById("webcam");
const liveView = document.getElementById("liveView");
const demosSection = document.getElementById("demos");
const enableWebcamButton = document.getElementById("webcamButton");

// Compruebe si se admite el acceso a la cámara web.
function getUserMediaSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// Si la cámara web es compatible, agregue un detector de eventos al botón para cuando el usuario quiera activarlo para llamar a la función enableCam que definiremos en el siguiente paso.
if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener("click", enableCam);
} else {
  console.warn("getUserMedia() is not supported by your browser");
}

// Función de marcador de posición para el siguiente paso. Pegar sobre esto en el siguiente paso.
function enableCam(event) {}

// Habilite la vista de cámara web en vivo y comience la clasificación.
function enableCam(event) {
  // Continuar solo si el COCO-SSD ha terminado de cargarse.
  if (!model) {
    return;
  }

  // Ocultar el botón una vez hecho clic.
  event.target.classList.add("removed");

  // Parámetros getUsermedia para forzar el video pero no el audio.
  const constraints = {
    video: true,
  };

  // Activar la transmisión de la cámara web.
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
    video.addEventListener("loadeddata", predictWebcam);
  });
}

// Función de marcador de posición para el siguiente paso.
function predictWebcam() {}

// El modelo de simulación se ha cargado para que podamos probar el código de la cámara web.
var model = true;
demosSection.classList.remove("invisible");

// Almacene el modelo resultante en el ámbito global de nuestra aplicación.
var model = undefined;

// Antes de usar la clase COCO-SSD, debemos esperar a que termine de cargarse. Los modelos de aprendizaje automático pueden ser grandes y tardar un tiempo en ejecutarse.
// Nota: cocoSsd es un objeto externo cargado desde nuestro archivo index.html, así que ignore cualquier advertencia en Glitch.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Muestra la sección de demostración ahora que el modelo está listo para usar.
  demosSection.classList.remove("invisible");
});

var children = [];

function predictWebcam() {
  // Ahora comencemos a clasificar un marco en la secuencia.
  model.detect(video).then(function (predictions) {
    // Elimina cualquier resaltado que hayamos hecho en el cuadro anterior.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);

    // Ahora vamos a recorrer las predicciones y dibujarlas en la vista en vivo si
    // Ellos tienen un alto puntaje de confianza.
    for (let n = 0; n < predictions.length; n++) {
      // Si estamos más del 66% seguros de que lo hemos clasificado bien, ¡dibújalo!
      if (predictions[n].score > 0.66) {
        const p = document.createElement("p");
        p.innerText =
          predictions[n].class +
          " - with " +
          Math.round(parseFloat(predictions[n].score) * 100) +
          "% confidence.";
        p.style =
          "margin-left: " +
          predictions[n].bbox[0] +
          "px; margin-top: " +
          (predictions[n].bbox[1] - 10) +
          "px; width: " +
          (predictions[n].bbox[2] - 10) +
          "px; top: 0; left: 0;";

        const highlighter = document.createElement("div");
        highlighter.setAttribute("class", "highlighter");
        highlighter.style =
          "left: " +
          predictions[n].bbox[0] +
          "px; top: " +
          predictions[n].bbox[1] +
          "px; width: " +
          predictions[n].bbox[2] +
          "px; height: " +
          predictions[n].bbox[3] +
          "px;";

        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        children.push(highlighter);
        children.push(p);
      }
    }

    // Llame a esta función nuevamente para seguir prediciendo cuándo el navegador está listo.
    window.requestAnimationFrame(predictWebcam);
  });
}
