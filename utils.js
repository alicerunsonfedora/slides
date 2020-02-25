const changeCopyright = () => {
    let copy = document.getElementById("copyright");
    copy.innerHTML =
        `&copy; ${new Date().getFullYear()} Marquis Kurt. All rights reserved.`;
}

window.onload = () => {
    changeCopyright();
}