import { BrowserWindow, app, shell } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
//#region electron/main.js
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
function createWindow() {
	const win = new BrowserWindow({
		width: 1280,
		height: 800,
		minWidth: 960,
		minHeight: 600,
		title: "MediRecord",
		icon: path.join(__dirname, "../public/icon.ico"),
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: false
		}
	});
	win.setMenuBarVisibility(false);
	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
		win.webContents.openDevTools();
	} else win.loadFile(path.join(__dirname, "../dist/index.html"));
	win.webContents.setWindowOpenHandler(({ url }) => {
		shell.openExternal(url);
		return { action: "deny" };
	});
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
//#endregion
