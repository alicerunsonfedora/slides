const changeCopyright = () => {
    let copy = document.getElementById("copyright");
    copy.innerHTML =
        `&copy; ${new Date().getFullYear()} Marquis Kurt. All rights reserved.`;
}

function changeSlides() {
    fetch("current.json")
        .then(resp => resp.json())
        .then(data => {
            let title = document.getElementById("current-title");
            title.innerHTML = data.current.name
                ? data.current.name
                : "No current presentation.";

            let desc = document.getElementById("current-description");
            desc.innerHTML = data.current.description
                ? data.current.description
                : "No description given.";


            let button = document.getElementById("current-link");
            if (data.current.file !== undefined) {
                button.setAttribute("href", `./presentation/${data.current.file}.html`);
            }
            else {
                button.setAttribute("disabled", true);
                button.innerHTML = "Cannot play presentation";
            }

            let all = document.getElementById("all-presentations");
            if (!data.all.length > 0) {
                all.innerHTML = "No other presentations are available.";
            }
        })
}

window.onload = () => {
    changeCopyright();
    changeSlides();
}