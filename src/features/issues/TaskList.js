import { memo } from "react"
import Task from "./Task"

const TaskList = (props) => {
  return (
    <>
    {props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ))}
    </>
  )
}
export default memo(TaskList)