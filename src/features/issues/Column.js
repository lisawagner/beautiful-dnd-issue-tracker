import { Draggable, Droppable } from '@hello-pangea/dnd'
import Task from "./Task"

const Column = (props) => {
  return (
    <>
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          className="colContainer flex flex-col items-center justify-start"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className="colTitle font-bold"
            {...provided.dragHandleProps}
          >
            {props.column.title}
          </div>
          <Droppable droppableId={props.column.id} type='task'>
            {(provided, snapshot) => (
              <div
                className="taskList"
                ref={provided.innerRef}
                {...provided.droppableProps}
                // isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
    </>
  )
}
export default Column