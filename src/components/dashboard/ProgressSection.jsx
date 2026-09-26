import { ChartNoAxesColumnIncreasing, Rose } from 'lucide-react'

function ProgressSection({ completedCount, completedPercentage, totalCount }) {
  const radius = 55
  const circumference = 2 * Math.PI * radius

  const progressOffset =
    circumference - (completedPercentage / 100) * circumference

  return (
    <div className="rounded-2xl border  w-[110%] border-white/80 bg-white/90 p-2 shadow-[0_6px_22px_rgba(30,64,175,0.08)]">
      <div className="flex items-center gap-3">
        <ChartNoAxesColumnIncreasing
          size={28}
          strokeWidth={2.5}
          className="text-[#5B3DF5]"
        />

        <h2 className="text-[22px] font-bold text-[#111A46]">
          Progress
        </h2>
      </div>

      <div className="flex justify-center py-2">
        <div className="relative h-[150px] w-[150px]">
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            className="-rotate-90"
          >
            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke="#DCE5F2"
              strokeWidth="12"
            />

            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke="#12B981"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              className="transition-all duration-700 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[28px] font-bold text-[#111A46]">
              {Math.round(completedPercentage)}%
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-[#E8FAF3] px-4 py-3 text-[#159B70]">
        <Rose size={22} strokeWidth={2} />

        <p className="text-[14px] font-medium">
          Keep going! You&apos;re making progress.
        </p>
      </div>
    </div>
  )
}

export default ProgressSection