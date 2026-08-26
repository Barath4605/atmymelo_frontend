import React, { useEffect, useRef, useState } from "react";
import { Flag } from "lucide-react";
import { submitAlbumReport, submitArtistReport } from "../../api/reportApi.js";

const SubmitReport = ({ albumId, artistId, type, alreadyReported = [] }) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const reportRef = useRef(null);

  const reports = [
    {
      label: "Missing/Wrong Data",
      value: "MISSING_DATA",
    },
    {
      label: "Missing/Wrong Images",
      value: "MISSING_IMG",
    },
  ];

  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reportRef.current && !reportRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const submitReport = async (reportType) => {
    // Don't allow duplicate reports
    if (alreadyReported.includes(reportType)) {
      return;
    }

    setSubmitting(true);

    try {
      if (type === "album") {
        await submitAlbumReport(albumId, reportType);
      } else if (type === "artist") {
        await submitArtistReport(artistId, reportType);
      } else {
        throw new Error("Invalid report type");
      }

      // Close dropdown after successful submission
      setOpen(false);
    } catch (error) {
      console.error("Report submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const allReported = alreadyReported.length >= reports.length;

  return (
    <div ref={reportRef} className="relative inline-block">
      {/* REPORT BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={allReported}
        title={allReported ? "All reports already submitted" : "Report"}
        className="
          text-white/45
          transition-colors
          hover:text-white/80
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <Flag
          size={18}
          strokeWidth={1.8}
          className="cursor-pointer p-0.5 hover:fill-white/60"
        />
      </button>

      {/* REPORT DROPDOWN */}
      {open && !allReported && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-2
            w-52
            rounded-md
            border
            border-white/10
            bg-black/40
            p-1
            text-white
            shadow-lg
            backdrop-blur-3xl
          "
        >
          {reports.map((report) => {
            const disabled = alreadyReported.includes(report.value);

            return (
              <button
                key={report.value}
                type="button"
                disabled={disabled || submitting}
                onClick={() => submitReport(report.value)}
                className="
                  block
                  w-full
                  rounded
                  border-b
                  border-transparent
                  px-3
                  py-2
                  text-left
                  text-sm
                  transition-colors
                  hover:border-white/10
                  hover:bg-white/10
                  disabled:cursor-not-allowed
                  disabled:text-white/30
                "
              >
                <span>{report.label}</span>

                {disabled && (
                  <span className="ml-1 text-xs text-white/50">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubmitReport;
