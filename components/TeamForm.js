"use client";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import teams from "../data/teamsData.js";

function SortableTeam({ id, name, color, canDrag = true }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  function getTextColor(hex) { /* ...existing code... */ }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: color || "#f0f0f0",
    color: getTextColor(color),
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

  function handleDragEnd(setTeams) {
    return (event) => {
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
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd(setEastTeams)}
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
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd(setWestTeams)}
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