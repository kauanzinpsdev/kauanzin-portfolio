import type { ComponentType } from "react";
import type { Project, MockupKey } from "../data/projects";
import { cn } from "../utils/cn";
import ScaledMockup from "./ScaledMockup";
import AppMockup from "./mockups/AppMockup";
import LandingMockup from "./mockups/LandingMockup";
import LawFirmMockup from "./mockups/LawFirmMockup";

const MOCKUPS: Record<MockupKey, ComponentType> = {
  law: LawFirmMockup,
  app: AppMockup,
  landing: LandingMockup,
};

type ProjectVisualProps = {
  project: Project;
  className?: string;
};

/** Mostra a screenshot real do projeto (se houver) ou o mockup desenhado em código. */
export default function ProjectVisual({ project, className }: ProjectVisualProps) {
  const label = `Prévia do projeto ${project.title}`;

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={label}
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full object-cover object-top", className)}
      />
    );
  }

  const Mockup = project.mockup ? MOCKUPS[project.mockup] : null;
  return (
    <ScaledMockup label={label} className={className}>
      {Mockup ? <Mockup /> : null}
    </ScaledMockup>
  );
}
