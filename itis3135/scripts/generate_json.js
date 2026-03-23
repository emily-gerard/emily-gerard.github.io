document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.getElementById("form");
  const mainElement = document.getElementById("main-content");
  const generateJsonBtn = document.getElementById("generate-json-btn");

  if (!formElement || !mainElement || !generateJsonBtn) {
    return;
  }

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
        courses.push({
          department: dep,
          number: num,
          name,
          reason,
        });
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
          department: dep,
          number: courseNum,
          name,
          reason,
        });
      }
    });

    return courses;
  };

  const buildIntroductionJson = () => {
    return {
      firstName: getValue("f_name"),
      middleName: getValue("m_name"),
      nickname: getValue("n_name"),
      lastName: getValue("l_name"),
      acknowledgement: getValue("acknowledgement"),
      acknowledgementDate: getValue("ack_date"),
      mascotAdjective: getValue("mascot_adj"),
      mascotAnimal: getValue("mascot_ani"),
      divider: getValue("divider"),
      pictureCaption: getValue("caption"),
      personalStatement: getValue("p_statement"),
      personalBackground: getValue("per_background"),
      professionalBackground: getValue("prof_background"),
      academicBackground: getValue("a_background"),
      subjectBackground: getValue("sub_background"),
      primaryComputer: getValue("prim_comp"),
      backupComputer: getValue("backup"),
      courses: collectCourses(),
      quote: getValue("quote"),
      quoteAuthor: getValue("author"),
      funFact: getValue("fun_fact"),
      somethingToShare: getValue("share"),
      links: {
        github: getValue("github"),
        githubIo: getValue("git_io"),
        charlotteSite: getValue("clt_site"),
        linkedIn: getValue("linked"),
        freeCodeCamp: getValue("fcc"),
      },
    };
  };

  const showGeneratedJson = () => {
    const jsonObject = buildIntroductionJson();
    const jsonText = JSON.stringify(jsonObject, null, 2);

    mainElement.innerHTML = `
        <h2>Introduction HTML</h2>
        <section>
          <p>Copy the JSON below:</p>
          <pre><code class="language-json">${jsonText}</code></pre>
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

  generateJsonBtn.addEventListener("click", () => {
    showGeneratedJson();
  });
});
