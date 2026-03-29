"use client";

import { useEffect, useState } from "react";
import { getQuotes, getJobs, type Quote, type Job } from "@/lib/storage";

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setQuotes(getQuotes());
    setJobs(getJobs());
  }, []);

  const totalQuoted = quotes.reduce((sum, q) => sum + q.total, 0);
  const acceptedQuotes = quotes.filter((q) => q.status === "accepted");
  const totalWon = acceptedQuotes.reduce((sum, q) => sum + q.total, 0);
  const activeJobs = jobs.filter((j) => j.status === "in_progress");
  const completedJobs = jobs.filter((j) => j.status === "completed");
  const totalInvoiced = jobs.reduce((sum, j) => sum + j.invoicedAmount, 0);
  const totalPaid = jobs.reduce((sum, j) => sum + j.paidAmount, 0);
  const outstanding = totalInvoiced - totalPaid;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-slate-light mt-1">
          Welcome back, Edward. Here&apos;s your business at a glance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Quoted"
          value={`£${totalQuoted.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`}
          sub={`${quotes.length} quotes`}
          color="navy"
        />
        <StatCard
          label="Work Won"
          value={`£${totalWon.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`}
          sub={`${acceptedQuotes.length} accepted`}
          color="green"
        />
        <StatCard
          label="Active Jobs"
          value={activeJobs.length.toString()}
          sub={`${completedJobs.length} completed`}
          color="gold"
        />
        <StatCard
          label="Outstanding"
          value={`£${outstanding.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`}
          sub={`£${totalPaid.toLocaleString("en-GB")} paid`}
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <a
          href="/dashboard/quote"
          className="bg-gold hover:bg-gold-light text-navy font-semibold rounded-xl p-6 text-center transition-colors"
        >
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Quote
        </a>
        <a
          href="/dashboard/jobs"
          className="bg-white hover:bg-cream border border-gray-200 text-navy font-semibold rounded-xl p-6 text-center transition-colors"
        >
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
          </svg>
          View Jobs
        </a>
        <a
          href="/dashboard/voice"
          className="bg-white hover:bg-cream border border-gray-200 text-navy font-semibold rounded-xl p-6 text-center transition-colors"
        >
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
          </svg>
          Voice Input
        </a>
      </div>

      {/* Recent Quotes */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-navy mb-4">Recent Quotes</h2>
        {quotes.length === 0 ? (
          <div className="text-center py-8 text-slate-light">
            <p>No quotes yet.</p>
            <a href="/dashboard/quote" className="text-gold font-semibold hover:underline">
              Create your first quote
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-slate-light border-b border-gray-100">
                  <th className="pb-2 pr-4">Client</th>
                  <th className="pb-2 pr-4">Description</th>
                  <th className="pb-2 pr-4">Total</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {quotes.slice(0, 5).map((quote) => (
                  <tr key={quote.id} className="border-b border-gray-50">
                    <td className="py-3 pr-4 font-medium text-navy">
                      {quote.clientName || "—"}
                    </td>
                    <td className="py-3 pr-4 text-slate-light truncate max-w-48">
                      {quote.description || "—"}
                    </td>
                    <td className="py-3 pr-4 font-semibold text-navy">
                      £{quote.total.toFixed(2)}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={quote.status} />
                    </td>
                    <td className="py-3 text-slate-light">
                      {new Date(quote.createdAt).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Recent Jobs */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">Active Jobs</h2>
          <a href="/dashboard/jobs" className="text-sm text-gold font-semibold hover:underline">
            View all
          </a>
        </div>
        {activeJobs.length === 0 ? (
          <div className="text-center py-8 text-slate-light">
            <p>No active jobs.</p>
            <p className="text-sm mt-1">
              Jobs appear here once you accept a quote or add one manually.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeJobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div>
                  <div className="font-medium text-navy">{job.clientName}</div>
                  <div className="text-sm text-slate-light">
                    {job.projectAddress}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-navy">
                    £{job.quoteAmount.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-light">
                    {job.teamSize} men
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    navy: "border-l-navy",
    green: "border-l-green-500",
    gold: "border-l-gold",
    red: "border-l-red-400",
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 border-l-4 ${colorMap[color]} p-5`}
    >
      <div className="text-sm text-slate-light">{label}</div>
      <div className="text-2xl font-bold text-navy mt-1">{value}</div>
      <div className="text-xs text-slate-light mt-1">{sub}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "bg-gray-100 text-gray-600",
    sent: "bg-blue-100 text-blue-700",
    accepted: "bg-green-100 text-green-700",
    declined: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status] || styles.draft}`}
    >
      {status}
    </span>
  );
}
