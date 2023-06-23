export interface Draggable {
  dragStartHandler: (e: DragEvent) => void;
  dragEndHandler: (e: DragEvent) => void;
}

export interface DragTarget {
  dragOverHandler: (e: DragEvent) => void;
  dropHandler: (e: DragEvent) => void;
  dragLeaveHandler(event: DragEvent): void;
}
