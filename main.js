const { app, BrowserWindow } = require('electron'); 

const path = require('path'); 

  

function createWindow() { // Create the browser window. 

  const mainWindow = new BrowserWindow({ 

    width: 800, 

    height: 600, 

    webPreferences: { 

      // Points to your script.js inside the src folder if you use it as a preload script 

      // preload: path.join(__dirname, 'src', 'script.js'),  

      nodeIntegration: false, // Security best practice 

      contextIsolation: true,  // Security best practice 

    }, 

  }); 

  

  // Load the main HTML file of your app from the src directory 

  // (Assuming you have an index.html in src that links to script.js) 

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html')); 

  

  // Open DevTools if you want to debug during development 

  // mainWindow.webContents.openDevTools(); 

} 

  

// This method will be called when Electron has finished initialization 

app.whenReady().then(() => { 

  createWindow(); 

  

  app.on('activate', () => { 

    // On macOS it's common to re-create a window in the app when the 

    // dock icon is clicked and there are no other windows open. 

    if (BrowserWindow.getAllWindows().length === 0) createWindow(); 

  }); 

}); 

  

// Quit when all windows are closed, except on macOS. 

app.on('window-all-closed', () => { 

  if (process.platform !== 'darwin') { 

    app.quit(); 

  } 

});