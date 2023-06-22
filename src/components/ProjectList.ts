import { Project } from "../models/project.js";
import { projectState } from "./ProjectState.js";

type ProjectListType = "active" | "finished";

export class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  private assignedProjects: Project[] = [];
  //   private type: ProjectListType;
  constructor(private type: ProjectListType) {
    this.type = type;
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    // Get the content of the template
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // Get the form element from the template
    this.element = importedNode.firstElementChild as HTMLElement;
    // Add a new id to the form
    this.element.id = `${this.type}-projects`;
    this.renderContent();
    projectState.addListeners((projects: Project[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });
    this.attach();
  }
  renderProjects() {
    this.assignedProjects.forEach((project) => {
      const li = document.createElement("li");
      li.textContent = project.title;
      const ul = document.getElementById(`${this.type}-projects-list`)!;
      ul.append(li);
    });
  }
  private attach() {
    this.hostElement.append(this.element);
  }
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
}
