import { ProjectInterface } from "@/types/project";
import { HighlightedProjectsMotion } from "./HighlightProjectMotion";
import { ProjectAPI } from "@/api/projects/projects.api";





interface Props  {
  industry:string;

}

export const HighlightedProjects = async ({industry}:Props) => {

  let projects:ProjectInterface[] = [];

  const res = await  ProjectAPI.getProjects(
    {
      limit:6,
      currentPage:1
    }
  );


  projects = res.data.projects

  
  return (
    <section id="projects" className="">
      <div className="">
        <HighlightedProjectsMotion projects={projects} industry ={industry} />
      </div>
    </section>
  );
};