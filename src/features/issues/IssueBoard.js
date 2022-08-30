import { useState } from 'react'
import initialData from '../../data/initialData'
import Column from "./Column"
import { DragDropContext, Droppable } from '@hello-pangea/dnd'


const IssueBoard = () => {
  const [data, setData] = useState(initialData)

  console.log(data);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    //If there is no destination
    if (!destination) { return }

    //If source and destination is the same
    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    //If you're dragging columns
    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...data,
        columnOrder: newColumnOrder
      }
      setData(newState)
      return;
    }

    //Anything below this happens if you're dragging tasks
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    //If dropped inside the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      }
      setData(newState)
      return;
    }

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col items-center justify-center"
          >
            <h1>Issue Board</h1>
            {data.columnOrder.map((id, index) => {
              const column = data.columns[id]
              const tasks = column.taskIds.map(taskId => data.tasks[taskId])

              return <Column key={column.id} column={column} tasks={tasks} index={index} />
            })} 
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
export default IssueBoard