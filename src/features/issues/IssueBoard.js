import { useState } from 'react'
import initialData from '../../data/initialData'
import Column from "./Column"
import { DragDropContext, Droppable } from '@hello-pangea/dnd'


const IssueBoard = () => {
  const [data, setData] = useState(initialData)

  console.log(data)

  const onDragStart = (start, provided) => {
    provided.announce(`You have lifted the task in position ${start.source.index + 1}`,)
  }

  const onDragUpdate = (update, provided) => {
    const message = update.description
      ? `You moved the task to ${update.destination.index + 1}`
      : `Press space bar to release task item`
    provided.announce(message)
  }

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result
    //If no destination, don't change anything
    if (!destination) { return }

    //If source & destination same, don't change anything
    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    //If moving columns, set newState for the column order
    if (type === 'column') {
      const currentColumnOrder = Array.from(data.columnOrder)
      currentColumnOrder.splice(source.index, 1)
      currentColumnOrder.splice(destination.index, 0, draggableId)
      const newState = {
        ...data,
        columnOrder: currentColumnOrder
      }
      setData(newState)
      return
    }

    // Dragging tasks
    const start = data.columns[source.droppableId]
    const finish = data.columns[destination.droppableId]

    //If task dropped in same column
    if (start === finish) {
      const newTaskOrder = Array.from(start.taskIds)
      newTaskOrder.splice(source.index, 1)
      newTaskOrder.splice(destination.index, 0, draggableId)
      const setTaskOrder = {
        ...start,
        taskIds: newTaskOrder
      }
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [setTaskOrder.id]: setTaskOrder
        }
      }
      setData(newState)
      return
    }
    //If task dropped in different column
    const initialTaskOrder = Array.from(start.taskIds)
    initialTaskOrder.splice(source.index, 1)
    const setNewTaskOrder = {
      ...start,
      taskIds: initialTaskOrder
    }

    const finalTaskOrder = Array.from(finish.taskIds)
    finalTaskOrder.splice(destination.index, 0, draggableId)
    const setFinalTaskOrder = {
      ...finish,
      taskIds: finalTaskOrder
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [setNewTaskOrder.id]: setNewTaskOrder,
        [setFinalTaskOrder.id]: setFinalTaskOrder
      }
    }

    setData(newState)

  }
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId='all-columns'
        direction='horizontal'
        type='column'
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col items-center justify-center gap-3"
          >
            <h1 className='font-bold text-3xl mb-4'>Issue Board</h1>
            <div 
              className='grid grid-cols-1 gap-4 w-full md:w-1/2 lg:w-full lg:grid-cols-4'
            >
              {data.columnOrder.map((id, index) => {
                const column = data.columns[id]
                const tasks = column.taskIds.map(taskId => data.tasks[taskId])

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                )
              })}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
export default IssueBoard