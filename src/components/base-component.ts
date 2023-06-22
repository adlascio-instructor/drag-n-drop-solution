export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(
    templateId: string,
    hostElementId: string,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    // Get the content of the template
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // Get the form element from the template
    this.element = importedNode.firstElementChild as U;
    // Add a new id to the form
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach();
  }

  abstract configure(): void;
  abstract renderContent(): void;

  protected attach() {
    this.hostElement.append(this.element);
  }
}
