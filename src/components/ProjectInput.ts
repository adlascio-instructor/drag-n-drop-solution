export class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    // Get the content of the template
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // Get the form element from the template
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // Add a new id to the form
    this.element.id = "user-input";
    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;
    this.configure();
    // Attach the form to the host element
    this.attach();
  }

  private submitHandler(e: Event) {
    e.preventDefault();
    console.log("title", this.titleInputElement.value);
    console.log("description", this.descriptionInputElement.value);
    console.log("people", this.peopleInputElement.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  attach() {
    this.hostElement.append(this.element);
  }
}
