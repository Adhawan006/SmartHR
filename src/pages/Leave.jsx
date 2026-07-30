import { useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "../styles/leave.css";

const initialRequests = [
  { id: 1, type: "Casual Leave", from: "2026-07-18", to: "2026-07-19", days: 2, reason: "Family function", status: "Approved", applied: "Jul 10, 2026" },
  { id: 2, type: "Sick Leave", from: "2026-07-28", to: "2026-07-28", days: 1, reason: "Medical appointment", status: "Pending", applied: "Jul 27, 2026" },
  { id: 3, type: "Earned Leave", from: "2026-06-10", to: "2026-06-12", days: 3, reason: "Personal travel", status: "Rejected", applied: "Jun 01, 2026" },
];

const balances = [
  { name: "Casual Leave", used: 2, total: 12, color: "blue" },
  { name: "Sick Leave", used: 1, total: 10, color: "purple" },
  { name: "Earned Leave", used: 3, total: 18, color: "orange" },
];

function Leave() {
  const [requests, setRequests] = useState(initialRequests);

  return (
    <Routes>
      <Route index element={<LeaveOverview requests={requests} setRequests={setRequests} />} />
      <Route path="apply" element={<ApplyLeave requests={requests} setRequests={setRequests} />} />
      <Route path="balance" element={<LeaveBalance />} />
      <Route path="history" element={<LeaveHistory requests={requests} />} />
      <Route path="requests" element={<TeamRequests requests={requests} setRequests={setRequests} />} />
      <Route path="*" element={<Navigate to="/leave" replace />} />
    </Routes>
  );
}

function Page({ children }) {
  const location = useLocation();
  const tabs = [
    ["/leave", "Overview"], ["/leave/apply", "Apply leave"], ["/leave/balance", "Leave balance"],
    ["/leave/history", "History"], ["/leave/requests", "Team requests"],
  ];
  return <main className="leave-page"><section className="leave-shell">
    <header className="leave-header"><div><p className="eyebrow">SMART HR · TIME OFF</p><h1>Leave management</h1><p className="page-subtitle">Plan time away, track your balance, and manage requests in one place.</p></div><Link className="primary-button" to="/leave/apply">+ Apply for leave</Link></header>
    <nav className="leave-tabs" aria-label="Leave management navigation">{tabs.map(([to, label]) => <Link key={to} to={to} className={location.pathname === to ? "active" : ""}>{label}</Link>)}</nav>
    {children}
  </section></main>;
}

function LeaveOverview({ requests, setRequests }) {
  const pending = requests.filter((r) => r.status === "Pending").length;
  return <Page><section className="balance-grid">{balances.map((balance) => <BalanceCard key={balance.name} balance={balance} />)}</section>
    <section className="content-card"><div className="section-heading"><div><h2>Recent requests</h2><p>Keep up with the status of your time-off requests.</p></div><Link to="/leave/history" className="text-link">View history →</Link></div><RequestTable requests={requests.slice(0, 4)} setRequests={setRequests} compact /></section>
    <section className="leave-tip"><span>✦</span><div><strong>{pending ? `${pending} request${pending > 1 ? "s are" : " is"} awaiting a decision` : "You are all caught up"}</strong><p>Requests are sent to your manager as soon as you submit them.</p></div><Link to="/leave/apply">Request time off</Link></section>
  </Page>;
}

function BalanceCard({ balance }) {
  const remaining = balance.total - balance.used;
  return <article className={`balance-card ${balance.color}`}><div className="balance-card-top"><span>{balance.name}</span><span className="balance-icon">◷</span></div><strong>{remaining} <small>days left</small></strong><div className="balance-progress"><i style={{ width: `${(balance.used / balance.total) * 100}%` }} /></div><p>{balance.used} used of {balance.total} days</p></article>;
}

function ApplyLeave({ requests, setRequests }) {
  const [form, setForm] = useState({ type: "Casual Leave", from: "", to: "", reason: "" });
  const [notice, setNotice] = useState("");
  const days = useMemo(() => { if (!form.from || !form.to || form.to < form.from) return 0; return Math.round((new Date(`${form.to}T00:00:00`) - new Date(`${form.from}T00:00:00`)) / 86400000) + 1; }, [form]);
  const submit = (event) => { event.preventDefault(); if (!days || !form.reason.trim()) return; setRequests([{ id: Date.now(), ...form, days, status: "Pending", applied: "Just now" }, ...requests]); setNotice("Your leave request has been submitted for approval."); setForm({ type: "Casual Leave", from: "", to: "", reason: "" }); };
  return <Page><section className="form-layout"><form className="content-card leave-form" onSubmit={submit}><div className="section-heading"><div><h2>Request time off</h2><p>Submit a leave request for your manager to review.</p></div></div>{notice && <p className="success-notice">✓ {notice}</p>}<label>Leave type<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>{balances.map((b) => <option key={b.name}>{b.name}</option>)}</select></label><div className="date-fields"><label>From<input type="date" required value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} /></label><label>To<input type="date" required min={form.from} value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} /></label></div>{days > 0 && <p className="days-preview">This request uses <strong>{days} working day{days !== 1 ? "s" : ""}</strong>.</p>}<label>Reason<textarea required rows="4" placeholder="Briefly describe the reason for your leave" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} /></label><div className="form-actions"><Link to="/leave">Cancel</Link><button className="primary-button" type="submit">Submit request</button></div></form><aside className="apply-aside"><h3>Before you apply</h3><p>Make sure your dates do not overlap with any planned commitments.</p><ul><li>Requests are reviewed by your manager.</li><li>Check your balance before submitting.</li><li>You can find the decision in leave history.</li></ul><Link to="/leave/balance">View leave balance →</Link></aside></section></Page>;
}

