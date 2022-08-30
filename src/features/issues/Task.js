import { Draggable } from '@hello-pangea/dnd'

const Task = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className='p-2 border border-solid rounded-md bg-white  active:border-dashed active:border-gray-300'>
              {props.task.content}
            </div>
            
          </div>
        )}
      
    </Draggable>

  )
}
export default Task