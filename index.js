const fs = require("fs");
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const SESSION_FILE_PATH = "./session.json";
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

//Cliente de WhatsApp que configuraremos
const client = new Client({
  puppeteer: {
    args: ["--no-sandbox"],
    //executablePath: "/usr/bin/google-chrome-stable",
  },
  session: sessionCfg, //Sesión previamente cargada
  //ffmpegPath: "/usr/bin/ffmpeg",
  ffmpegPath: "C:/ffmpeg/bin/ffmpeg.exe",
});
client.initialize();

//Cuando recibamos el QR
client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

//Cuando nos autentiquemos
client.on("authenticated", (session) => {
  console.log("AUTHENTICATED", session);
  sessionCfg = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    if (err) {
      console.error(err);
    }
  });
});

//Cuando el cliente está listo
client.on("ready", async () => {
  console.log("Client is ready!");
  console.log("WhatsApp Web v", await client.getWWebVersion());
  console.log("WWebJS v", require("whatsapp-web.js").version);
});

//Cuando creamos un mensaje
client.on("message_create", async (msg) => {
  if (msg.body.startsWith("!youtube")) {
    msg.reply("Works!");
  }
});
