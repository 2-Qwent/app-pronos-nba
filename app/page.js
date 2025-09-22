"use client";
import Image from "next/image";
import { useState } from "react";
import TeamForm from "@/components/TeamForm";
import Trophies from "@/components/Trophies";
import ValidationModal from "@/components/ValidationModal";

export default function Home() {
  const [rankings, setRankings] = useState({ east: [], west: [] });
  const [selections, setSelections] = useState({
    MVP: null,
    MIP: null,
    "6MOY": null,
    DPOY: null,
    ROY: null,
  });

  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="text-center text-4xl sm:text-4xl font-extrabold leading-tight">
        Réalisez vos pronos pour la saison NBA !
      </header>
      <main>
        {/* Classements */}
        <div className="flex flex-col row-start-2 items-center mb-10">
          <h2 className="text-2xl sm:text-2xl font-semibold text-center mb-1">
            Classement
          </h2>
          <p className="mt-0 text-sm">
            Déplacez les équipes pour les classer !
          </p>
          <TeamForm onUpdate={setRankings} />
        </div>
        {/* Trophées */}
        <div className="flex flex-col row-start-2 items-center">
          <h2 className="text-2xl sm:text-2xl font-semibold text-center mb-1">
            Trophées individuels
          </h2>
          <Trophies onUpdate={setSelections} />
        </div>
        {/* Bouton de validation */}
        <div className="flex flex-col row-start-2 items-center">
          <ValidationModal rankings={rankings} selections={selections} />
        </div>
      </main>
      <footer className="text-center text-sm text-zinc-500">
        <div>
          Réalisé par Quentin Rohart —{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.qibasket.net"
          >
            qibasket.net
          </a>
        </div>
        <div className="mt-1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/2-Qwent"
          >
            GitHub
          </a>
        </div>
        <div className="mt-1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/2-Qwent/app-pronos-nba"
          >
            Code source du projet
          </a>
        </div>
      </footer>
    </div>
  );
}
