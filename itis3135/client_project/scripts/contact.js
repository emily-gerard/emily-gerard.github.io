document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("request-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const first = document.getElementById("first").value;
    const last = document.getElementById("last").value;
    const email = document.getElementById("email").value;
    const request = document.getElementById("request").value;

    const subject = `Build Request from ${first} ${last}`;
    const body = `Name: ${first} ${last}
  Email: ${email}
  
  Build Request:
  ${request}`;

    window.location.href = `mailto:ccarey12@charlotte.edu?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  });
});
