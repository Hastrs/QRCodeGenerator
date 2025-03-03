let isQrGenerated = false; // Variable to check if the QR Code has been generated

document.getElementById("generateBtn").addEventListener("click", function () {
    let inputField = document.getElementById("qrInput");
    let qrImage = document.getElementById("qrImage");
    let errorMessage = document.querySelector(".error-message");

    if (inputField.value.trim() === "") {
        errorMessage.style.display = "block";
        inputField.classList.add("shake");
        setTimeout(() => inputField.classList.remove("shake"), 300);
        return;
    }

    errorMessage.style.display = "none";
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(inputField.value)}`;
    qrImage.style.display = "block";
    isQrGenerated = true; // ✅ QR Code generated
});

document.getElementById("copyLinkBtn").addEventListener("click", function () {
    let inputField = document.getElementById("qrInput");

    if (inputField.value.trim() !== "") {
        navigator.clipboard.writeText(inputField.value)
            .then(() => alert("Link copied successfully!"))
            .catch(() => alert("An error occurred while copying!"));
    } else {
        alert("Please enter a link first!");
    }
});

document.getElementById("downloadBtn").addEventListener("click", function (event) {
    let qrImage = document.getElementById("qrImage");
    let errorMessage = document.getElementById("error-message");

    // ✅ Ensure the QR Code is generated before downloading
    if (!isQrGenerated || !qrImage.src || qrImage.style.display === "none" || qrImage.src.trim() === "" || qrImage.src.includes("data:,")) {
        errorMessage.style.display = "block"; // Show error message
        this.classList.add("shake"); // Add shake effect
        setTimeout(() => this.classList.remove("shake"), 500); // Remove shake effect after half a second
        event.preventDefault();
    } else {
        errorMessage.style.display = "none"; // Hide error when an image exists

        // ✅ Download image only if the QR Code is generated
        let link = document.createElement("a");
        link.href = qrImage.src;
        link.download = "QRCode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});
