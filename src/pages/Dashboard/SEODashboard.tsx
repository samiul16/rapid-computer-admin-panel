import React from "react";
import {
  RankingsWidget,
  GoogleAnalyticsWidget,
  GoogleLighthouseWidget,
  BacklinksWidget,
  GoogleSearchConsoleWidget,
} from "./components";

const SEODashboard: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-100 grid-scroll">
      <div className="p-4 min-h-full">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-800">SEO Dashboard</h1>
        </div>

        <div className="space-y-4">
          {/* First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <RankingsWidget />
            </div>
            <div>
              <GoogleAnalyticsWidget />
            </div>
            <div>
              <GoogleLighthouseWidget />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <BacklinksWidget />
            </div>
            <div className="lg:col-span-1">
              <GoogleSearchConsoleWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEODashboard;
