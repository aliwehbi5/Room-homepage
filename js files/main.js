// Selecting elements from the DOM
const toggleIcons = document.querySelectorAll(".menu-icon, .close-icon");
const mainUl = document.querySelector("header ul");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
const imgs = document.querySelectorAll(".imgs-sliders .img");
const bottom = document.querySelector(".bottom");
const title = document.querySelector(".right-part h1");
const description = document.querySelector("p.description");

// Adding click event listener to toggle icons
toggleIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // Toggling the "shown" class for the mainUl element
    mainUl.classList.toggle("shown");
    // Toggling the "active" class for the body element
    document.body.classList.toggle("active");
  });
});

// Adding click event listener to forward button
forwardBtn.addEventListener("click", () => {
  let nextImg, fetchIndex;
  if (
    !document.querySelector(".in-img") &&
    !document.querySelector(".out-img")
  ) {
    // If no image is currently active, activate the second image
    imgs[1].classList.add("in-img");
    fetchIndex = 1;
    fetchData(fetchIndex);
    return;
  }
  imgs.forEach((img, index) => {
    img.classList.remove("index-1");
    if (img.classList.contains("in-img") || img.classList.contains("out-img")) {
      // Moving the currently active image to the back
      img.classList.remove("in-img");
      img.classList.add("index-1");
      if (index === imgs.length - 1) {
        nextImg = imgs[0];
        fetchIndex = 0;
      } else {
        nextImg = imgs[index + 1];
        fetchIndex = index + 1;
      }
      img.classList.remove("out-img");
      fetchData(fetchIndex);
    }
  });
  nextImg.classList.add("in-img");
});

// Adding click event listener to backward button
backwardBtn.addEventListener("click", () => {
  let previousImg, fetchIndex;
  if (
    !document.querySelector(".in-img") &&
    !document.querySelector(".out-img")
  ) {
    // If no image is currently active, activate the last image
    imgs[imgs.length - 1].classList.add("out-img");
    fetchIndex = imgs.length - 1;
    fetchData(fetchIndex);
    return;
  }
  imgs.forEach((img, index) => {
    img.classList.remove("index-1");
    if (img.classList.contains("out-img") || img.classList.contains("in-img")) {
      // Moving the currently active image to the front
      img.classList.remove("out-img");
      img.classList.add("index-1");
      if (index === 0) {
        previousImg = imgs[imgs.length - 1];
        fetchIndex = imgs.length - 1;
      } else {
        previousImg = imgs[index - 1];
        fetchIndex = index - 1;
      }
      img.classList.remove("in-img");
      fetchData(fetchIndex);
    }
  });
  previousImg.classList.add("out-img");
});

// Function to fetch data based on index
function fetchData(index) {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Adding CSS classes for animation
      bottom.classList.add("go-right");
      title.classList.add("go-up");
      setTimeout(() => {
        // Updating the title and description with fetched data
        title.textContent = data[index].h1Text;
        description.textContent = data[index].description;
      }, 500);
      setTimeout(() => {
        // Removing CSS classes after animation
        bottom.classList.remove("go-right");
        title.classList.remove("go-up");
      }, 1000);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Event listener for scroll (for screens with width <= 768px)
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 768) {
    console.log(window.scrollY);
    const hiddenMenu = document.querySelector(".hidden-menu");
    hiddenMenu.style.opacity = window.scrollY >= 380 ? 1 : 0;
  }
});
