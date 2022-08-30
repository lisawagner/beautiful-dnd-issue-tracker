import { Draggable, Droppable } from '@hello-pangea/dnd'
import TaskList from './TaskList'

const Column = (props) => {

  return (
    <>
      <Draggable draggableId={props.column.id} index={props.index}>
        {(provided) => (
          <div
            className="card colContainer flex flex-col gap-2 items-center justify-start"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              className="colTitle font-bold"
              {...provided.dragHandleProps}
            >
              {props.column.title}
            </div>
            <div className='w-full h-full hover:bg-blue-50 p-0'>
            <Droppable droppableId={props.column.id} type='task'>
              {(provided) => (
                <div
                  className={`flex flex-col gap-2`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <TaskList tasks={props.tasks} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    </>
  )
}
export default Column