// Next And Previous Btns
const arrowRight = document.getElementById("arrow-right");
const arrowLeft = document.getElementById("arrow-left");

let textContentDiv = document.getElementById("text-content");
let imagesContainer = document.getElementById("image-container");
let imageOfTheMovie = document.getElementById("movie-image");

let progressiveTimeLine = document.getElementById("progressive-line");

let idOfTheMovie = 0;
let moviesListLength = moviesList.length;

// Place All Images In The Container
window.addEventListener("load", () => {
  moviesList.forEach((e) => {
    let img = document.createElement("img");
    img.setAttribute("src", e["main-image"]);
    imagesContainer.append(img);
  });
});

// Place All Texts In The Container
window.addEventListener("load", () => {
  let indexCount = 1;
  moviesList.forEach((e) => {
    // Create The Initial Div (Wrapper)
    let wrapper = document.createElement("div");
    wrapper.className = "text-wrapper";

    // Set The data-index
    wrapper.setAttribute("data-index", indexCount);

    // Create The Logo Div
    let logoDiv = document.createElement("div");
    logoDiv.className = "logo";

    // Create The img
    let img = document.createElement("img");
    img.setAttribute("src", e["logo-image"]);

    // Append The img To The Div
    logoDiv.append(img);

    // Append The Div To The Wrapper
    wrapper.append(logoDiv);

    // Create The Title
    let title = document.createElement("h1");
    title.className = "title";
    title.setAttribute("id", "title");

    // Set The Title Text
    title.textContent = e.title;

    // Append The Title To The Wrapper
    wrapper.append(title);

    // Create The Description
    let description = document.createElement("p");
    description.className = "description";
    description.setAttribute("id", "description");
    description.textContent = e.description;

    // Append The Description To The Wrapper
    wrapper.append(description);

    // Append The Wrapper To The Body
    textContentDiv.appendChild(wrapper);
    indexCount++;
  });
});

// Set The Year Of Movie
window.addEventListener("load", () => {
  setYearOfMovie(idOfTheMovie);
});

// Arrow Right
arrowRight.addEventListener("click", () => {
  if (idOfTheMovie === moviesListLength - 1) {
    return false;
  } else {
    idOfTheMovie++; // Increase The Id By One
  }

  if (idOfTheMovie > 0) {
    arrowRight.classList.add("active");
    arrowLeft.classList.add("active");
  }

  if (idOfTheMovie === moviesListLength - 1) {
    arrowRight.classList.remove("active");
  }

  setProgressiveTimeLine(idOfTheMovie);

  setText(idOfTheMovie);
  setYearOfMovie(idOfTheMovie);
  setImage(idOfTheMovie);
});

// Arrow Left
arrowLeft.addEventListener("click", () => {
  if (idOfTheMovie === 0) {
    return false;
  } else {
    idOfTheMovie--; // Decrease The Id By One
  }

  if (idOfTheMovie < moviesList.length - 1) {
    arrowLeft.classList.add("active");
    arrowRight.classList.add("active");
  }

  if (idOfTheMovie === 0) {
    arrowLeft.classList.remove("active");
    arrowRight.classList.add("active");
  }

  setProgressiveTimeLine(idOfTheMovie);

  setText(idOfTheMovie);
  setYearOfMovie(idOfTheMovie);
  setImage(idOfTheMovie);
});

// Update The TimeLine
function setProgressiveTimeLine(index) {
  // get the index of the last bull
  let lastBullIndex = moviesListLength - 1;

  // lastBullIndex Is The Last Index So :
  // lastBullIndex --> 100% <=> length Of progressiveTimeLine = (index * 100) / lastBullIndex
  let widthOfLine = (index * 100) / lastBullIndex;
  let roundedBull = document.querySelectorAll("span.rounded");

  progressiveTimeLine.style.width = `${widthOfLine}%`;

  // Add The active Class To Round Bulls
  for (let i = 0; i <= index; i++) {
    roundedBull[i].classList.add("active");
  }

  // Remove Active Class From Round Bulls
  //   2 Is The Last Index In The Object
  for (let i = index + 1; i <= 2; i++) {
    roundedBull[i].classList.remove("active");
  }
}

// set the image of the movie
function setImage(index) {
  // Names Of Images Start With 1
  let newIndex = index + 1;

  let currentPic = document.querySelector(
    `img[src="images/image-${newIndex}.png"]`
  );

  currentPic.style.left = "0";

  if (newIndex > 1) {
    let prevPic = document.querySelector(
      `img[src="images/image-${newIndex - 1}.png"]`
    );

    prevPic.style.left = "-100%";
  }

  if (newIndex < 3) {
    let nextPic = document.querySelector(
      `img[src="images/image-${newIndex + 1}.png"]`
    );

    nextPic.style.left = "100%";
  }
}

// set the text for the movie
function setText(index) {
  let newIndex = index + 1;

  let currentText = document.querySelector(
    `.text-wrapper[data-index="${newIndex}"]`
  );

  currentText.style.left = "0";
  currentText.style.opacity = "1";

  if (newIndex > 1) {
    let prevText = document.querySelector(
      `.text-wrapper[data-index="${newIndex - 1}"]`
    );

    prevText.style.left = "-20%";
    prevText.style.opacity = "0";
  }

  if (newIndex < 3) {
    let nextText = document.querySelector(
      `.text-wrapper[data-index="${newIndex + 1}"]`
    );

    nextText.style.left = "20%";
    nextText.style.opacity = "0";
  }
}

// Set The Movie The Will Be Shown In The Website

function setYearOfMovie(index) {
  // Get The List Of All Span (That Contains Year's Numbers)
  let spanYearList = Array.from(document.querySelectorAll(".year-span"));

  // Get The Year Of Current Movie
  let movie = moviesList[index];
  let year = movie["year"] + "";
  year = year.split("");

  // Get The Previous Year
  let prevYear = [];
  for (let i = 0; i < spanYearList.length; i++) {
    prevYear.push(spanYearList[i].textContent);
  }

  // Change Only Numbers Tha Are Different
  for (let i = 0; i < spanYearList.length; i++) {
    if (prevYear[i] !== year[i]) {
      // Add The Active Class
      spanYearList[i].classList.add("active");

      // Add The New Number
      spanYearList[i].textContent = year[i];
    }
  }

  // Remove The Active Class After 5.5s
  setTimeout(() => {
    for (let i = 0; i < spanYearList.length; i++) {
      spanYearList[i].classList.remove("active");
    }
  }, 550);
}
