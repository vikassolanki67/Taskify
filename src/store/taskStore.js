import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useStore = create(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        deletedTask: null, 
        toast: null,
        profile : {},

        createTask: (data) =>
          set((state) => ({
            tasks: [...state.tasks, data],
          })),

        deleteTask: (id) =>
          set((state) => {
            const deletedTask = state.tasks.find((task) => task.id === id)

            return {
              tasks: state.tasks.filter((task) => task.id !== id),
              deletedTask: deletedTask || null,
            }
          }),

        undoDelete: () =>
          set((state) => {
            if (!state.deletedTask) return state

            const restoredTask = state.deletedTask

            return {
              tasks: [...state.tasks, restoredTask],
              deletedTask: null,
              toast: {
                type: "restored",
                title: restoredTask.title,
              },
            }
          }),
          
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

        showToast: (type, title) =>
          set(() => ({
            toast: {
              type,
              title,
            },
          })),
        
        hideToast: () =>
          set(() => ({
            toast: null,
          })),

        updateProfile: (data) =>
          set(() => ({
            profile: {
              name: data.name,
              avatar: data.avatar,
            },
          })),

      }),
      { name: 'taskStore' }
    ),
    { name: 'taskStore' }
  )
)

export default useStore