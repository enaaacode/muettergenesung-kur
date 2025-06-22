const fetch = require("node-fetch");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Nur POST erlaubt",
    };
  }

  const data = JSON.parse(event.body);
  const name = data.name || "Unbekannt";
  const email = data.email || "ohne@email.de";
  const timestamp = new Date().toISOString();

  const jsonContent = JSON.stringify({ name, email, timestamp }, null, 2);
  const filename = `formdata-${Date.now()}-${name}.json`;

  const nextcloudUrl = `https://fileshare.statt.cloud/remote.php/dav/files/enaaa/01_Kunden/Muettergenesung/Portalimport_JSON/${filename}`;

  const response = await fetch(nextcloudUrl, {
    method: "PUT",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${process.env.NC_USER}:${process.env.NC_PASS}`).toString(
          "base64"
        ),
      "Content-Type": "application/json",
    },
    body: jsonContent,
  });

  if (!response.ok) {
    const err = await response.text();
    return {
      statusCode: response.status,
      body: `Fehler beim Upload zur Nextcloud: ${err}`,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, file: filename }),
  };
};
