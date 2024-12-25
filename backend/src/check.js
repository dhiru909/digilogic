const https = require('https');

const makeRequest = (url, index) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        console.log(`Request ${index + 1} succeeded:`, res.statusCode);
        resolve(data);
      });
    }).on('error', (err) => {
      console.error(`Request ${index + 1} failed:`, err.message);
      reject(err);
    });
  });
};

const makeMultipleRequests = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts"; // Replace with your URL
  const requests = Array.from({ length: 100 }, (_, i) => makeRequest(url, i));

  try {
    const responses = await Promise.allSettled(requests); // AllSettled to track success and failure
    console.log("All requests completed");
    const successful = responses.filter((res) => res.status === "fulfilled");
    console.log("Successful responses count:", successful.length);
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

makeMultipleRequests();
