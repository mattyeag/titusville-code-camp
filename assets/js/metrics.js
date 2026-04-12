function sendEventAsync(event) {
  fetch("https://script.google.com/macros/s/AKfycbxVTEim_YKs5Gmrg8Po5oxSOJVpoSjh_0s3l2Ja8D7y6XZL1Fyx84US1WwjbPw2IUKO/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event,
      timestamp: new Date().toISOString(),
    }),
    redirect: "follow",
  }).catch(() => {});
}


document.addEventListener("DOMContentLoaded", () => {
    sendEventAsync("page_load");
});