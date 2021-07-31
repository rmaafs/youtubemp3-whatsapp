var ytDownloader = require("youtube-mp3-downloader");
const { MessageMedia } = require("whatsapp-web.js");

class Youtube {
  constructor(url, client, msg) {
    this.PATH = "audios";
    this.msg = msg;
    this.client = client;
    this.extractID(url);
    let self = this;

    console.log("Downloading ID:", this.id);

    this.YD = new ytDownloader({
      //ffmpegPath: "/usr/bin/ffmpeg", // FFmpeg binary location
      //outputPath: "/home/elmaps/botWhatsapp/audios", // Output file location (default: the home directory)
      ffmpegPath: "C:/ffmpeg/bin/ffmpeg.exe", // FFmpeg binary location
      outputPath: this.PATH, // Output file location (default: the home directory)
      youtubeVideoQuality: "highestaudio", // Desired video quality (default: highestaudio)
      queueParallelism: 2, // Download parallelism (default: 1)
      progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
      allowWebm: false, // Enable download from WebM sources (default: false)
    });

    this.msg.reply("Descargando...");
    this.YD.download(this.id, this.id + ".mp3");

    this.YD.on("error", function (err) {
      self.msg.reply("Error ☹ \n" + err);
    });

    this.YD.on("progress", function (data) {
      console.log(
        data.videoId + ":",
        data.progress.percentage.toFixed(1) +
          ", remaining: " +
          (data.progress.remaining || 0) / 1000 +
          "s"
      );
    });

    this.YD.on("finished", async function (err, json) {
      console.log(json);

      const media = await MessageMedia.fromFilePath(
        self.PATH + "/" + json.videoId + ".mp3"
      );
      self.client.sendMessage(self.msg.from, media, {
        sendMediaAsDocument: false,
        caption: json.videoTitle,
      });
    });
  }

  /**
   * Función para extraer el ID de la URL
   * @param {Url al que le vamos a extraer el ID} url
   */
  extractID(url) {
    if (url.includes("youtu.be")) {
      this.id = url.split("/")[3];
    } else if (url.includes("watch?v=")) {
      this.id = url.split("watch?v=")[1];
      //¿El URL contiene algún parámetro antes del ID?
      if (this.id.includes("&")) {
        this.id = this.id.split("&")[0];
      }
    }
  }
}

export default Youtube;
