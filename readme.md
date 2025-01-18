# Fake Windows Update

Fake Windows Update is a prank application that simulates a Windows Update screen. It blocks input and displays a fake update screen that looks like a real Windows Update screen. It is written in Electron and C++.

> [!WARNING]
> This project is still under development

> [!CAUTION]
> This project uses Windows API to block keyboard and mouse input. It may not work on some systems or may cause problems. \
> **Use it at your own risk!**

## TODO

- [ ] Add more update screens (currently only Windows 10 is available)
- [ ] Improve update screen and make it more realistic (partially done)
- [ ] Improve input blocking
- [ ] Add customization
- [ ] Single executable file
- [ ] Multi monitor support

## Configuration

The application can be configured by adding a `configs.json` file to the application directory.

### Configuration options

The following configuration options are available. All options are optional.

#### `exit_after` - integer

Time in seconds after which the ‘update’ should be completed and the application should be closed. Using this option will cause increasing progress. By default, the application will never automatically close and progress will be constantly set to 0%.

#### `time_function` - string

Function for calculating progress against time. The following options are available `linear`, `quadratic`, `logarithmic`. This option requires the `exit_after` option. Default is `linear`.

Progress is calculated using the following formulas ($P$ is progress, $t$ is elapsed time and $t_C$ is total time):

##### `linear`

$$ P = \max(\min( 100 \frac{t}{t_C}, 100), 0) $$
From function:
$$ P = 100 \frac{t}{t_C} $$

##### `quadratic`

$$ P = \min(100 \frac{\max(t,0)^2}{{t_C}^2}, 100) $$
From function:
$$ P = 100 \frac{t^2}{{t_C}^2} $$

##### `logarithmic`

$$ P = \min(100 \log_{t_C}(\max(t, 1)), 100) $$
From function:
$$ P = 100 \log_{t_C}t $$

#### `command_after_completed` - string

The command to execute after the ‘update’ has been completed. By default, no command is executed.

#### `disable_blocking` - boolean

If set to `true` keyboard and mouse input is not blocked, the window is not opened fullscreen and on the top. Default is `false`.

#### `open_dev_tools` - boolean

If set to `true` DevTools will be opened automatically on application startup. If `false` DevTools can be opened manually using <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>. Default is `false`.

### Example configuration

```json
{
    "exit_after": 300,                                 // Complete 'update' after 5 minutes.
    "time_function": "logarithmic",                    // Calculate progress using the logarithmic function.
    "command_after_completed": "shutdown -r -t 0",     // Reboot computer after 'update' is completed
    "disable_blocking": false,                         // Block keyboard and mouse input, open application fullscreen and on the top.
    "open_dev_tools": false                            // Do not open DevTools automatically.
}
```

## Running from source code

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
