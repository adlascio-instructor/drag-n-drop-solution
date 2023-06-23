import { Project, ProjectStatus } from "../models/project.js";

type Listener = (projects: Project[]) => void;

class ProjectState {
  private static instance: ProjectState;
  private projects: Project[];
  private listeners: Listener[];
  private constructor() {
    this.projects = [];
    this.listeners = [];
  }
  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    // console.log(newProject.id);
    this.projects.push(newProject);
    // console.log("after push", this.projects);
    // console.log("listeners", this.listeners);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const foundProject = this.projects.find(
      (project) => projectId === project.id
    );
    if (foundProject && foundProject.status !== newStatus) {
      foundProject.status = newStatus;
    }
    this.updateListeners();
  }

  updateListeners() {
    for (const fn of this.listeners) {
      fn([...this.projects]);
    }
  }

  addListeners(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }
}

export const projectState = ProjectState.getInstance();
