class ProjectState {
  private static instance: ProjectState;
  private projects: any[];
  private listeners: any[];
  private constructor() {
    this.projects = [];
    this.listeners = [];
  }
  addProject(title: string, description: string, people: number) {
    const newProject = {
      id: Math.random().toString(),
      title,
      description,
      people,
    };
    console.log(newProject.id);
    this.projects.push(newProject);
    console.log("after push", this.projects);
    for (const fn of this.listeners) {
      fn([...this.projects]);
    }
  }

  addListeners(listenerFn: Function) {
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
