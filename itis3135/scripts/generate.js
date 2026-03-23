document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.getElementById("form");
  const mainElement = document.getElementById("main-content");
  const generateHtmlBtn = document.getElementById("generate-html-btn");

  if (!formElement || !mainElement || !generateHtmlBtn) {
    return;
  }

  const escapeHtml = (text) => {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const getValue = (id) => {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
  };

  const collectCourses = () => {
    const courses = [];

    for (let i = 1; i <= 6; i += 1) {
      const dep = getValue(`c${i}_dep`);
      const num = getValue(`c${i}_num`);
      const name = getValue(`c${i}_name`);
      const reason = getValue(`c${i}_reason`);

      if (dep || num || name || reason) {
        courses.push({ dep, num, name, reason });
      }
    }

    const dynamicCourses = document.querySelectorAll(".dynamic-course");

    dynamicCourses.forEach((course) => {
      const num = course.dataset.courseNumber;
      const dep = getValue(`extra_dep_${num}`);
      const courseNum = getValue(`extra_num_${num}`);
      const name = getValue(`extra_name_${num}`);
      const reason = getValue(`extra_reason_${num}`);

      if (dep || courseNum || name || reason) {
        courses.push({
          dep,
          num: courseNum,
          name,
          reason,
        });
      }
    });

    return courses;
  };

  const buildIntroductionHtml = () => {
    const courses = collectCourses();

    let coursesHtml = "";
    courses.forEach((course) => {
      coursesHtml += `  <li>${escapeHtml(course.dep)} ${escapeHtml(
        course.num
      )} - ${escapeHtml(course.name)}<br>
      <em>Reason:</em> ${escapeHtml(course.reason)}</li>\n`;
    });

    const github = getValue("github");
    const gitIo = getValue("git_io");
    const cltSite = getValue("clt_site");
    const linked = getValue("linked");
    const fcc = getValue("fcc");

    return `<section>
    <h2>${escapeHtml(getValue("f_name"))} ${escapeHtml(
      getValue("m_name")
    )} ${escapeHtml(getValue("l_name"))}</h2>
    <p><strong>Nickname:</strong> ${escapeHtml(getValue("n_name"))}</p>
    <p><strong>Mascot:</strong> ${escapeHtml(
      getValue("mascot_adj")
    )} ${escapeHtml(getValue("mascot_ani"))}</p>
    <p><strong>Caption:</strong> ${escapeHtml(getValue("caption"))}</p>
    <p><strong>Personal Statement:</strong> ${escapeHtml(
      getValue("p_statement")
    )}</p>
    <p><strong>Personal Background:</strong> ${escapeHtml(
      getValue("per_background")
    )}</p>
    <p><strong>Professional Background:</strong> ${escapeHtml(
      getValue("prof_background")
    )}</p>
    <p><strong>Academic Background:</strong> ${escapeHtml(
      getValue("a_background")
    )}</p>
    <p><strong>Background in Subject:</strong> ${escapeHtml(
      getValue("sub_background")
    )}</p>
    <p><strong>Primary Computer:</strong> ${escapeHtml(
      getValue("prim_comp")
    )}</p>
    <p><strong>Backup Computer:</strong> ${escapeHtml(getValue("backup"))}</p>
  
    <h3>Courses</h3>
    <ul>
  ${coursesHtml}  </ul>
  
    <p><strong>Quote:</strong> "${escapeHtml(
      getValue("quote")
    )}" — ${escapeHtml(getValue("author"))}</p>
    <p><strong>Fun Fact:</strong> ${escapeHtml(getValue("fun_fact"))}</p>
    <p><strong>Something to Share:</strong> ${escapeHtml(getValue("share"))}</p>
  
    <h3>Links</h3>
    <ul>
      <li><a href="${escapeHtml(github)}">GitHub</a></li>
      <li><a href="${escapeHtml(gitIo)}">GitHub.io</a></li>
      <li><a href="${escapeHtml(cltSite)}">Charlotte Site</a></li>
      <li><a href="${escapeHtml(linked)}">LinkedIn</a></li>
      <li><a href="${escapeHtml(fcc)}">FreeCodeCamp</a></li>
    </ul>
  </section>`;
  };

  const showGeneratedHtml = () => {
    const generatedHtml = buildIntroductionHtml();

    mainElement.innerHTML = `
        <h2>Introduction HTML</h2>
        <section>
          <p>Copy the HTML below:</p>
          <pre><code class="language-html">${escapeHtml(
            generatedHtml
          )}</code></pre>
          <p><a href="#" id="reset-link">Reset and do it again</a></p>
        </section>
      `;

    if (window.hljs) {
      window.hljs.highlightAll();
    }

    const resetLink = document.getElementById("reset-link");
    if (resetLink) {
      resetLink.addEventListener("click", (e) => {
        e.preventDefault();
        location.reload();
      });
    }
  };

  generateHtmlBtn.addEventListener("click", () => {
    showGeneratedHtml();
  });
});
