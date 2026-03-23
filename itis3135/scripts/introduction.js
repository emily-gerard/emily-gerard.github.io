document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.getElementById("form");
  const mainElement = document.getElementById("main-content");
  const coursesContainer = document.getElementById("courses-container");
  const addCourseBtn = document.getElementById("add-course-btn");

  let extraCourseCount = 0;

  const getValue = (id) => {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
  };

  const resetDynamicCourses = () => {
    const dynamicCourses = coursesContainer.querySelectorAll(".dynamic-course");
    dynamicCourses.forEach((course) => course.remove());
    extraCourseCount = 0;
  };

  const resetFormProgress = () => {
    formElement.reset();
    resetDynamicCourses();
  };

  const validateForm = () => {
    const requiredFields = formElement.querySelectorAll("[required]");

    for (const field of requiredFields) {
      if (field.type === "file") {
        if (field.files.length === 0) {
          field.focus();
          return false;
        }
      } else if (!field.value || field.value.trim() === "") {
        field.focus();
        return false;
      }
    }

    return true;
  };

  const addCourseFields = () => {
    extraCourseCount += 1;

    const courseWrapper = document.createElement("div");
    courseWrapper.className = "dynamic-course";
    courseWrapper.dataset.courseNumber = extraCourseCount;

    courseWrapper.innerHTML = `
        <h4>Additional Course ${extraCourseCount}</h4>
        <p>
          <label for="extra_dep_${extraCourseCount}">Course Department: </label>
          <input type="text" id="extra_dep_${extraCourseCount}" name="extra_dep_${extraCourseCount}" placeholder="Dept (e.g., ITSC)" />
  
          <label for="extra_num_${extraCourseCount}">Course Number: </label>
          <input type="text" id="extra_num_${extraCourseCount}" name="extra_num_${extraCourseCount}" placeholder="Course number" />
  
          <label for="extra_name_${extraCourseCount}">Course Name: </label>
          <input type="text" id="extra_name_${extraCourseCount}" name="extra_name_${extraCourseCount}" placeholder="Course title" />
  
          <label for="extra_reason_${extraCourseCount}">Course Reason: </label>
          <input type="text" id="extra_reason_${extraCourseCount}" name="extra_reason_${extraCourseCount}" placeholder="Why are you taking this?" />
  
          <button type="button" class="delete-course-btn">Delete</button>
        </p>
      `;

    const deleteBtn = courseWrapper.querySelector(".delete-course-btn");
    deleteBtn.addEventListener("click", () => {
      courseWrapper.remove();
    });

    coursesContainer.appendChild(courseWrapper);
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

    const dynamicCourses = coursesContainer.querySelectorAll(".dynamic-course");

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

  const showIntroductionPage = () => {
    const courses = collectCourses();

    let coursesHTML = "";
    courses.forEach((course, index) => {
      coursesHTML += `
          <li>
            <strong>Course ${index + 1}:</strong>
            ${course.dep} ${course.num} - ${course.name}
            <br />
            <em>Reason:</em> ${course.reason}
          </li>
        `;
    });

    const pictureInput = document.getElementById("picture");
    const pictureFileName =
      pictureInput.files.length > 0
        ? pictureInput.files[0].name
        : "No file selected";

    mainElement.innerHTML = `
        <h2>${getValue("f_name")} ${getValue("m_name")} ${getValue(
      "l_name"
    )}</h2>
        <p><strong>Nickname:</strong> ${getValue("n_name")}</p>
        <p><strong>Mascot:</strong> ${getValue("mascot_adj")} ${getValue(
      "mascot_ani"
    )}</p>
        <p><strong>Image File:</strong> ${pictureFileName}</p>
        <p><strong>Caption:</strong> ${getValue("caption")}</p>
        <p><strong>Personal Statement:</strong> ${getValue("p_statement")}</p>
        <p><strong>Personal Background:</strong> ${getValue(
          "per_background"
        )}</p>
        <p><strong>Professional Background:</strong> ${getValue(
          "prof_background"
        )}</p>
        <p><strong>Academic Background:</strong> ${getValue("a_background")}</p>
        <p><strong>Background in Subject:</strong> ${getValue(
          "sub_background"
        )}</p>
        <p><strong>Primary Computer:</strong> ${getValue("prim_comp")}</p>
        <p><strong>Backup Computer:</strong> ${getValue("backup")}</p>
  
        <h3>Courses</h3>
        <ul>
          ${coursesHTML}
        </ul>
  
        <p><strong>Quote:</strong> "${getValue("quote")}" — ${getValue(
      "author"
    )}</p>
        <p><strong>Fun Fact:</strong> ${getValue("fun_fact")}</p>
        <p><strong>Something to Share:</strong> ${getValue("share")}</p>
  
        <h3>Links</h3>
        <ul>
          <li><a href="${getValue("github")}" target="_blank">GitHub</a></li>
          <li><a href="${getValue("git_io")}" target="_blank">GitHub.io</a></li>
          <li><a href="${getValue(
            "clt_site"
          )}" target="_blank">Charlotte Site</a></li>
          <li><a href="${getValue("linked")}" target="_blank">LinkedIn</a></li>
          <li><a href="${getValue("fcc")}" target="_blank">FreeCodeCamp</a></li>
        </ul>
  
        <p><a href="#" id="reset-link">Reset and do it again</a></p>
      `;

    document.getElementById("reset-link").addEventListener("click", (e) => {
      e.preventDefault();
      location.reload();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please complete all required fields before submitting.");
      return;
    }

    showIntroductionPage();
  };

  const handleReset = () => {
    setTimeout(() => {
      resetDynamicCourses();
    }, 0);
  };

  formElement.addEventListener("submit", handleSubmit);
  formElement.addEventListener("reset", handleReset);
  addCourseBtn.addEventListener("click", addCourseFields);

  window.resetFormProgress = resetFormProgress;
});
