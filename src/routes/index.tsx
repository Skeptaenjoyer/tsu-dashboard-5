import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  GraduationCap,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Search,
  User,
  WalletCards,
  X,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TSU Student Hub | Mobile Dashboard" },
      { name: "description", content: "View courses, grades, schedules, messages, and student details in the TSU Student Hub." },
      { property: "og:title", content: "TSU Student Hub" },
      { property: "og:description", content: "A modern mobile dashboard for Tbilisi State University students." },
    ],
  }),
  component: Index,
});

type Tab = "Home" | "Grades" | "Schedule" | "Messages" | "Profile";

const grades = [
  { course: "English Language A 1.1", code: "ENG 201", grade: "A", mark: 97, credits: 5, type: "Practical", activity: 28, midterm: 30, finalExam: 39, midtermAppeal: null, finalAppeal: null, additionalExam: null, additionalAppeal: null },
  { course: "Constitutional Law", code: "LAW 214", grade: "A-", mark: 91, credits: 5, type: "Exam", activity: 27, midterm: 28, finalExam: 36, midtermAppeal: null, finalAppeal: null, additionalExam: null, additionalAppeal: null },
  { course: "History of Georgian Legislation", code: "HIS 228", grade: "B+", mark: 87, credits: 5, type: "Exam", activity: 26, midterm: 27, finalExam: 34, midtermAppeal: null, finalAppeal: null, additionalExam: null, additionalAppeal: null },
  { course: "Civil Law", code: "LAW 220", grade: "A", mark: 96, credits: 5, type: "Practical", activity: 29, midterm: 29, finalExam: 38, midtermAppeal: null, finalAppeal: null, additionalExam: null, additionalAppeal: null },
];

type GradeRecord = (typeof grades)[number];

const schedule = [
  { time: "09:00", end: "10:50", course: "Georgian for Academic Purposes", room: "Building I · 206", color: "bg-primary" },
  { time: "11:00", end: "12:50", course: "Constitutional Law", room: "Building II · 404", color: "bg-campus" },
  { time: "15:00", end: "16:50", course: "History of Georgian Legislation", room: "Building I · 312", color: "bg-success" },
];

const messages = [
  { sender: "Mikheil Bichia", subject: "Civil Law seminar update", preview: "Tomorrow's seminar will begin in room 328...", time: "10:42", unread: true },
  { sender: "Student Services", subject: "Registration confirmed", preview: "Your selected subjects for Spring semester...", time: "Yesterday", unread: true },
  { sender: "Elene Reberashvili", subject: "Career Development Center", preview: "New internship opportunities are now available...", time: "Mon", unread: false },
];

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-extrabold tracking-tight">{title}</h2>{action && <span className="text-xs font-bold text-primary">{action}</span>}</div>;
}

