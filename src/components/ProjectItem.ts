import { Project } from "../models/project.js";
import { Component } from "./base-component.js";
import { Draggable } from "../helpers/drag-drop.js";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  project: Project;
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  dragStartHandler(event: DragEvent): void {
    console.log("drag start");
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }
  dragEndHandler(_: DragEvent): void {
    console.log("drag end");
  }

  get members(): string {
    let result = "";
    // if (this.project.people === 1) {
    //   return "1 member assigned";
    // } else {
    //   return `${this.project.people} members assigned`;
    // }
    switch (this.project.people) {
      case 1:
        result = "1 member assigned";
        break;
      default:
        result = `${this.project.people} members assigned`;
        break;
    }
    return result;
  }
  configure(): void {
    this.element.addEventListener(
      "dragstart",
      this.dragStartHandler.bind(this)
    );
    this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
  }
  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.members;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
