
import React from "react";
import { useForm } from "react-hook-form";
import { profileSchema } from "../utils/profileSchema.js";
import useStore from "../store/taskStore";
import {
  UserRound,
  Keyboard,
  Database,
  Download,
  Trash2,
  Check,
  Save,
  AlertTriangle,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const avatarOptions = [
  {
    value: "Male",
    label: "Male",
    image:
      "https://api.dicebear.com/10.x/adventurer/svg?seed=TaskifyMale&backgroundColor=b6e3f4",
  },
  {
    value: "Female",
    label: "Female",
    image:
      "https://api.dicebear.com/10.x/adventurer/svg?seed=TaskifyFemale&backgroundColor=ffd5dc",
  },
  {
    value: "Neutral",
    label: "Neutral",
    image:
      "https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=TaskifyNeutral&backgroundColor=c0e8e8",
  },
];

const Setting = () => {
  const profile = useStore((state) => state.profile);
  const updateProfile = useStore((state) => state.updateProfile);
  const tasks = useStore((state) => state.tasks);
  const clearAllTasks = useStore((state) => state.clearAllTasks);
  const showToast = useStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name || "user",
      avatar: profile?.avatar || "Neutral",
    },
  });

  const selectedAvatar = watch("avatar");

  function submitHandler(data) {
    updateProfile(data);
    showToast("profile", "Profile updated successfully");
  }

  function exportTasks() {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "taskify-tasks.json";
    link.click();

    URL.revokeObjectURL(url);
    showToast("exported", "Tasks exported successfully");
  }

  function handleClearAllTasks() {
    if (tasks.length === 0) {
      showToast("info", "No tasks to clear");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all tasks? This action cannot be undone.",
    );

    if (!confirmed) return;

    clearAllTasks();
    showToast("cleared", "All tasks cleared successfully");
  }

  return (
    <main className="ml-0 mt-[88px] min-h-[calc(100vh-88px)] w-full min-w-0 bg-[#E1EBFE] px-3 py-4 pb-24 transition-colors duration-300 dark:bg-[#152A40] sm:px-5 sm:py-5 lg:ml-[260px] lg:mt-14 lg:min-h-[calc(100vh-56px)] lg:w-[calc(100%-260px)] lg:px-7 lg:py-5 lg:pb-5">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5">
          <h1 className="text-[24px] font-bold text-[#111A46] transition-colors duration-300 dark:text-[#F0F8FF] sm:text-[27px]">
            Settings
          </h1>
          <p className="mt-0.5 text-[13px] font-medium text-[#7183A6] transition-colors duration-300 dark:text-[#B0C6D4]">
            Manage your Taskify preferences
          </p>
        </div>

        <div className="space-y-4">
          <section className="overflow-hidden rounded-2xl border border-white bg-white/90 shadow-[0_8px_28px_rgba(30,64,175,0.08)] transition-colors duration-300 dark:border-[#31516A] dark:bg-[#102638] dark:shadow-[0_0_22px_rgba(8,169,157,0.05)]">
            <div className="flex items-center gap-3 border-b border-[#E7EEF9] px-3 py-3 transition-colors duration-300 dark:border-[#31516A] sm:px-5 sm:py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8FBFC] text-[#159FA5] dark:bg-[#173F49] dark:text-[#55E4DB]">
                <UserRound size={19} />
              </div>
              <div className="min-w-0">
                <h2 className="text-[15px] font-bold text-[#111A46] transition-colors duration-300 dark:text-[#F0F8FF] sm:text-[16px]">
                  Profile &amp; Personalization
                </h2>
                <p className="text-[11px] leading-4 font-medium text-[#7183A6] transition-colors duration-300 dark:text-[#B0C6D4]">
                  Update your name and choose an avatar for your profile.
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-5">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="grid items-center gap-5 lg:grid-cols-[125px_1fr_auto]">
                  <div className="flex justify-center lg:justify-start">
                    <div className="relative flex h-[105px] w-[105px] items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#E7F8FA] shadow-[0_5px_18px_rgba(20,160,170,0.14)] dark:border-[#31516A] dark:bg-[#173747]">
                      <img
                        src={
                          avatarOptions.find(
                            (item) => item.value === selectedAvatar,
                          )?.image
                        }
                        alt="Selected avatar"
                        className="h-[105px] w-[105px] object-contain"
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label className="block">
                      <p className="mb-1.5 text-[12px] font-semibold text-[#243B70] transition-colors duration-300 dark:text-[#D0E2EF]">
                        User Name
                      </p>
                      <input
                        {...register("name")}
                        placeholder="Enter your name"
                        className={`h-10 w-full rounded-lg border bg-white px-3 text-[13px] font-medium text-[#172554] outline-none transition-all dark:bg-[#0B1F30] dark:text-[#F0F8FF] dark:placeholder:text-[#7894A8] ${
                          errors.name
                            ? "border-[#EF4444]"
                            : "border-[#DCE6F7] focus:border-[#15BFC5] focus:ring-3 focus:ring-[#15BFC5]/10 dark:border-[#31516A] dark:focus:border-[#55E4DB] dark:focus:ring-[#55E4DB]/10"
                        }`}
                      />
                    </label>

                    {errors.name && (
                      <p className="mt-1 text-[11px] font-medium text-[#EF4444]">
                        {errors.name.message}
                      </p>
                    )}

                    <div className="mt-3">
                      <p className="mb-2 text-[12px] font-semibold text-[#243B70] transition-colors duration-300 dark:text-[#D0E2EF]">
                        Choose Avatar
                      </p>

                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {avatarOptions.map((avatar) => {
                          const isSelected = selectedAvatar === avatar.value;

                          return (
                            <label
                              key={avatar.value}
                              className={`relative w-[76px] shrink-0 cursor-pointer rounded-xl border-2 p-1 transition-all ${
                                isSelected
                                  ? "border-[#18BFC5] bg-[#F0FEFF] shadow-[0_5px_15px_rgba(24,191,197,0.15)] dark:border-[#55E4DB] dark:bg-[#173F49] dark:shadow-[0_0_14px_rgba(85,228,219,0.12)]"
                                  : "border-[#E3EAF4] bg-white hover:border-[#B8CBDD] dark:border-[#31516A] dark:bg-[#0B1F30] dark:hover:border-[#55E4DB]/60"
                              }`}
                            >
                              <input
                                type="radio"
                                value={avatar.value}
                                {...register("avatar")}
                                className="sr-only"
                              />

                              {isSelected && (
                                <span className="absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#159FA5] text-white shadow-md dark:bg-[#08A99D]">
                                  <Check size={12} strokeWidth={3} />
                                </span>
                              )}

                              <div
                                className={`flex h-[55px] items-end justify-center overflow-hidden rounded-lg ${
                                  avatar.value === "Male"
                                    ? "bg-[#EAF4FC]"
                                    : avatar.value === "Female"
                                      ? "bg-[#FFEAF3]"
                                      : "bg-[#E5FAFA]"
                                }`}
                              >
                                <img
                                  src={avatar.image}
                                  alt={avatar.label}
                                  className="h-[55px] w-[55px] object-contain"
                                />
                              </div>

                              <p
                                className={`py-1 text-center text-[10px] font-bold ${
                                  isSelected
                                    ? "text-[#159FA5] dark:text-[#55E4DB]"
                                    : "text-[#52698F] dark:text-[#B0C6D4]"
                                }`}
                              >
                                {avatar.label}
                              </p>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-start lg:translate-y-[68px] lg:justify-end">
                    <button
                      type="submit"
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#119DA4] px-5 text-[12px] font-bold text-white shadow-[0_5px_15px_rgba(17,157,164,0.2)] transition-all hover:bg-[#0D8990] active:scale-[0.98] dark:bg-[#08A99D] dark:hover:bg-[#0D9488] lg:w-auto"
                    >
                      <Save size={15} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-white bg-white/90 shadow-[0_8px_28px_rgba(30,64,175,0.08)] transition-colors duration-300 dark:border-[#31516A] dark:bg-[#102638] dark:shadow-[0_0_22px_rgba(8,169,157,0.05)]">
            <div className="flex items-center gap-3 border-b border-[#E7EEF9] px-3 py-3 transition-colors duration-300 dark:border-[#31516A] sm:px-5 sm:py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0EAFE] text-[#7146E8] dark:bg-[#30294B] dark:text-[#B8A2FF]">
                <Keyboard size={19} />
              </div>
              <div className="min-w-0">
                <h2 className="text-[15px] font-bold text-[#111A46] transition-colors duration-300 dark:text-[#F0F8FF] sm:text-[16px]">
                  Keyboard Shortcuts
                </h2>
                <p className="text-[11px] leading-4 font-medium text-[#7183A6] transition-colors duration-300 dark:text-[#B0C6D4]">
                  Use these shortcuts to work faster.
                </p>
              </div>
            </div>

            <div className="grid gap-4 p-3 sm:p-5 lg:grid-cols-2">
              <div className="rounded-xl border border-[#E0EAF5] bg-[#F9FBFE] p-3 transition-colors duration-300 dark:border-[#31516A] dark:bg-[#0B1F30] sm:p-4">
                <h3 className="mb-2 text-[12px] font-bold text-[#243B70] transition-colors duration-300 dark:text-[#D0E2EF]">
                  Global Navigation
                </h3>
                <div className="space-y-1">
                  {[
                    ["Ctrl + K", "Global Search"],
                    ["N", "New Task"],
                    ["Esc", "Close Modal / Menu"],
                    ["G + D", "Dashboard"],
                    ["G + A", "All Tasks"],
                    ["G + S", "Settings"],
                  ].map(([key, action]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-2 border-b border-[#E8EEF6] py-1.5 last:border-0 dark:border-[#31516A]/70"
                    >
                      <span className="min-w-0 text-[11px] font-medium text-[#52698F] transition-colors duration-300 dark:text-[#B0C6D4]">
                        {action}
                      </span>
                      <kbd className="shrink-0 rounded-md bg-[#DDF7F8] px-2 py-0.5 text-[10px] font-bold text-[#236A70] dark:bg-[#173F49] dark:text-[#55E4DB]">
                        {key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#E0EAF5] bg-[#F9FBFE] p-3 transition-colors duration-300 dark:border-[#31516A] dark:bg-[#0B1F30] sm:p-4">
                <h3 className="mb-2 text-[12px] font-bold text-[#243B70] transition-colors duration-300 dark:text-[#D0E2EF]">
                  Task Context
                </h3>
                <div className="space-y-1">
                  {[
                    ["Enter", "Complete / Active"],
                    ["E", "Edit Task"],
                    ["Delete", "Delete Task"],
                    ["V", "View Details"],
                    ["Ctrl + Enter", "Save Task in Form"],
                  ].map(([key, action]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-2 border-b border-[#E8EEF6] py-1.5 last:border-0 dark:border-[#31516A]/70"
                    >
                      <span className="min-w-0 text-[11px] font-medium text-[#52698F] transition-colors duration-300 dark:text-[#B0C6D4]">
                        {action}
                      </span>
                      <kbd className="shrink-0 rounded-md bg-[#DDF7F8] px-2 py-0.5 text-[10px] font-bold text-[#236A70] dark:bg-[#173F49] dark:text-[#55E4DB]">
                        {key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-white bg-white/90 shadow-[0_8px_28px_rgba(30,64,175,0.08)] transition-colors duration-300 dark:border-[#31516A] dark:bg-[#102638] dark:shadow-[0_0_22px_rgba(8,169,157,0.05)]">
            <div className="flex items-center gap-3 border-b border-[#E7EEF9] px-3 py-3 transition-colors duration-300 dark:border-[#31516A] sm:px-5 sm:py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E7FAF1] text-[#16A66E] dark:bg-[#173F3A] dark:text-[#6EE7B7]">
                <Database size={19} />
              </div>
              <div className="min-w-0">
                <h2 className="text-[15px] font-bold text-[#111A46] transition-colors duration-300 dark:text-[#F0F8FF] sm:text-[16px]">
                  Data Management
                </h2>
                <p className="text-[11px] leading-4 font-medium text-[#7183A6] transition-colors duration-300 dark:text-[#B0C6D4]">
                  Manage your task data.
                </p>
              </div>
            </div>

            <div className="grid gap-4 p-3 sm:p-5 lg:grid-cols-2">
              <div className="rounded-xl border border-[#CDEFE7] bg-[#F2FFFB] p-3 transition-colors duration-300 dark:border-[#24584F] dark:bg-[#102F32] sm:p-4">
                <div className="flex items-start gap-3 p-1 sm:p-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#C9F5EA] text-[#079B78] dark:bg-[#174A43] dark:text-[#55E4DB] sm:h-14 sm:w-14">
                    <Download size={32} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[13px] font-bold text-[#172554] transition-colors duration-300 dark:text-[#F0F8FF]">
                      Export Tasks
                    </h3>
                    <p className="mt-2 text-[11px] leading-4 text-[#7183A6] transition-colors duration-300 dark:text-[#B0C6D4] sm:mt-3.5">
                      Export all your tasks to a file (JSON).
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={exportTasks}
                  className="mt-4 h-10 w-full rounded-lg bg-[#119DA4] text-[12px] font-bold text-white transition-all hover:bg-[#0D8990] dark:bg-[#08A99D] dark:hover:bg-[#0D9488]"
                >
                  Export Tasks
                </button>
              </div>

              <div className="rounded-xl border border-[#FFD4D9] bg-[#FFF5F6] p-3 transition-colors duration-300 dark:border-[#633843] dark:bg-[#34232D] sm:p-4">
                <div className="flex items-start gap-3 p-1 sm:p-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FFE0E3] text-[#EF4444] dark:bg-[#482A38] dark:text-[#FF8585] sm:h-14 sm:w-14">
                    <Trash2 size={32} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[13px] font-bold text-[#172554] transition-colors duration-300 dark:text-[#F0F8FF]">
                      Clear All Tasks
                    </h3>
                    <p className="mt-1 text-[11px] leading-4 text-[#7183A6] transition-colors duration-300 dark:text-[#B0C6D4]">
                      This will delete all tasks only. It will not reset your
                      settings or preferences.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClearAllTasks}
                  className="mt-4 h-10 w-full rounded-lg bg-[#EF4444] text-[12px] font-bold text-white transition-all hover:bg-[#DC2626] dark:bg-[#D9364A] dark:hover:bg-[#BE293B]"
                >
                  Clear All Tasks
                </button>
              </div>
            </div>

            <div className="mx-3 mb-4 flex items-start gap-2 rounded-lg border border-[#E5EBF4] bg-[#F8FAFD] px-3 py-2.5 transition-colors duration-300 dark:border-[#31516A] dark:bg-[#0B1F30] sm:mx-5 sm:mb-5">
              <AlertTriangle
                size={14}
                className="mt-0.5 shrink-0 text-[#7183A6] dark:text-[#55E4DB]"
              />
              <p className="text-[10px] leading-4 text-[#7183A6] transition-colors duration-300 dark:text-[#B0C6D4]">
                Clear All Tasks deletes tasks only. It does not reset unrelated
                settings or preferences.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Setting;
