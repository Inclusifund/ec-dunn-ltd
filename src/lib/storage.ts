// Local storage helpers for persisting quotes and jobs
// In a future version, this moves to a proper database (Supabase, etc.)

export interface QuoteLineItem {
  description: string;
  quantity: number;
  unit: string;
  unitRate: number;
  total: number;
}

export interface JobVariable {
  name: string;
  cost: number;
  notes?: string;
}

export interface Quote {
  id: string;
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  projectAddress: string;
  description: string;
  // Materials & labour
  lineItems: QuoteLineItem[];
  // Job-specific variables (the pain points!)
  variables: JobVariable[];
  // Totals
  materialsTotal: number;
  labourTotal: number;
  variablesTotal: number;
  subtotal: number;
  margin: number; // percentage
  marginAmount: number;
  total: number;
  // Meta
  status: "draft" | "sent" | "accepted" | "declined";
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  quoteId?: string;
  clientName: string;
  projectAddress: string;
  description: string;
  status: "upcoming" | "in_progress" | "completed" | "on_hold";
  teamSize: number;
  startDate?: string;
  endDate?: string;
  quoteAmount: number;
  invoicedAmount: number;
  paidAmount: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const QUOTES_KEY = "ecdunn_quotes";
const JOBS_KEY = "ecdunn_jobs";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Quotes
export function getQuotes(): Quote[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(QUOTES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveQuote(quote: Omit<Quote, "id" | "createdAt" | "updatedAt">): Quote {
  const quotes = getQuotes();
  const now = new Date().toISOString();
  const newQuote: Quote = {
    ...quote,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  quotes.unshift(newQuote);
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
  return newQuote;
}

export function updateQuote(id: string, updates: Partial<Quote>): Quote | null {
  const quotes = getQuotes();
  const index = quotes.findIndex((q) => q.id === id);
  if (index === -1) return null;
  quotes[index] = {
    ...quotes[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
  return quotes[index];
}

export function deleteQuote(id: string): void {
  const quotes = getQuotes().filter((q) => q.id !== id);
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

// Jobs
export function getJobs(): Job[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(JOBS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveJob(job: Omit<Job, "id" | "createdAt" | "updatedAt">): Job {
  const jobs = getJobs();
  const now = new Date().toISOString();
  const newJob: Job = {
    ...job,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  jobs.unshift(newJob);
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  return newJob;
}

export function updateJob(id: string, updates: Partial<Job>): Job | null {
  const jobs = getJobs();
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) return null;
  jobs[index] = {
    ...jobs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  return jobs[index];
}

export function deleteJob(id: string): void {
  const jobs = getJobs().filter((j) => j.id !== id);
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

// Common job variables presets — these are your dad's pain points solved
export const COMMON_VARIABLES = [
  { name: "Parking (per day)", defaultCost: 30 },
  { name: "Congestion Charge (per day)", defaultCost: 15 },
  { name: "ULEZ Charge (per day)", defaultCost: 12.50 },
  { name: "Stair Carry — No Lift (per floor)", defaultCost: 150 },
  { name: "Skip Hire", defaultCost: 350 },
  { name: "Waste Disposal", defaultCost: 200 },
  { name: "Scaffolding / Tower Hire", defaultCost: 250 },
  { name: "Travel (fuel + time)", defaultCost: 50 },
  { name: "Overnight Accommodation", defaultCost: 120 },
  { name: "Security / DBS Checks", defaultCost: 80 },
  { name: "Permit to Work", defaultCost: 50 },
  { name: "Out of Hours Working Premium", defaultCost: 200 },
  { name: "Weekend Working Premium", defaultCost: 300 },
  { name: "Hot Works Permit", defaultCost: 75 },
  { name: "Asbestos Survey Requirement", defaultCost: 400 },
];
