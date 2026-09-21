import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useStore = create(
  devtools(
    persist(
      (set) => ({
        tasks: [],

        createTask: (data) =>
          set((state) => ({
            tasks: [...state.tasks, data],
          })),

        deleteTask: (id) =>
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
          })),
        
        clearAllTasks: () =>
          set(() => ({
            tasks: [],
          })),
          
        toggleTask: (id) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id
                ? { ...task, status:( task.status === "active" ? "completed" : "active")}
                : task,
            ),
        })),

        updateTask: (id , updatedData) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id
                ? { ...task, ...updatedData }
                : task,
            ),
        })),
        
      }),
      { name: 'taskStore' }
    ),
    { name: 'taskStore' }
  )
)

export default useStore