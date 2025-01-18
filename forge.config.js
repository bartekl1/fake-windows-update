module.exports = {
    packagerConfig: {
        icon: "img/WindowsUpdate",
        ignore: ["configs.json"],
    },
    rebuildConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-zip",
            platforms: ["win32"],
        },
    ],
    plugins: [],
};
