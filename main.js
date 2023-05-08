const path = require('path')
const { app, BrowserWindow, Menu } = require('electron');

const isDev = process.env.NODE_ENV !== 'development';
const isMac = process.platform === 'darwin';


function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Image Resizer',
        width:  1000,
        height: 600,
        // resizable: isDev,
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

function createAboutWindow() {
    aboutWindow = new BrowserWindow({
        width: 300,
        height: 300,
        title: 'About Electron',
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    });

    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}

app.whenReady().then(() => {
    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu)
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})
const menu = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              {
                label: 'About',
                click: createAboutWindow,
              },
            ],
          },
        ]
      : []),
    {
      role: 'fileMenu',
    },
    ...(!isMac
      ? [
          {
            label: 'Help',
            submenu: [
              {
                label: 'About',
                click: createAboutWindow,
              },
            ],
          },
        ]
      : []),
    // {
    //   label: 'File',
    //   submenu: [
    //     {
    //       label: 'Quit',
    //       click: () => app.quit(),
    //       accelerator: 'CmdOrCtrl+W',
    //     },
    //   ],
    // },
    ...(isDev
      ? [
          {
            label: 'Developer',
            submenu: [
              { role: 'reload' },
              { role: 'forcereload' },
              { type: 'separator' },
              { role: 'toggledevtools' },
            ],
          },
        ]
      : []),
  ];

// const menu = [
//     ...(isMac
//         ? [
//             {
//                 label: app.name,
//                 submenu: [
//                     {
//                         label: 'About',
//                         click: createAboutWindow,
//                     },
//                 ],
//             },
//         ]
//         : []),
//     {
//         role: 'fileMenu',
//     },
//     ...(isMac ? [{
//         label: 'Help',
//         submenu: [{
//             label: 'About',
//             click: createAboutWindow
//         }]
//     }] : [])
// ];

// ...(isMac
//     ? [
//         {
//             label: app.name,
//             submenu: [
//                 {
//                     label: 'About',
//                     click: createAboutWindow,
//                 },
//             ],
//         },
//     ]
//     : []),
// {
//     role: 'fileMenu',
// },
// ...(!isMac
//     ? [
//         {
//             label: app.name,
//             submenu: [
//                 {
//                     label: 'About',
//                 },
//             ],
//         },
//     ]
//     : []),
// {
//     role: 'fileMenu'
// },
// ...(!isMac ? [{
//     label: 'Help',
//     submenu: [{
//         label: 'About'
//     }]
// }] : [])

// ...(isDev
//   ? [
//       {
//         label: 'Developer',
//         submenu: [
//           { role: 'reload' },
//           { role: 'forcereload' },
//           { type: 'separator' },
//           { role: 'toggledevtools' },
//         ],
//       },
//     ]
//   : []),
app.on('windwos-all-closed', () => {

    if (!isMac) {
        app.quit()
    }
})