"use client";
import { useState, useEffect } from "react";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, TouchSensor } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import teams from "../data/teamsData.js";

function SortableTeam({ id, name, color }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: color || "#f0f0f0",
    color: getTextColor(color),
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 my-2 rounded-md w-72 text-center shadow-sm cursor-grab"
    >
      {name}
    </div>
  );
}

export default function TeamForm({ onUpdate = () => {} }) {
  const [eastTeams, setEastTeams] = useState(
    teams.filter((team) => team.conference === "Eastern")
  );

  const [westTeams, setWestTeams] = useState(
    teams.filter((team) => team.conference === "Western")
  );

  useEffect(() => {
    onUpdate({
      east: eastTeams.map((t) => (t.name ? t.name : t)),
      west: westTeams.map((t) => (t.name ? t.name : t)),
    });
  }, [eastTeams, westTeams, onUpdate]);

  // sensors: pointer pour desktop, touch avec delay pour mobile (long press)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  function handleDragStart() {
    document.body.style.touchAction = "none";
  }
  function handleDragCancel() {
    document.body.style.touchAction = "";
  }

  function handleDragEnd(setTeams) {
    return (event) => {

      document.body.style.touchAction = "";
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      setTeams((teams) => {
        const oldIndex = teams.findIndex((t) => t.id === active.id);
        const newIndex = teams.findIndex((t) => t.id === over.id);
        return arrayMove(teams, oldIndex, newIndex);
      });
    };
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-row gap-6 items-start">
          {/* Conférence Est */}
          <div className="flex-1 min-w-0 bg-zinc-800 p-4 rounded-lg">
            <h3 className="text-xl text-white mb-4">Conférence Est</h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd(setEastTeams)}
              onDragCancel={handleDragCancel}
            >
              <SortableContext
                items={eastTeams.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col items-center">
                  {eastTeams.map((team) => (
                    <SortableTeam
                      key={team.id}
                      id={team.id}
                      name={team.name}
                      color={team.color}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Conférence Ouest */}
          <div className="flex-1 min-w-0 bg-zinc-800 p-4 rounded-lg">
            <h3 className="text-xl text-white mb-4">Conférence Ouest</h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd(setWestTeams)}
              onDragCancel={handleDragCancel}
            >
              <SortableContext
                items={westTeams.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col items-center">
                  {westTeams.map((team) => (
                    <SortableTeam
                      key={team.id}
                      id={team.id}
                      name={team.name}
                      color={team.color}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </>
  );
}