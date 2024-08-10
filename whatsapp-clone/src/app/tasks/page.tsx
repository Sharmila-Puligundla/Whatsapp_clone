"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { deleteTask } from "../../../convex/tasks";

const TasksPage = () => {
    const tasks = useQuery(api.tasks.getTasks);
    const deleteTask = useMutation(api.tasks.deleteTask);
    return (
        <div className='p-10 flex-col gap-4'>
            <h1 className='text-5xl'>All tasks are here in real-time</h1>
            {tasks?.map((task) => (
                <div key={task._id} className='flex gap-2'>
                    {/* Adjust this line if task.text is an object */}
                    <span>{typeof task.text === 'object' ? task.text.text : task.text}</span>
                    
                    <button 
                    onClick = {async () =>  {
                        await deleteTask({ id : task._id});
                    }}
                    >
                        Delete Task
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TasksPage;
