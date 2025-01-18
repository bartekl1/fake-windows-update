# Fake Windows Update

Fake Windows Update is a prank application that simulates a Windows Update screen. It blocks input and displays a fake update screen that looks like a real Windows Update screen. It is written in Electron and C++.

> [!WARNING]
> This project is still under development

> [!CAUTION]
> This project uses Windows API to block keyboard and mouse input. It may not work on some systems or may cause problems. \
> **Use it at your own risk!**

## TODO

- [ ] Add more update screens (currently only Windows 10 is available)
- [x] Add English support (currently only Polish is available)
- [ ] Improve update screen and make it more realistic (partially done)
- [x] Increment progress
- [x] Exit after some time
- [ ] Improve input blocking
- [ ] Add customization
- [ ] Single executable file
- [ ] Multi monitor support

## Running

1. You need to have [Node.js](https://nodejs.org) and g++ (or any other C++ compiler) installed on your computer.

2. Clone this repository.

```bash
git clone https://github.com/bartekl1/fake-windows-update.git
cd fake-windows-update
```

3. Install dependencies.

```bash
npm install
```

4. Compile `block_input.cpp`.

Example command for g++:

```bash
g++ block_input.cpp -o block_input.exe -static -std=c++23
```

5. Run Electron app.

```bash
npm start
```

## Building

1. You need to have [Node.js](https://nodejs.org) and g++ (or any other C++ compiler) installed on your computer.

2. Clone this repository.

```bash
git clone https://github.com/bartekl1/fake-windows-update.git
cd fake-windows-update
```

3. Install dependencies.

```bash
npm install
```

4. Compile `block_input.cpp`.

Example command for g++:

```bash
g++ block_input.cpp -o block_input.exe -static -std=c++23
```

5. Build Electron app.

```bash
npm run make
```

6. Built app will be in `out/make` directory.

## How to exit

1. Press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Del</kbd>.
2. Click `Cancel` or press <kbd>Esc</kbd>.
3. Press <kbd>Alt</kbd> + <kbd>F4</kbd>.
4. Close `block_input.exe` console window.
