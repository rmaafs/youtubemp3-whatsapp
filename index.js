const fs = require("fs");
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { default: Youtube } = require("./src/youtube/Youtube");

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
  console.log("AUTHENTICATED");
  sessionCfg = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    if (err) {
      console.error(err);
    }
  });
});

//Cuando el cliente está listo
client.on("ready", async () =>
  console.log(
    "READY! WhatsApp Web v",
    await client.getWWebVersion(),
    "/",
    require("whatsapp-web.js").version
  )
);

//Cuando creamos un mensaje
client.on("message_create", async (msg) => {
  if (msg.body.toLowerCase().startsWith("!youtube")) {
    //Si ha mandado el URL en el mensaje
    if (msg.body.split(" ").length > 0) {
      let url = msg.body.split(" ")[1];
      let youtube = new Youtube(url, client, msg);
      console.log("ID:", youtube.id);
    } else {
      msg.reply("Please use !youtube <url from the video>");
    }
  }
});
