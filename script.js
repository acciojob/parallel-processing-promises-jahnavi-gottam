const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" }
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            resolve(img);
        };

        img.onerror = () => {
            reject(`Failed to download image: ${url}`);
        };

        img.src = url;
    });
}

function downloadImages() {
    output.innerHTML = "";
    error.innerHTML = "";
    loading.innerHTML = "Loading...";

    const promises = images.map(image => downloadImage(image.url));

    Promise.all(promises)
        .then(downloadedImages => {
            loading.innerHTML = "";
            
            downloadedImages.forEach(img => {
                output.appendChild(img);
            });
        })
        .catch(err => {
            loading.innerHTML = "";
            error.innerHTML = err;
        });
}

btn.addEventListener("click", downloadImages);