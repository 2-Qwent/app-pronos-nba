"use client";
import Select from "react-select";
import players from "../data/playersData.js";
import coaches from "@/data/coachData.js";
import { useState, useEffect } from "react";

export default function Trophies({ onUpdate = () => {} }) {
  const allPlayers = players;
  const allCoaches = coaches;

  const [selections, setSelections] = useState({
    MVP: null,
    MIP: null,
    "6MOY": null,
    DPOY: null,
    ROY: null,
    COY: null,
  })

  const handleChange = (key) => (option) =>
    setSelections((prev) => ({ ...prev, [key]: option }));

  useEffect(() => {
    const payload = Object.fromEntries(
      Object.entries(selections).map(([k, v]) => [k, v ? v.value : null])
    );
    onUpdate(payload);
  }, [selections, onUpdate]);

  return (
    <>
      <div className="bg-zinc-800 p-4 rounded-lg w-64 text-white shadow-sm mt-2">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">MVP</h3>
        <div className="w-full">
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="MVP"
            value={selections.MVP}
            onChange={handleChange("MVP")}
            defaultValue={{ value: "", label: "Sélectionnez un joueur" }}
            options={allPlayers.map((player) => ({
              value: player,
              label: player,
            }))}
            isClearable
            menuPortalTarget={typeof window !== "undefined" ? document.body : undefined}
            styles={{
              container: (provided) => ({ ...provided, width: "100%" }),
              control: (provided, state) => ({
                ...provided,
                width: "100%",
                background: "transparent",
                borderColor: state.isFocused ? "#065f46" : "#374151",
                boxShadow: state.isFocused ? "0 0 0 1px rgba(6,95,70,0.12)" : "none",
                minHeight: "40px",
                color: "#fff",
              }),
              singleValue: (provided) => ({ ...provided, color: "#fff" }),
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
              menu: (provided) => ({
                ...provided,
                width: "100%",
                background: "#0f172a",
                color: "#fff",
                borderRadius: 8,
                padding: 4,
                boxShadow: "0 10px 15px -3px rgba(2,6,23,0.4)",
              }),
              menuList: (provided) => ({ ...provided, maxHeight: 200, padding: 0 }),
              option: (provided, state) => ({
                ...provided,
                background: state.isFocused ? "#065f46" : "transparent",
                color: state.isSelected ? "#fff" : "#e5e7eb",
                padding: "8px 12px",
                cursor: "pointer",
              }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "#fff" : "#9ca3af",
              }),
              indicatorSeparator: () => ({ display: "none" }),
            }}
          />
        </div>
      </div>
      <div className="bg-zinc-800 p-4 rounded-lg w-64 text-white shadow-sm mt-8 mb-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">MIP</h3>
        <div className="w-full">
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="MIP"
            value={selections.MIP}
            onChange={handleChange("MIP")}
            defaultValue={{ value: "", label: "Sélectionnez un joueur" }}
            options={allPlayers.map((player) => ({
              value: player,
              label: player,
            }))}
            isClearable
            menuPortalTarget={typeof window !== "undefined" ? document.body : undefined}
            styles={{
              container: (provided) => ({ ...provided, width: "100%" }),
              control: (provided, state) => ({
                ...provided,
                width: "100%",
                background: "transparent",
                borderColor: state.isFocused ? "#065f46" : "#374151",
                boxShadow: state.isFocused ? "0 0 0 1px rgba(6,95,70,0.12)" : "none",
                minHeight: "40px",
                color: "#fff",
              }),
              singleValue: (provided) => ({ ...provided, color: "#fff" }),
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
              menu: (provided) => ({
                ...provided,
                width: "100%",
                background: "#0f172a",
                color: "#fff",
                borderRadius: 8,
                padding: 4,
                boxShadow: "0 10px 15px -3px rgba(2,6,23,0.4)",
              }),
              menuList: (provided) => ({ ...provided, maxHeight: 200, padding: 0 }),
              option: (provided, state) => ({
                ...provided,
                background: state.isFocused ? "#065f46" : "transparent",
                color: state.isSelected ? "#fff" : "#e5e7eb",
                padding: "8px 12px",
                cursor: "pointer",
              }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "#fff" : "#9ca3af",
              }),
              indicatorSeparator: () => ({ display: "none" }),
            }}
          />
        </div>
      </div>
      <div className="bg-zinc-800 p-4 rounded-lg w-64 text-white shadow-sm m-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">6MOY</h3>
        <div className="w-full">
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="6MOY"
            value={selections["6MOY"]}
            onChange={handleChange("6MOY")}
            defaultValue={{ value: "", label: "Sélectionnez un joueur" }}
            options={allPlayers.map((player) => ({
              value: player,
              label: player,
            }))}
            isClearable
            menuPortalTarget={typeof window !== "undefined" ? document.body : undefined}
            styles={{
              container: (provided) => ({ ...provided, width: "100%" }),
              control: (provided, state) => ({
                ...provided,
                width: "100%",
                background: "transparent",
                borderColor: state.isFocused ? "#065f46" : "#374151",
                boxShadow: state.isFocused ? "0 0 0 1px rgba(6,95,70,0.12)" : "none",
                minHeight: "40px",
                color: "#fff",
              }),
              singleValue: (provided) => ({ ...provided, color: "#fff" }),
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
              menu: (provided) => ({
                ...provided,
                width: "100%",
                background: "#0f172a",
                color: "#fff",
                borderRadius: 8,
                padding: 4,
                boxShadow: "0 10px 15px -3px rgba(2,6,23,0.4)",
              }),
              menuList: (provided) => ({ ...provided, maxHeight: 200, padding: 0 }),
              option: (provided, state) => ({
                ...provided,
                background: state.isFocused ? "#065f46" : "transparent",
                color: state.isSelected ? "#fff" : "#e5e7eb",
                padding: "8px 12px",
                cursor: "pointer",
              }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "#fff" : "#9ca3af",
              }),
              indicatorSeparator: () => ({ display: "none" }),
            }}
          />
        </div>
      </div>
      <div className="bg-zinc-800 p-4 rounded-lg w-64 text-white shadow-sm m-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">DPOY</h3>
        <div className="w-full">
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="DPOY"
            value={selections.DPOY}
            onChange={handleChange("DPOY")}
            defaultValue={{ value: "", label: "Sélectionnez un joueur" }}
            options={allPlayers.map((player) => ({
              value: player,
              label: player,
            }))}
            isClearable
            menuPortalTarget={typeof window !== "undefined" ? document.body : undefined}
            styles={{
              container: (provided) => ({ ...provided, width: "100%" }),
              control: (provided, state) => ({
                ...provided,
                width: "100%",
                background: "transparent",
                borderColor: state.isFocused ? "#065f46" : "#374151",
                boxShadow: state.isFocused ? "0 0 0 1px rgba(6,95,70,0.12)" : "none",
                minHeight: "40px",
                color: "#fff",
              }),
              singleValue: (provided) => ({ ...provided, color: "#fff" }),
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
              menu: (provided) => ({
                ...provided,
                width: "100%",
                background: "#0f172a",
                color: "#fff",
                borderRadius: 8,
                padding: 4,
                boxShadow: "0 10px 15px -3px rgba(2,6,23,0.4)",
              }),
              menuList: (provided) => ({ ...provided, maxHeight: 200, padding: 0 }),
              option: (provided, state) => ({
                ...provided,
                background: state.isFocused ? "#065f46" : "transparent",
                color: state.isSelected ? "#fff" : "#e5e7eb",
                padding: "8px 12px",
                cursor: "pointer",
              }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "#fff" : "#9ca3af",
              }),
              indicatorSeparator: () => ({ display: "none" }),
            }}
          />
        </div>
      </div>
      <div className="bg-zinc-800 p-4 rounded-lg w-64 text-white shadow-sm m-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">ROY</h3>
        <div className="w-full">
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="ROY"
            value={selections.ROY}
            onChange={handleChange("ROY")}
            defaultValue={{ value: "", label: "Sélectionnez un joueur" }}
            options={allPlayers.map((player) => ({
              value: player,
              label: player,
            }))}
            isClearable
            menuPortalTarget={typeof window !== "undefined" ? document.body : undefined}
            styles={{
              container: (provided) => ({ ...provided, width: "100%" }),
              control: (provided, state) => ({
                ...provided,
                width: "100%",
                background: "transparent",
                borderColor: state.isFocused ? "#065f46" : "#374151",
                boxShadow: state.isFocused ? "0 0 0 1px rgba(6,95,70,0.12)" : "none",
                minHeight: "40px",
                color: "#fff",
              }),
              singleValue: (provided) => ({ ...provided, color: "#fff" }),
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
              menu: (provided) => ({
                ...provided,
                width: "100%",
                background: "#0f172a",
                color: "#fff",
                borderRadius: 8,
                padding: 4,
                boxShadow: "0 10px 15px -3px rgba(2,6,23,0.4)",
              }),
              menuList: (provided) => ({ ...provided, maxHeight: 200, padding: 0 }),
              option: (provided, state) => ({
                ...provided,
                background: state.isFocused ? "#065f46" : "transparent",
                color: state.isSelected ? "#fff" : "#e5e7eb",
                padding: "8px 12px",
                cursor: "pointer",
              }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "#fff" : "#9ca3af",
              }),
              indicatorSeparator: () => ({ display: "none" }),
            }}
          />
        </div>
      </div>
      <div className="bg-zinc-800 p-4 rounded-lg w-64 text-white shadow-sm m-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">COY</h3>
        <div className="w-full">
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="COY"
            value={selections.COY}
            onChange={handleChange("COY")}
            defaultValue={{ value: "", label: "Sélectionnez un joueur" }}
            options={allCoaches.map((coach) => ({
              value: coach,
              label: coach,
            }))}
            isClearable
            menuPortalTarget={typeof window !== "undefined" ? document.body : undefined}
            styles={{
              container: (provided) => ({ ...provided, width: "100%" }),
              control: (provided, state) => ({
                ...provided,
                width: "100%",
                background: "transparent",
                borderColor: state.isFocused ? "#065f46" : "#374151",
                boxShadow: state.isFocused ? "0 0 0 1px rgba(6,95,70,0.12)" : "none",
                minHeight: "40px",
                color: "#fff",
              }),
              singleValue: (provided) => ({ ...provided, color: "#fff" }),
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
              menu: (provided) => ({
                ...provided,
                width: "100%",
                background: "#0f172a",
                color: "#fff",
                borderRadius: 8,
                padding: 4,
                boxShadow: "0 10px 15px -3px rgba(2,6,23,0.4)",
              }),
              menuList: (provided) => ({ ...provided, maxHeight: 200, padding: 0 }),
              option: (provided, state) => ({
                ...provided,
                background: state.isFocused ? "#065f46" : "transparent",
                color: state.isSelected ? "#fff" : "#e5e7eb",
                padding: "8px 12px",
                cursor: "pointer",
              }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "#fff" : "#9ca3af",
              }),
              indicatorSeparator: () => ({ display: "none" }),
            }}
          />
        </div>
      </div>
    </>
  );
}
