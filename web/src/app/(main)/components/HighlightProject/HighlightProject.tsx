/** @format */

import { ProjectInterface } from "@/types/project";
import { HighlightedProjectsMotion } from "./HighlightProjectMotion";
import { ProjectAPI } from "@/api/projects/projects.api";
import { fetchSafe } from "@/utils/fetchSafe";
import { ProductAPI } from "@/api/products/product.api";

interface Props {
  industry: string;
}

export const HighlightedProjects = async ({ industry }: Props) => {
  let projects: ProjectInterface[] = [];

  const data = await fetchSafe(
    () =>
      ProjectAPI.getProjects({
        limit: 6,
        currentPage: 1,
      }),
    {
      projects: [],
    }
  );

  projects = data.projects;

  return (
    <section id="projects" className="">
      <div className="">
        <HighlightedProjectsMotion projects={projects} industry={industry} />
      </div>
    </section>
  );
};
