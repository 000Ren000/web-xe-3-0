import { app as n, BrowserWindow as s } from "electron";
import { createRequire as c } from "node:module";
import { fileURLToPath as p } from "node:url";
import o from "node:path";
c(import.meta.url);
const r = o.dirname(p(import.meta.url));
process.env.APP_ROOT = o.join(r, "..");
const i = process.env.VITE_DEV_SERVER_URL, _ = o.join(process.env.APP_ROOT, "dist-electron"), a = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? o.join(process.env.APP_ROOT, "public") : a;
let e;
function t() {
  e = new s({
    icon: o.join(process.env.VITE_PUBLIC, "favicon.ico"),
    webPreferences: {
      preload: o.join(r, "preload.mjs")
    },
    width: 400,
    height: 750
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), e.webContents.openDevTools(), i ? e.loadURL(i) : e.loadFile(o.join(a, "index.html"));
}
n.whenReady().then(() => {
  t(), n.on("activate", () => {
    s.getAllWindows().length === 0 && t();
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
