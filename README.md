# youtubemp3-whatsapp
WhatsAppBot that download mp3 and sent to a number.

---

# Preview

![image](https://user-images.githubusercontent.com/47652130/127727129-65f8361d-9325-43e6-bc97-5666bf9bfb8e.png)

#### Auto destrucción de mensajes de estatus 🙂

![image](https://user-images.githubusercontent.com/47652130/127727144-2c759121-ccb7-45db-919f-de707ac949a1.png)

#### Compatible en modo terminal sin tener un navegador abierto.

![image](https://user-images.githubusercontent.com/47652130/127727152-224b274f-aac8-4c73-bf06-10111f2c1a58.png)


---

### Instalación

- Ejecutar `npm i` para instalar las dependencias.
- En caso de que no funcione, instalar manualmente las dependencias.
- Descargar `ffmpeg`, y en el archivo `index.js` y `Youtube.js` configurar la ruta del ffmpeg en `ffmpegPath`.

---

### Dependencias

- whatsapp-web.js
- qrcode-terminal
- youtube-mp3-downloader

---

### Ejecución

- Ejecutar `npm start`
- Si es la primera vez que se ejecuta, en consola aparecerá un código QR (cómo el de WhatsApp Web), el cual tendrás que escanear con tu dispositivo.
- Mandar un mensaje a ti mismo escribiendo `!youtube` y comprobar que funcione.
