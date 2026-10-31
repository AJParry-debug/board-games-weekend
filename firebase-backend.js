// Connects the app to your Firebase database. You shouldn't need to edit this file.
const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
const CODES = {
  "permission-denied": "invalid_argument", "invalid-argument": "invalid_argument", "not-found": "invalid_argument",
  "failed-precondition": "invalid_argument", "resource-exhausted": "resource_exhausted",
  "unavailable": "unavailable", "deadline-exceeded": "unavailable", "aborted": "unavailable"
};
const mapErr = e => ({ code: CODES[e && e.code] || "unknown", message: (e && e.message) || "" });
const wrap = p => p.catch(e => { throw mapErr(e); });

(async () => {
  const cfg = (window.BGW_CONFIG || {}).firebase || {};
  if (!cfg.projectId || !cfg.apiKey || /PASTE/i.test(cfg.apiKey + cfg.projectId)) { window.__bgwResolve({ error: "config" }); return; }
  try {
    const { initializeApp } = await import(SDK + "firebase-app.js");
    const { getFirestore, doc, collection, setDoc, updateDoc, deleteDoc, onSnapshot } = await import(SDK + "firebase-firestore.js");
    const fs = getFirestore(initializeApp(cfg));
    const docRef = path => {
      const r = doc(fs, path);
      return {
        id: r.id, path,
        set: data => wrap(setDoc(r, data)),
        update: data => wrap(updateDoc(r, data)),
        delete: () => wrap(deleteDoc(r)),
        onSnapshot: (next, err) => onSnapshot(r,
          s => next({ id: s.id, exists: s.exists(), data: () => s.data(), metadata: s.metadata }),
          e => err && err(mapErr(e)))
      };
    };
    const colRef = path => ({
      path,
      doc: id => docRef(path + "/" + id),
      onSnapshot: (next, err) => onSnapshot(collection(fs, path),
        s => next({ docs: s.docs.map(d => ({ id: d.id, exists: true, data: () => d.data(), metadata: d.metadata })), size: s.size, empty: s.empty, metadata: s.metadata }),
        e => err && err(mapErr(e)))
    });
    window.__bgwResolve({ db: { doc: docRef, collection: colRef } });
  } catch (e) {
    console.error(e);
    window.__bgwResolve({ error: "init" });
  }
})();
