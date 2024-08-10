const http = require("http");
const useragent = require("useragent");

http.createServer(function (request, response) {
    const agent = useragent.parse(request.headers["user-agent"]);

    console.log("User-Agent:", agent.toString());
    console.log(request.url);

    const acceptLanguage = request.headers["accept-language"];
    let languageMessage = "";
    if (acceptLanguage) {
      const languages = acceptLanguage.split(",");
      const primaryLanguage = languages[0].split(";")[0];
      if (primaryLanguage === "id") {
        languageMessage = "Anda menggunakan bahasa Indonesia";
      } else if (primaryLanguage === "en-US" || primaryLanguage === "en") {
        languageMessage = "You use English";
      }
    }

    let greeting = "Selamat datang";

    if (agent.os.family === "iOS") {
      greeting = "Hallo dari iPhone";
    } else if (agent.os.family === "Windows") {
      greeting = "Hallo dari Windows";
    } else if (agent.os.family === "Android") {
      greeting = "Hallo dari Android";
    } else if (agent.os.family === "Mac OS") {
      greeting = "Hallo dari Mac";
    }

    if (request.url === "/") {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(`<b>${greeting}</b><br>${languageMessage}`);
    } else if (request.url === "/profil") {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("Ini adalah <b>Profil</b>");
    } else {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("Halaman Yang Anda Cari Tidak Ada");
    }
  })
  .listen(3000);

console.log("Server running at http://localhost:3000/");
