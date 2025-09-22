"use client";

import { useState, useRef } from "react";
import teams from "../data/teamsData.js";
import { toPng } from "html-to-image";

export default function ValidationModal({
  rankings = { east: [], west: [] },
  selections = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const captureRef = useRef(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDownload() {
    if (!captureRef.current) return;
    const node = captureRef.current;

    // sauvegarde des styles pour restoration
    const prevMaxHeight = node.style.maxHeight;
    const prevOverflow = node.style.overflow;
    const prevScrollTop = node.scrollTop;

    // éléments à exclure de la capture
    const excludes = Array.from(node.querySelectorAll(".no-export"));
    const prevVisibilities = excludes.map((el) => el.style.visibility || "");

    try {
      setDownloading(true);

      // rendre tout le contenu visible pour la capture
      node.style.maxHeight = "none";
      node.style.overflow = "visible";

      // cacher les éléments marqués "no-export"
      excludes.forEach((el) => {
        el.style.visibility = "hidden";
      });

      // laisser le navigateur appliquer les changements
      await new Promise((r) => requestAnimationFrame(r));

      // adapter pixelRatio si l'image serait trop grande (prévenir erreurs canvas)
      const height = node.getBoundingClientRect().height;
      const pixelRatio = height * 2 > 16000 ? 1 : 2; // ajuste la limite si besoin

      const dataUrl = await toPng(node, {
        pixelRatio,
        backgroundColor: "#1A202C",
        cacheBust: true,
      });

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "mes-pronos-nba.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Erreur lors de la génération d'image :", error);
    } finally {
      // restauration des styles et position de scroll
      node.style.maxHeight = prevMaxHeight;
      node.style.overflow = prevOverflow;
      node.scrollTop = prevScrollTop;

      // restaurer la visibilité des éléments exclus
      excludes.forEach((el, i) => {
        el.style.visibility = prevVisibilities[i] || "";
      });

      setDownloading(false);
    }
  }

  function getTextColor(hex) {
    if (!hex) return "#000";
    const c = hex.replace("#", "");
    if (c.length !== 6) return "#000";
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? "#000" : "#fff";
  }

  function renderTiles(list) {
    return (
      <div className="flex flex-col gap-2">
        {list.map((t, i) => {
          const name = typeof t === "string" ? t : t.name ?? String(t);
          const team = teams.find((x) => x.name === name);
          const bg = team?.color ?? "#111827"; // fallback
          const textColor = getTextColor(bg);
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-1 rounded-lg shadow-sm"
              style={{ background: bg, color: textColor }}
            >
              <div
                className="flex items-center justify-center rounded-full text-sm font-semibold"
                style={{
                  width: 34,
                  height: 34,
                  background: "rgba(255,255,255,0.12)",
                  color: textColor,
                }}
              >
                {i + 1}
              </div>
              <div className="text-lg font-medium">{name}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div>
        <button
          onClick={openModal}
          className="bg-emerald-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-emerald-800"
        >
          Valider mes pronos !
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            ref={captureRef}
            className="bg-zinc-900 text-white rounded p-6 w-full max-w-3xl max-h-[90vh] overflow-auto"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              MES PRONOS POUR 2025-26
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-transparent p-4 rounded">
                <h3 className="font-semibold text-center text-2xl mb-2">
                  Classement — Est
                </h3>
                {renderTiles(rankings.east)}
              </div>

              <div className="bg-transparent p-4 rounded">
                <h3 className="font-semibold text-center text-2xl mb-2">
                  Classement — Ouest
                </h3>
                {renderTiles(rankings.west)}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Trophées</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(selections).map(([k, v]) => (
                  <div key={k} className="bg-zinc-800 p-2 rounded">
                    <div className="text-sm text-white font-bold">{k}</div>
                    <div className="text-lg">{v ?? "—"}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="px-4 py-2 cursor-pointer bg-emerald-600 rounded hover:bg-emerald-800 disabled:opacity-60 no-export"
              >
                {downloading ? "Génération..." : "Télécharger image"}
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-zinc-600 rounded cursor-pointer hover:bg-zinc-800 no-export"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
