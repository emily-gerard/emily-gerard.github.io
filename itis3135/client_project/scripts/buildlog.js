document.addEventListener("DOMContentLoaded", function () {
  const buildLog = document.getElementById("build-log");

  fetch("data/buildlog.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Build log could not be loaded.");
      }
      return response.json();
    })
    .then((entries) => {
      buildLog.innerHTML = "";

      entries.forEach((entry) => {
        const logCard = document.createElement("article");
        logCard.classList.add("log-card");

        logCard.innerHTML = `
            <h3>${entry.title}</h3>
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Status:</strong> ${entry.status}</p>
            <p>${entry.description}</p>
          `;

        buildLog.appendChild(logCard);
      });
    })
    .catch((error) => {
      buildLog.innerHTML = `<p class="error">Sorry, the build log could not be loaded.</p>`;
      console.error(error);
    });
});