function HomeView({ navigate }: { navigate: (tab: Tab) => void }) {
  const [selectedCourse, setSelectedCourse] = useState<GradeRecord | null>(null);
  return <div className="animate-rise space-y-6">
    <section className="overflow-hidden rounded-3xl bg-primary p-5 text-primary-foreground shadow-xl shadow-primary/15">
      <div className="flex items-start justify-between"><div><p className="text-xs font-semibold opacity-75">SPRING SEMESTER 2026</p><h1 className="mt-1 text-2xl font-extrabold">Good morning, Aleksandre</h1><p className="mt-1 text-sm opacity-80">You have 3 classes today</p></div><div className="grid size-12 place-items-center rounded-2xl bg-primary-foreground/15"><GraduationCap className="size-7" /></div></div>
      <div className="mt-6 grid grid-cols-3 divide-x divide-primary-foreground/20 rounded-2xl bg-primary-foreground/10 py-3 text-center"><div><p className="text-xl font-black">4.0</p><p className="text-[10px] font-bold opacity-70">GPA</p></div><div><p className="text-xl font-black">30</p><p className="text-[10px] font-bold opacity-70">CREDITS</p></div><div><p className="text-xl font-black">7</p><p className="text-[10px] font-bold opacity-70">COURSES</p></div></div>
    </section>
    <section><SectionTitle title="Quick access" /><div className="grid grid-cols-4 gap-2">{[
      ["Grades", BookOpen, "bg-primary/10 text-primary"], ["Schedule", CalendarDays, "bg-campus/20 text-campus-foreground"], ["Messages", MessageCircle, "bg-success/10 text-success"], ["Payments", WalletCards, "bg-destructive/10 text-destructive"],
    ].map(([label, Icon, color]) => <Button key={label as string} variant="ghost" className="h-auto flex-col gap-2 px-1 py-3" onClick={() => navigate(label === "Payments" ? "Profile" : label as Tab)}><span className={`grid size-11 place-items-center rounded-2xl ${color}`}><Icon className="size-5" /></span><span className="text-[11px] font-bold">{label as string}</span></Button>)}</div></section>
    <section><SectionTitle title="Next class" action="TODAY" /><Button variant="ghost" onClick={() => navigate("Schedule")} className="h-auto w-full justify-start rounded-2xl border bg-card p-4 text-left shadow-sm"><span className="mr-1 flex flex-col items-center rounded-xl bg-primary/10 px-3 py-2 text-primary"><b className="text-base">09:00</b><small>MON</small></span><span className="min-w-0 flex-1"><b className="block truncate">Georgian for Academic Purposes</b><span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3" /> Building I · Room 206</span></span><ChevronRight className="size-4 text-muted-foreground" /></Button></section>
    <section><SectionTitle title="Latest results" action="VIEW ALL" /><div className="space-y-2">{grades.slice(0, 3).map((item) => <Button key={item.code} variant="ghost" onClick={() => setSelectedCourse(item)} className="h-auto w-full justify-start gap-3 rounded-2xl border bg-card p-3 text-left hover:bg-card"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-success/10 font-black text-success">{item.grade}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{item.course}</span><span className="block text-xs font-normal text-muted-foreground">{item.code} · {item.credits} credits</span></span><b className="shrink-0 text-sm">{item.mark}%</b></Button>)}</div></section>
    <DetailedEvaluation course={selectedCourse} onOpenChange={(open) => { if (!open) setSelectedCourse(null); }} />
  </div>;
}

function GradeRow({ label, score, max }: { label: string; score: number; max: number }) {
  return <div className="rounded-2xl border bg-card p-4"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3"><div className="min-w-0"><p className="text-sm font-extrabold">{label}</p><p className="mt-0.5 text-xs text-muted-foreground">Maximum {max} points</p></div><p className="shrink-0 text-base font-black text-primary">{score} <span className="text-xs text-muted-foreground">/ {max}</span></p></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (score / max) * 100)}%` }} /></div></div>;
}

function DetailedEvaluation({ course, onOpenChange }: { course: GradeRecord | null; onOpenChange: (open: boolean) => void }) {
  if (!course) return null;
  const appeals = [
    ["Midterm Exam Appeal 1", course.midtermAppeal, 30],
    ["Final Exam Appeal", course.finalAppeal, 40],
    ["Additional Exam / Retake", course.additionalExam, 40],
    ["Additional Exam Appeal", course.additionalAppeal, 40],
  ] as const;
  return <Drawer open onOpenChange={onOpenChange} shouldScaleBackground={false}><DrawerContent className="mx-auto max-h-[92dvh] max-w-md rounded-t-3xl border-x bg-background shadow-2xl"><div className="overflow-y-auto px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"><header className="sticky top-0 z-10 -mx-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b bg-background/95 px-5 pb-4 pt-3 backdrop-blur-xl"><div className="min-w-0"><p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary">Detailed evaluation</p><DrawerTitle className="mt-1 text-xl font-black leading-tight">{course.course}</DrawerTitle><DrawerDescription className="mt-2"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${course.type === "Practical" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>Type: {course.type}</span></DrawerDescription></div><DrawerClose asChild><Button variant="ghost" size="icon" className="shrink-0 rounded-full" aria-label="Close detailed evaluation"><X /></Button></DrawerClose></header><section className="py-5"><div className="mb-3"><h3 className="font-black">Primary grade components</h3><p className="mt-0.5 text-xs text-muted-foreground">Your accumulated assessment points</p></div><div className="space-y-3"><GradeRow label="Activity" score={course.activity} max={30} /><GradeRow label="Mid-term Exam (Written)" score={course.midterm} max={30} /><GradeRow label="Final Written Exam" score={course.finalExam} max={40} /></div></section><Accordion type="single" collapsible className="rounded-2xl border bg-card px-4"><AccordionItem value="appeals" className="border-0"><AccordionTrigger className="py-4 hover:no-underline"><span><span className="block text-left font-extrabold">Appeals & Retakes</span><span className="mt-0.5 block text-left text-xs font-normal text-muted-foreground">Advanced assessment fields</span></span></AccordionTrigger><AccordionContent><div className="divide-y rounded-xl bg-muted/60 px-3">{appeals.map(([label, score, max]) => <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3"><span className="min-w-0 text-xs font-semibold">{label} <span className="text-muted-foreground">· Max {max}</span></span><b className="text-sm text-muted-foreground">{score === null ? "—" : `${score} / ${max}`}</b></div>)}</div></AccordionContent></AccordionItem></Accordion><section className="mt-5 overflow-hidden rounded-3xl bg-primary p-5 text-primary-foreground shadow-xl shadow-primary/15"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4"><div className="min-w-0"><p className="text-xs font-extrabold uppercase tracking-wider opacity-70">ჯამი · Total score</p><p className="mt-1 text-sm font-semibold opacity-85">Final accumulated points</p></div><p className="shrink-0 text-3xl font-black">{course.mark}<span className="text-base opacity-65"> / 100</span></p></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-primary-foreground/20"><div className="h-full rounded-full bg-primary-foreground" style={{ width: `${course.mark}%` }} /></div></section></div></DrawerContent></Drawer>;
}

