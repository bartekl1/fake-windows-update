const { app, BrowserWindow } = require("electron");
const child_process = require("child_process");
const path = require("path");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        fullscreen: true,
        alwaysOnTop: true,
        frame: false,
        skipTaskbar: true,
        transparent: true,
        webPreferences: {
            contextIsolation: false,
        },
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.setAlwaysOnTop(true, "screen-saver");

    mainWindow.loadFile("win10.html");

    mainWindow.on("blur", () => {
        mainWindow.focus();
    });

    setInterval(() => {
        mainWindow.setAlwaysOnTop(true, "screen-saver");
    }, 1000);

    // mainWindow.webContents.openDevTools()
};

app.whenReady().then(() => {
    createWindow();

    const block_input_exe_path = path.join(app.getAppPath(), "block_input.exe");
    child_process.spawn(block_input_exe_path, {
        detached: true,
        stdio: "ignore",
    });
});
