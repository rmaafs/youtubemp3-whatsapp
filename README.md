# youtubemp3-whatsapp
WhatsAppBot that download mp3 and sent to a number.

---

### Instalación

- Ejecutar `npm i` para instalar las dependencias.
- En caso de que no funcione, instalar manualmente las dependencias.
- Descargar `ffmpeg`, y en el archivo `index.js` configurar la ruta del ffmpeg en `ffmpegPath`.

---

### Dependencias

- whatsapp-web.js
- qrcode-terminal
- youtube-mp3-downloader

---

### Ejecución

- Ejecutar `node index.js`
- Si es la primera vez que se ejecuta, en consola aparecerá un código QR (cómo el de WhatsApp Web), el cual tendrás que escanear con tu dispositivo.
- Mandar un mensaje a ti mismo escribiendo `!youtube` y comprobar que funcione.
