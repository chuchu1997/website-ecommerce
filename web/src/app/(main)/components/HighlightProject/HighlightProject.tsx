/** @format */

import { ProjectInterface } from "@/types/project";
import { HighlightedProjectsMotion } from "./HighlightProjectMotion";
import { ProjectAPI } from "@/api/projects/projects.api";
import { fetchSafe } from "@/utils/fetchSafe";
import { ProductAPI } from "@/api/products/product.api";

interface Props {
  industry: string;
}
const getCachedProjects = async (): Promise<ProjectInterface[]> => {
  const res = await fetchSafe(
    () =>
      ProjectAPI.getProjects({
        currentPage: 1,
        limit: 6,
      }),
    {
      projects: [],
    }
  );
  const projects = res.projects;
  return projects;
};

export const HighlightedProjects = async ({ industry }: Props) => {
  const projects: ProjectInterface[] = await getCachedProjects();

  return (
    <section id="projects" className="">
      <div className="">
        <HighlightedProjectsMotion projects={projects} industry={industry} />
      </div>
    </section>
  );
};
