import { Validatable, validate } from "../helpers/validation.js";
import { projectState } from "./ProjectState.js";
import { Component } from "./base-component.js";

type FormTuple = [string, string, number];

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super("project-input", "app", "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;
    // Attach the form to the host element
    this.configure();
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
      min: 1,
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
    // console.log("input data", userInput);
    if (userInput) {
      const [title, desc, people] = userInput;
      // console.log("title", title);
      // console.log("description", desc);
      // console.log("people", people);
      projectState.addProject(title, desc, people);
    }
    this.clearInputs();
  }
  renderContent() {}

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }
}
