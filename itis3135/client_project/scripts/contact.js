(function () {
  emailjs.init("DKNnbEOsUd-AVqyDZ");
})();
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("request-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const params = {
      first: document.getElementById("first").value,
      last: document.getElementById("last").value,
      email: document.getElementById("email").value,
      request: document.getElementById("request").value,
    };

    emailjs
      .send("service_r0s10lo", "template_3i6oghc", params)
      .then(() => {
        alert("Request sent successfully!");
        form.reset();
      })
      .catch((error) => {
        alert("Failed to send request.");
        console.error(error);
      });
  });
});
