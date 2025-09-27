import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Link } from "lucide-react";

// const citationData = [{ score: 55 }]; // Removed unused variable

const newLostLinksData = [
  { date: "4 Feb", new: 1800, lost: 800 },
  { date: "11 Feb", new: 1600, lost: 1000 },
  { date: "18 Feb", new: 2000, lost: 900 },
  { date: "25 Feb", new: 1900, lost: 1100 },
  { date: "4 Mar", new: 1700, lost: 1000 },
];

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  score,
  size = 120,
  strokeWidth = 12,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#d946ef"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{score}</span>
      </div>
    </div>
  );
};

const BacklinksWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Backlinks</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Citation Flow */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600">Citation Flow</span>
          </div>

          <div className="flex justify-center">
            <CircularProgress score={55} />
          </div>
        </div>

        {/* New/Lost Links */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600">New/Lost Links</span>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span>New</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              <span>Lost</span>
            </div>
          </div>

          {/* Chart */}
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={newLostLinksData}
                margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
                barCategoryGap="25%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fill: "#666" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fill: "#666" }}
                  domain={[0, 2500]}
                />
                <Bar dataKey="new" fill="#22c55e" radius={[2, 2, 0, 0]} />
                <Bar dataKey="lost" fill="#ef4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacklinksWidget;