function GradesView() { const [selectedCourse, setSelectedCourse] = useState<GradeRecord | null>(null); return <div className="animate-rise"><h1 className="text-2xl font-black">Academic record</h1><p className="mt-1 text-sm text-muted-foreground">Spring semester 2026</p><div className="my-5 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-primary p-4 text-primary-foreground"><p className="text-xs opacity-75">CURRENT GPA</p><b className="mt-2 block text-3xl">4.0</b></div><div className="rounded-2xl bg-campus p-4 text-campus-foreground"><p className="text-xs opacity-75">AVERAGE MARK</p><b className="mt-2 block text-3xl">92%</b></div></div><div className="space-y-3">{grades.map((item) => <Button key={item.code} variant="ghost" onClick={() => setSelectedCourse(item)} className="h-auto w-full flex-col items-stretch rounded-2xl border bg-card p-4 text-left shadow-sm hover:bg-card"><span className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3"><span className="min-w-0"><span className="block truncate font-extrabold">{item.course}</span><span className="mt-1 block text-xs font-normal text-muted-foreground">{item.code} · {item.credits} ECTS</span></span><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-success/10 text-lg font-black text-success">{item.grade}</span></span><span className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-success" style={{ width: `${item.mark}%` }} /></span><span className="mt-2 flex items-center justify-end gap-1 text-xs font-bold">{item.mark} / 100 <ChevronRight className="size-3 text-muted-foreground" /></span></Button>)}</div><DetailedEvaluation course={selectedCourse} onOpenChange={(open) => { if (!open) setSelectedCourse(null); }} /></div>; }

function ScheduleView() { return <div className="animate-rise"><h1 className="text-2xl font-black">My schedule</h1><div className="my-5 flex gap-2 overflow-x-auto pb-1">{["Mon 15", "Tue 16", "Wed 17", "Thu 18", "Fri 19"].map((day, i) => <Button key={day} variant={i === 0 ? "campus" : "outline"} className="h-14 min-w-16 flex-col rounded-2xl px-3 leading-tight"><span className="text-[10px]">{day.split(" ")[0]}</span><b>{day.split(" ")[1]}</b></Button>)}</div><div className="space-y-3">{schedule.map((item) => <div key={item.time} className="flex gap-3"><div className="w-12 pt-3 text-right"><b className="text-sm">{item.time}</b><p className="text-[10px] text-muted-foreground">{item.end}</p></div><div className="relative flex-1 overflow-hidden rounded-2xl border bg-card p-4 pl-5 shadow-sm"><span className={`absolute inset-y-0 left-0 w-1.5 ${item.color}`} /><h2 className="font-extrabold">{item.course}</h2><p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3" />{item.room}</p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3" />{item.time}–{item.end}</p></div></div>)}</div></div>; }

function MessagesView() { const [query, setQuery] = useState(""); const [messageRows, setMessageRows] = useState(messages); const [fadingSubject, setFadingSubject] = useState<string | null>(null); const filtered = messageRows.filter((m) => `${m.sender} ${m.subject}`.toLowerCase().includes(query.trim().toLowerCase())); const unreadCount = messageRows.filter((message) => message.unread).length; const markAsRead = (subject: string) => { const message = messageRows.find((item) => item.subject === subject); if (!message?.unread) return; setFadingSubject(subject); window.setTimeout(() => { setMessageRows((current) => current.map((item) => item.subject === subject ? { ...item, unread: false } : item)); setFadingSubject(null); }, 180); }; return <div className="animate-rise"><div className="flex items-center justify-between"><div><h1 className="text-2xl font-black">Messages</h1><p className="text-sm text-muted-foreground">{unreadCount} unread {unreadCount === 1 ? "message" : "messages"}</p></div><Button variant="campus" size="icon" className="rounded-xl"><Mail /></Button></div><label className="my-5 flex items-center gap-2 rounded-2xl border bg-card px-4 py-3"><Search className="size-4 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Search by sender or subject" /></label><div className="space-y-2">{filtered.map((item) => <Button key={item.subject} variant="ghost" onClick={() => markAsRead(item.subject)} className={`h-auto w-full items-start justify-start rounded-2xl border bg-card p-4 text-left transition-opacity duration-200 ${fadingSubject === item.subject ? "opacity-60" : "opacity-100"}`}><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 font-black text-primary">{item.sender.charAt(0)}</span><span className="min-w-0 flex-1"><span className="flex justify-between gap-2"><b className="truncate">{item.sender}</b><small className="text-muted-foreground">{item.time}</small></span><span className="mt-0.5 block truncate text-sm font-semibold">{item.subject}</span><span className="mt-1 block truncate text-xs font-normal text-muted-foreground">{item.preview}</span></span>{item.unread && <span className="mt-2 size-2 rounded-full bg-primary transition-opacity duration-200" />}</Button>)}</div></div>; }

function ProfileView() { return <div className="animate-rise"><div className="flex flex-col items-center py-4"><div className="grid size-24 place-items-center rounded-full bg-primary text-3xl font-black text-primary-foreground ring-8 ring-primary/10">AL</div><h1 className="mt-4 text-2xl font-black">Aleksandre Liparteliani</h1><p className="text-sm text-muted-foreground">Faculty of Law · Year 2</p></div><div className="mt-4 overflow-hidden rounded-2xl border bg-card">{[
    ["Student ID", "202421087"], ["University email", "alexander.l@tsu.edu.ge"], ["Student email", "a.liperelian@student.tsu.ge"], ["Library email", "alexander.library@tsu.edu.ge"], ["Study status", "Active"], ["Tuition balance", "₾0.00"],
  ].map(([label, value], i) => <div key={label} className={`flex items-center justify-between gap-4 p-4 ${i ? "border-t" : ""}`}><span className="text-sm text-muted-foreground">{label}</span><b className="max-w-[62%] break-all text-right text-sm">{value}</b></div>)}</div><Button variant="outline" className="mt-5 h-12 w-full rounded-2xl">Edit notification preferences</Button></div>; }

function AppHeader({ tab }: { tab: Tab }) { return <header className="sticky top-0 z-20 border-b bg-background/90 px-4 py-3 backdrop-blur-xl"><div className="mx-auto flex max-w-md items-center justify-between"><div className="flex items-center gap-2"><div className="grid size-9 place-items-center rounded-xl bg-primary text-xs font-black text-primary-foreground">TSU</div><div><p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Student Hub</p><p className="text-sm font-extrabold">{tab}</p></div></div><Button variant="ghost" size="icon" className="relative rounded-full"><Bell /><span className="absolute right-2 top-2 size-2 rounded-full bg-campus" /></Button></div></header>; }

function Index() {
  const [tab, setTab] = useState<Tab>("Home");
  const views: Record<Tab, ReactNode> = { Home: <HomeView navigate={setTab} />, Grades: <GradesView />, Schedule: <ScheduleView />, Messages: <MessagesView />, Profile: <ProfileView /> };
  const nav: [Tab, typeof Home][] = [["Home", Home], ["Grades", BookOpen], ["Schedule", CalendarDays], ["Messages", MessageCircle], ["Profile", User]];
  return <div className="min-h-screen bg-background"><AppHeader tab={tab} /><main className="mx-auto max-w-md px-4 pb-28 pt-5">{views[tab]}</main><nav className="fixed inset-x-0 bottom-0 z-30 border-t bg-card/95 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-xl"><div className="mx-auto grid max-w-md grid-cols-5 px-2">{nav.map(([label, Icon]) => <Button key={label} variant="nav" data-active={tab === label} onClick={() => setTab(label)} className="h-auto flex-col gap-1 rounded-xl px-1 py-2"><Icon className="size-5" /><span className="text-[10px]">{label}</span></Button>)}</div></nav></div>;
}
