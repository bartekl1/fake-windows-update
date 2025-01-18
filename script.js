const text = {
    en: [
        "Working on updates",
        "$$PROGRESS$$% complete",
        "Don't turn off your computer"
    ],
    pl: [
        "Przygotowywanie aktualizacji",
        "Ukończono $$PROGRESS$$%",
        "Nie wyłączaj komputera"
    ]
}

const language = navigator.language.split('-')[0];
const texts = text[language] || text.en;
document.querySelector("#text1").innerHTML = texts[0];
document.querySelector("#text2").innerHTML = texts[1].replace("$$PROGRESS$$", "<span id='progress'>0</span>");
document.querySelector("#text3").innerHTML = texts[2];

function updateProgress() {
    const targetTimestamp = parseInt(document.querySelector("#progress").getAttribute("target-timestamp"));
    const startTimestamp = parseInt(document.querySelector("#progress").getAttribute("start-timestamp"));
    const timeFunction = document.querySelector("#progress").getAttribute("time-function");
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const time = currentTimestamp - startTimestamp;
    const totalTime = targetTimestamp - startTimestamp;
    var progress;
    if (timeFunction == "linear") {
        progress = Math.floor(Math.max(Math.min(((time / totalTime) * 100), 100), 0));
    } else if (timeFunction == "quadratic") {
        progress = Math.floor(Math.min((Math.max(time, 0) / totalTime) ** 2 * 100, 100));
    } else if (timeFunction == "logarithmic") {
        progress = Math.floor(Math.min((Math.log(Math.max(time, 1)) / Math.log(totalTime)) * 100, 100));
    }
    document.querySelector("#progress").innerHTML = progress;
    if (currentTimestamp >= targetTimestamp) window.electronAPI.exit();
}

window.electronAPI.onConfigs((value) => {
    const configs = value;
    if (configs.exit_after) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const targetTimestamp = currentTimestamp + configs.exit_after;
        document.querySelector("#progress").setAttribute("target-timestamp", targetTimestamp);
        document.querySelector("#progress").setAttribute("start-timestamp", currentTimestamp);
        if (configs.time_function && ["linear", "quadratic", "logarithmic"].includes(configs.time_function)) {
            document.querySelector("#progress").setAttribute("time-function", configs.time_function);
        } else {
            document.querySelector("#progress").setAttribute("time-function", "linear");
        }
        setInterval(updateProgress, 50);
    }
});
