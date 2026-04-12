function sendEventAsync(data) {
  fetch("https://script.google.com/macros/s/AKfycbxVTEim_YKs5Gmrg8Po5oxSOJVpoSjh_0s3l2Ja8D7y6XZL1Fyx84US1WwjbPw2IUKO/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: data.event,
      timestamp: new Date().toISOString(),
      time: data.time || null 
    }),
    redirect: "follow",
  }).catch(() => {});
}


document.addEventListener("DOMContentLoaded", () => {
    sendEventAsync({ event: "page_load" });
});


(function () {
  let startTime = Date.now();
  let hasSent = false;

  function getMinutes() {
    return (Date.now() - startTime) / 60000;
  }

  function sendTimeOnPage() {
    if (hasSent) return;
    hasSent = true;

    const minutes = getMinutes();
    if (minutes < 0.05) return;

    sendEventAsync({
      event: "time_on_page",
      time: +minutes.toFixed(2)
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      sendTimeOnPage();
    }
  });
  window.addEventListener("pagehide", sendTimeOnPage);
  window.addEventListener("beforeunload", sendTimeOnPage);
})();