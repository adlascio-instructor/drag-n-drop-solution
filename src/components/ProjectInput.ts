import { Validatable, validate } from "../helpers/validation.js";

type FormTuple = [string, string, number];

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

  private gatherUserInput(): FormTuple | void {
    const titleValue = this.titleInputElement.value;
    const descValue = this.descriptionInputElement.value;
    const peopleValue = +this.peopleInputElement.value;
    // console.log(peopleValue);
    const titleValidatable: Validatable = {
      value: titleValue,
      required: true,
      minLength: 3,
    };
    const descriptionValidatable: Validatable = {
      value: descValue,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: peopleValue,
      required: true,
      min: 2,
    };
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("invalid data");
      return;
    }
    return [titleValue, descValue, peopleValue];
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    console.log("input data", userInput);
    if (userInput) {
      const [title, desc, people] = userInput;
      console.log("title", title);
      console.log("description", desc);
      console.log("people", people);
    }
    this.clearInputs();
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  attach() {
    this.hostElement.append(this.element);
  }
}
