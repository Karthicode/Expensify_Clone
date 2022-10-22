import React, { useEffect } from "react";
import { useDataFromStore } from "../../store/state/StateProvider";
import { searchFilters } from "../../store/actions/search-filters";
import { ReportCard } from "./ReportCard";

export const ReportsResults = ({ reports }) => {
  const [{ searchFilters, user }, dispatch] = useDataFromStore();

  return (
    <div className="report_results_section">
      {reports.map((report) => (
        <ReportCard title={report.title} desc={report.desc} />
      ))}
    </div>
  );
};
