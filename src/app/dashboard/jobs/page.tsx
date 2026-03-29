"use client";

import { useEffect, useState } from "react";
import { getJobs, saveJob, updateJob, deleteJob, type Job } from "@/lib/storage";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  // New job form state
  const [clientName, setClientName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [description, setDescription] = useState("");
  const [teamSize, setTeamSize] = useState(4);
  const [quoteAmount, setQuoteAmount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setJobs(getJobs());
  }, []);

  const filteredJobs =
    filter === "all" ? jobs : jobs.filter((j) => j.status === filter);

  function handleAddJob() {
    const job = saveJob({
      clientName,
      projectAddress,
      description,
      status: "upcoming",
      teamSize,
      startDate: startDate || undefined,
      quoteAmount,
      invoicedAmount: 0,
      paidAmount: 0,
      notes,
    });
    setJobs([job, ...jobs]);
    resetForm();
  }

  function handleStatusChange(id: string, status: Job["status"]) {
    const updated = updateJob(id, { status });
    if (updated) {
      setJobs(jobs.map((j) => (j.id === id ? updated : j)));
    }
  }

  function handleDelete(id: string) {
    deleteJob(id);
    setJobs(jobs.filter((j) => j.id !== id));
  }

  function resetForm() {
    setClientName("");
    setProjectAddress("");
    setDescription("");
    setTeamSize(4);
    setQuoteAmount(0);
    setStartDate("");
    setNotes("");
    setShowForm(false);
  }

  const statusCounts = {
    all: jobs.length,
    upcoming: jobs.filter((j) => j.status === "upcoming").length,
    in_progress: jobs.filter((j) => j.status === "in_progress").length,
    completed: jobs.filter((j) => j.status === "completed").length,
    on_hold: jobs.filter((j) => j.status === "on_hold").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Jobs</h1>
          <p className="text-slate-light mt-1">
            Track all your active, upcoming, and completed jobs.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gold hover:bg-gold-light text-navy font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Job"}
        </button>
      </div>

      {/* Add Job Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-navy mb-4">Add New Job</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate mb-1">Client</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate mb-1">Address</label>
              <input
                type="text"
                value={projectAddress}
                onChange={(e) => setProjectAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                placeholder="Project address"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                placeholder="Brief job description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate mb-1">Team Size</label>
              <input
                type="number"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                min={1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate mb-1">Quote Amount (£)</label>
              <input
                type="number"
                value={quoteAmount || ""}
                onChange={(e) => setQuoteAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate mb-1">Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                placeholder="Any notes"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleAddJob}
              className="bg-gold hover:bg-gold-light text-navy font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Save Job
            </button>
            <button
              onClick={resetForm}
              className="text-slate-light hover:text-slate px-4 py-2.5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {(["all", "upcoming", "in_progress", "completed", "on_hold"] as const).map((status) => {
          const labels: Record<string, string> = {
            all: "All",
            upcoming: "Upcoming",
            in_progress: "In Progress",
            completed: "Completed",
            on_hold: "On Hold",
          };
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filter === status
                  ? "bg-navy text-white"
                  : "bg-white border border-gray-200 text-slate hover:border-gold"
              }`}
            >
              {labels[status]} ({statusCounts[status]})
            </button>
          );
        })}
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-slate-light">
          <p>No jobs {filter !== "all" ? `with status "${filter.replace("_", " ")}"` : "yet"}.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-navy">{job.clientName}</h3>
                  <JobStatusBadge status={job.status} />
                </div>
                <p className="text-sm text-slate-light mt-1">
                  {job.projectAddress}
                  {job.description && ` — ${job.description}`}
                </p>
                <div className="flex gap-4 mt-2 text-xs text-slate-light">
                  <span>{job.teamSize} men</span>
                  {job.startDate && (
                    <span>
                      Starts: {new Date(job.startDate).toLocaleDateString("en-GB")}
                    </span>
                  )}
                  {job.notes && <span>{job.notes}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right mr-4">
                  <div className="font-bold text-navy">
                    £{job.quoteAmount.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-light">quoted</div>
                </div>
                <select
                  value={job.status}
                  onChange={(e) =>
                    handleStatusChange(job.id, e.target.value as Job["status"])
                  }
                  className="text-sm px-3 py-1.5 rounded border border-gray-200 focus:border-gold outline-none"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on_hold">On Hold</option>
                </select>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-400 hover:text-red-600 transition-colors p-1"
                  title="Delete job"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function JobStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    upcoming: "bg-blue-100 text-blue-700",
    in_progress: "bg-amber-100 text-amber-700",
    completed: "bg-green-100 text-green-700",
    on_hold: "bg-gray-100 text-gray-600",
  };
  const labels: Record<string, string> = {
    upcoming: "Upcoming",
    in_progress: "In Progress",
    completed: "Completed",
    on_hold: "On Hold",
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status]}`}>
      {labels[status] || status}
    </span>
  );
}