function LeaveBalance() { return <Page><section className="content-card"><div className="section-heading"><div><h2>Your leave balance</h2><p>Available leave for the current policy year.</p></div></div><div className="balance-detail-grid">{balances.map((balance) => <BalanceCard key={balance.name} balance={balance} />)}</div></section></Page>; }

function LeaveHistory({ requests }) { const [filter, setFilter] = useState("All"); const shown = filter === "All" ? requests : requests.filter((r) => r.status === filter); return <Page><section className="content-card"><div className="section-heading"><div><h2>Leave history</h2><p>Review every leave request and its outcome.</p></div><select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option><option>Pending</option><option>Approved</option><option>Rejected</option></select></div><RequestTable requests={shown} /></section></Page>; }

function TeamRequests({ requests, setRequests }) { return <Page><section className="content-card"><div className="section-heading"><div><h2>Team leave requests</h2><p>Approve or reject requests awaiting review.</p></div></div><RequestTable requests={requests} setRequests={setRequests} manager /></section></Page>; }

function RequestTable({ requests, setRequests, compact, manager }) {
  const updateStatus = (id, status) => setRequests?.((current) => current.map((request) => request.id === id ? { ...request, status } : request));
  if (!requests.length) return <p className="empty-state">No leave requests match this view.</p>;
  return <div className="table-wrap"><table><thead><tr>{manager && <th>Employee</th>}<th>Leave type</th><th>Dates</th><th>Days</th>{!compact && <th>Reason</th>}<th>Status</th>{manager && <th>Action</th>}</tr></thead><tbody>{requests.map((request) => <tr key={request.id}>{manager && <td><strong>Alex Morgan</strong><span className="table-muted">Product Design</span></td>}<td>{request.type}</td><td>{formatDate(request.from)} – {formatDate(request.to)}<span className="table-muted">Applied {request.applied}</span></td><td>{request.days}</td>{!compact && <td>{request.reason}</td>}<td><span className={`status ${request.status.toLowerCase()}`}>{request.status}</span></td>{manager && <td>{request.status === "Pending" ? <div className="request-actions"><button onClick={() => updateStatus(request.id, "Approved")} className="approve">Approve</button><button onClick={() => updateStatus(request.id, "Rejected")} className="reject">Reject</button></div> : "—"}</td>}</tr>)}</tbody></table></div>;
}

function formatDate(value) { if (!value) return "—"; return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T00:00:00`)); }

export default Leave;
