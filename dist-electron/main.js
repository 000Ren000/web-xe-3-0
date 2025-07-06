import { app as n, BrowserWindow as r } from "electron";
import { createRequire as c } from "node:module";
import { fileURLToPath as p } from "node:url";
import e from "node:path";
c(import.meta.url);
const s = e.dirname(p(import.meta.url));
process.env.APP_ROOT = e.join(s, "..");
const i = process.env.VITE_DEV_SERVER_URL, _ = e.join(process.env.APP_ROOT, "dist-electron"), a = e.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? e.join(process.env.APP_ROOT, "public") : a;
let o;
function t() {
  o = new r({
    icon: e.join(process.env.VITE_PUBLIC, "favicon.ico"),
    webPreferences: {
      preload: e.join(s, "preload.mjs")
    },
    width: 400,
    height: 750
  }), o.webContents.on("did-finish-load", () => {
    o == null || o.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? o.loadURL(i) : o.loadFile(e.join(a, "index.html"));
}
n.whenReady().then(() => {
  t(), n.on("activate", () => {
    r.getAllWindows().length === 0 && t();
  });
});
n.on("window-all-closed", () => {
  process.platform !== "darwin" && n.quit();
});
export {
  _ as MAIN_DIST,
  a as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};
