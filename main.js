const { app, BrowserWindow, ipcMain } = require("electron");
const child_process = require("child_process");
const path = require("path");
const fse = require("fs-extra");

const configsPath = path.join(app.isPackaged ? path.dirname(app.getPath("exe")) : app.getAppPath(), "configs.json")
var configs;
if (fse.existsSync(configsPath)) {
    configs = fse.readJsonSync(configsPath);
} else {
    configs = {};
}
const disable_blocking = configs.disable_blocking || false;
const open_dev_tools = configs.open_dev_tools || false;

function isElevated() {
    try {
        child_process.execFileSync("net", ["session"], {"stdio": "ignore"});
        return true;
    } catch ( e ) {
        return false;
    }
}

function restartAsAdmin() {
    const exe_path = process.argv0;
    const args = process.argv.slice(1);
    const command = "powershell.exe -Command \"Start-Process -Verb RunAs -FilePath \\\"" + exe_path + "\\\"" + ((args.length > 0) ? (" -ArgumentList " + args.map(arg => '\\"' + arg + '\\"').join(", ")) : "") + "\"";
    try { child_process.execSync(command); } catch ( e ) {}
    app.quit();
    process.exit();
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        fullscreen: !disable_blocking,
        alwaysOnTop: !disable_blocking,
        frame: disable_blocking,
        skipTaskbar: !disable_blocking,
        transparent: !disable_blocking,
        webPreferences: {
            // contextIsolation: false,
            preload: path.join(app.getAppPath(), "preload.js"),
        },
        width: 1000,
        height: 800,
    });

    mainWindow.setMenuBarVisibility(false);
    if (!disable_blocking) mainWindow.setAlwaysOnTop(true, "screen-saver");

    mainWindow.loadFile("windows10/index.html");

    if (!disable_blocking) {
        mainWindow.on("blur", () => {
            mainWindow.focus();
        });

        setInterval(() => {
            mainWindow.setAlwaysOnTop(true, "screen-saver");
        }, 1000);
    }

    if (open_dev_tools) mainWindow.webContents.openDevTools();

    mainWindow.webContents.send("configs", configs);
};

var block_input_process;

if (!disable_blocking && !isElevated()) {
    restartAsAdmin();
}

app.whenReady().then(() => {
    ipcMain.on("exit", (_event) => {
        if (!disable_blocking) block_input_process.kill();
        app.quit();
    });
    createWindow();

    if (!disable_blocking) {
        const block_input_exe_path = path.join(app.getAppPath(), "block_input.exe");
        block_input_process = child_process.spawn(block_input_exe_path, {
            detached: true,
            stdio: "ignore",
        });
    }
});
