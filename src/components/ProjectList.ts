import { Project, ProjectStatus } from "../models/project.js";
import { ProjectItem } from "./ProjectItem.js";
import { projectState } from "./ProjectState.js";
import { Component } from "./base-component.js";

type ProjectListType = "active" | "finished";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  private assignedProjects: Project[] = [];
  //   private type: ProjectListType;
  constructor(private type: ProjectListType) {
    super("project-list", "app", `${type}-projects`);
    this.type = type;
    this.renderContent();
    this.configure();
    this.attach();
  }
  renderProjects() {
    const ul = document.getElementById(`${this.type}-projects-list`)!;
    ul.innerHTML = "";
    this.assignedProjects.forEach((project) => {
      //   const li = document.createElement("li");
      //   li.textContent = project.title;
      //   ul.append(li);
      new ProjectItem(`${this.type}-projects-list`, project);
    });
  }
  configure() {
    projectState.addListeners((projects: Project[]) => {
      this.assignedProjects = projects.filter((project) => {
        if (this.type === "active") {
          return project.status === ProjectStatus.Active;
        } else if (this.type === "finished") {
          return project.status === ProjectStatus.Finished;
        }
        return;
      });
      this.renderProjects();
    });
  }
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
}
