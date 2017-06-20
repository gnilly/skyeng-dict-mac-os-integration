'use strict';
const electron = require('electron');
const yargs = require('yargs')

const app = electron.app;

// Adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// Prevent window being garbage collected
let mainWindow;

function onClosed() {
	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {

	let pt = electron.screen.getCursorScreenPoint();

	const win = new electron.BrowserWindow({
		width: 400,
		height: 300,
		x: pt.x,
		y: pt.y,
		useContentSize: true,
		vibrancy: 'light'
	});

	let word = yargs(process.argv).argv['word']
	win.loadURL(`file://${__dirname}/index.html?word=${word}`);
	win.on('closed', onClosed);

	electron.globalShortcut.register('Escape', function(){
		app.quit();
	});

	return win;
}




app.on('window-all-closed', () => {
//	if (process.platform !== 'darwin') {
		app.quit();
//	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
