import React, { useEffect, useRef, useState } from "react";
import {
  CircleDot,
  Flag,
  Tag,
  CalendarDays,
  ArrowUpDown,
  ChevronDown,
  Check,
} from "lucide-react";

const FilterDropdown = ({
  name,
  label,
  value,
  options,
  icon,
  iconColor,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={dropdownRef} className="relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-[62px] w-full items-center gap-2 rounded-xl border bg-[radial-gradient(circle,rgba(238,174,202,1)_0%,rgba(148,187,233,1)_100%)] px-3 text-left shadow-[0_5px_18px_rgba(44,62,120,0.07)] transition-all duration-200 sm:gap-3 sm:px-4 ${
          open
            ? "border-[#6246F5] shadow-[0_8px_22px_rgba(98,70,245,0.12)] dark:border-[#55E4DB] dark:shadow-[0_0_16px_rgba(8,169,157,0.12)]"
            : "border-[#E4EAF5] hover:border-[#C8D3E8] dark:border-[#31516A] dark:hover:border-[#426781]"
        }`}
      >
        <div className="shrink-0" style={{ color: iconColor }}>
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium leading-none text-[#5870A6] dark:text-[#263B6A] sm:text-[12px]">
            {label}
          </p>

          <p className="mt-1 truncate text-[13px] font-semibold text-[#111A46] dark:text-[#111A46] sm:text-[14px]">
            {selectedOption?.label}
          </p>
        </div>

        <ChevronDown
          size={17}
          className={`shrink-0 text-[#28467C] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[68px] z-50 max-h-60 overflow-y-auto rounded-xl border border-[#E1E7F2] bg-white p-1.5 shadow-[0_15px_35px_rgba(31,52,100,0.16)] dark:border-[#31516A] dark:bg-[#102638] dark:shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(name, option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors ${
                  selected
                    ? "bg-[#EEF0FF] font-semibold text-[#6246F5] dark:bg-[#30294B] dark:text-[#B6A3FF]"
                    : "text-[#263B6A] hover:bg-[#F6F8FC] dark:text-[#F0F8FF] dark:hover:bg-[#25445D]"
                }`}
              >
                <span>{option.label}</span>

                {selected && (
                  <Check
                    size={16}
                    className="shrink-0 text-[#6246F5] dark:text-[#55E4DB]"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const FilterForm = ({ onApply, onReset }) => {
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
    dueDate: "all",
    sort: "newest",
  });

  function handleChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onApply(filters);
  }

  function handleReset() {
    const defaultFilters = {
      status: "all",
      priority: "all",
      category: "all",
      dueDate: "all",
      sort: "newest",
    };

    setFilters(defaultFilters);
    onReset(defaultFilters);
  }

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "study", label: "Study" },
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "shopping", label: "Shopping" },
    { value: "other", label: "Other" },
  ];

  const dueDateOptions = [
    { value: "all", label: "All Dates" },
    { value: "today", label: "Today" },
    { value: "upcoming", label: "Upcoming" },
    { value: "overdue", label: "Overdue" },
    { value: "noDueDate", label: "No Due Date" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "dueAsc", label: "Due Date ↑" },
    { value: "dueDesc", label: "Due Date ↓" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="ml-0 w-full min-w-0 px-3 py-4 pb-5 transition-colors duration-300 dark:bg-[#162C44] sm:px-5 sm:py-5 lg:ml-[260px] lg:w-[calc(100%-260px)] lg:px-2"
    >
      <div className="grid grid-cols-2 gap-2 min-[301px]:max-[500px]:grid-cols-3 min-[501px]:max-[689px]:grid-cols-4 min-[690px]:max-[1023px]:grid-cols-5 lg:grid-cols-[repeat(5,minmax(0,1fr))_auto_auto] sm:gap-3">
        <FilterDropdown
          name="status"
          label="Status"
          value={filters.status}
          options={statusOptions}
          icon={<CircleDot size={19} />}
          iconColor="#4868A8"
          onChange={handleChange}
        />

        <FilterDropdown
          name="priority"
          label="Priority"
          value={filters.priority}
          options={priorityOptions}
          icon={<Flag size={19} />}
          iconColor="#FF3D52"
          onChange={handleChange}
        />

        <FilterDropdown
          name="category"
          label="Category"
          value={filters.category}
          options={categoryOptions}
          icon={<Tag size={19} />}
          iconColor="#F4A521"
          onChange={handleChange}
        />

        <FilterDropdown
          name="dueDate"
          label="Due Date"
          value={filters.dueDate}
          options={dueDateOptions}
          icon={<CalendarDays size={19} />}
          iconColor="#365A95"
          onChange={handleChange}
        />

        <FilterDropdown
          name="sort"
          label="Sort"
          value={filters.sort}
          options={sortOptions}
          icon={<ArrowUpDown size={19} />}
          iconColor="#3D5FA0"
          onChange={handleChange}
        />

        <div className="col-span-full flex min-w-0 items-center gap-2 min-[690px]:max-[1023px]:grid min-[690px]:max-[1023px]:grid-cols-5 lg:contents">
          <button
            type="submit"
            className="h-[52px] min-w-0 flex-1 whitespace-nowrap rounded-xl bg-[#6246F5] px-3 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(98,70,245,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5539E9] sm:h-[62px] sm:px-5 sm:text-[15px] lg:flex-none lg:px-7"
          >
            Apply
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="h-[52px] min-w-0 flex-1 whitespace-nowrap rounded-xl border border-[#E0E6F1] bg-white px-3 text-[13px] font-medium text-[#243B70] shadow-[0_5px_18px_rgba(44,62,120,0.05)] transition-all duration-200 hover:bg-[#F7F9FD] dark:border-[#31516A] dark:bg-[#1C354D] dark:text-[#F0F8FF] dark:hover:border-[#426781] dark:hover:bg-[#25445D] sm:h-[62px] sm:px-5 sm:text-[15px] lg:flex-none lg:px-7"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;