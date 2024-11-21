const axios = require("axios");
const { log } = require("./utils"); // Adjust the path as necessary

const baseUrl = "https://tonclayton.fun/api";

async function getMainJsFormat(baseUrl) {
  try {
    const response = await axios.get(baseUrl);
    const content = response.data;
    const matches = content.match(/src="(\/assets\/index-[^"]+\.js)"/g);

    if (matches) {
      const uniqueMatches = Array.from(new Set(matches.map((m) => m.slice(5, -1)))); // Remove 'src="' and '"'
      return uniqueMatches.sort((a, b) => b.length - a.length); // Sort by length descending
    } else {
      return null;
    }
  } catch (error) {
    log(`Error fetching the base URL: ${error.message}`, "warning");
    return null;
  }
}

async function checkBaseUrl() {
  const base_url = "https://tonclayton.fun/";
  const mainJsFormats = await getMainJsFormat(base_url);

  if (mainJsFormats) {
    for (const format of mainJsFormats) {
      log(`Trying format: ${format}`);
      const fullUrl = `https://tonclayton.fun${format}`;
      const result = await fetchApiBaseId(fullUrl);
      if (result && result.includes(baseUrl)) {
        log("No change in api!", "success");
        return result;
      }
    }
    return false;
  } else {
    log("Could not find any main.js format. Dumping page content for inspection:");
    try {
      const response = await axios.get(base_url);
      console.log(response.data.slice(0, 1000)); // Print first 1000 characters of the page
      return false;
    } catch (error) {
      log(`Error fetching the base URL for content dump: ${error.message}`, "warning");
      return false;
    }
  }
}

async function fetchApiBaseId(resFileJs) {
  try {
    const response = await axios.get(resFileJs);
    const jsContent = response.data;
    // Tìm API base ID từ nội dung file JS
    const match = jsContent.match(/Yge="([^"]+)"/);
    if (match && match[1]) {
      return `https://tonclayton.fun/api/${match[1]}`;
    } else {
      throw new Error("Không tìm thấy API Base ID trong file JS");
    }
  } catch (error) {
    log(`Lỗi khi lấy API Base ID: ${error.message}`, "error");
    return false;
  }
}

module.exports = { checkBaseUrl };
