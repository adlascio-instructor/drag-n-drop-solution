import { Project } from "../models/project.js";
import { Component } from "./base-component.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  project: Project;
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, project.id);
    this.project = project;
    this.renderContent();
  }
  configure(): void {}
  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent =
      this.project.people.toString();
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
