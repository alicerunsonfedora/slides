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
            } else {
                let realInnerHTML = "";
                for (const {name, description, file} of data.all) {
                    realInnerHTML += `
                        <div class="presentation-card">
                            <div class="presentation-img">
                                <div class="presentation-icon-bay">
                                    <i class="presentation-icon" data-feather="monitor"></i>
                                </div>
                            </div>
                            <p class="card-title">${name}</p>
                            <p class="card-description">${description}</p>
                            <p>
                                <a class="btn small" href="./presentation/${file}.html">Watch Now</a>
                            </p>
                        </div>
                    `;
                }
                all.innerHTML = "<div class=\"presentation-cards\">" + realInnerHTML + "</div>";
                if (feather) {
                    feather.replace({ width: '64px', height: '64px' });
                 }
            }
        })
}

function runWebkitModifs() {
    let header = document.getElementsByClassName("current-container");
    if (header.length < 1) { return; }
    header = header[0];
    if (navigator.userAgent.match(/Safari/)) {
        header.setAttribute("style", "height:100vh;");
    }
}

window.onload = () => {
    changeCopyright();
    changeSlides();
    runWebkitModifs();
}