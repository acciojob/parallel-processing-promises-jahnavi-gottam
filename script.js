const button = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const output = document.getElementById("output");

const imageUrls = [
  "https://picsum.photos/200/200?random=1",
  "https://picsum.photos/200/200?random=2",
  "https://picsum.photos/200/200?random=3",
  "https://picsum.photos/200/200?random=4"
];

// Function to download one image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      resolve(img);
    };

    img.onerror = function () {
      reject(new Error(`Failed to download image: ${url}`));
    };

    img.src = url;
  });
}

// Function to download all images
function downloadImages() {
  // Clear previous content
  output.innerHTML = "";
  error.innerHTML = "";

  // Show loading
  loading.innerHTML = "Loading...";

  // Download all images in parallel
  Promise.all(imageUrls.map(downloadImage))
    .then(function (images) {
      // Hide loading
      loading.innerHTML = "";

      // Display all images
      images.forEach(function (image) {
        output.appendChild(image);
      });
    })
    .catch(function (err) {
      // Hide loading
      loading.innerHTML = "";

      // Display error
      error.innerHTML = err.message;
    });
}

// Button click
button.addEventListener("click", downloadImages);