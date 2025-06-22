// netlify/functions/submit-form.js

const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Only POST requests allowed",
    };
  }

  const data = JSON.parse(event.body);
  const name = data.name || "Unbekannt";
  const email = data.email || "ohne@email.de";

  const content = Buffer.from(
    JSON.stringify(
      {
        name,
        email,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    )
  ).toString("base64");

  const filename = `formdata/${Date.now()}-${name}.json`;

  const response = await fetch(
    `https://api.github.com/repos/enaaacode/sneakpeak/contents/${filename}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${process.env.GH_TOKEN}`,
        "User-Agent": "netlify-function",
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: `📥 Add new form entry from ${name}`,
        content: content,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    return {
      statusCode: response.status,
      body: `GitHub API error: ${error}`,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
