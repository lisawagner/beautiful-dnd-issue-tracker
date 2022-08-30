import { Draggable } from '@hello-pangea/dnd'

const Task = (props) => {
  // console.log('New rendering...')

  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className='p-2 border border-solid rounded-md bg-white  active:border-dashed active:border-gray-300'
          aria-roledescription="Press space bar to lift the task, arrows to move, and space bar again to drop it in a new position."
        >
          {props.task.content}
        </div>
      )}
      
    </Draggable>

  )
}
export default Task