import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionHeader } from "./Reveal";
import { supabase } from "@/integrations/supabase/client";
import dance from "@/assets/event-dance.jpg";
import singing from "@/assets/event-singing.jpg";
import rangoli from "@/assets/event-rangoli.jpg";
import fashion from "@/assets/event-fashion.jpg";

// ── Types ───────────────────────────────────────────────────────────────────

type EventDef = {
  id: string;
  title: string;
  tagline: string;
  image: string;
  imgPosition: string;
  rules: string[];
  criteria: string[];
  options: EventOption[];
};

type EventOption = {
  label: string;       // e.g. "Dance — Solo"
  type: "solo" | "duo" | "group";
  minMembers: number;
  maxMembers: number;
};

type Member = { name: string; department: string; year: string };

// ── Event Data ──────────────────────────────────────────────────────────────

const events: EventDef[] = [
  {
    id: "dance",
    title: "Dance",
    tagline: "Solo & Group",
    image: dance,
    imgPosition: "object-[center_30%]",
    options: [
      { label: "Dance — Solo",  type: "solo",  minMembers: 1, maxMembers: 1 },
      { label: "Dance — Group", type: "group", minMembers: 2, maxMembers: 6 },
    ],
    rules: [
      "Solo: 4–5 minutes • Group: 6–9 minutes (max 6 members)",
      "Music submission in MP3 format before 13/05/2026",
      "Props allowed if manageable by performer/team",
      "Appropriate, coordinated costumes required",
    ],
    criteria: [
      "Creativity & originality",
      "Synchronization with music",
      "Expressions & stage presence",
      "Costume & overall impact",
    ],
  },
  {
    id: "singing",
    title: "Singing",
    tagline: "Solo Vocal",
    image: singing,
    imgPosition: "object-[center_25%]",
    options: [
      { label: "Singing", type: "solo", minMembers: 1, maxMembers: 1 },
    ],
    rules: [
      "Solo participation only",
      "Duration: 5 minutes",
      "No vulgar or violent lyrics",
      "Karaoke tracks allowed; lyrics sheets not allowed",
    ],
    criteria: ["Voice quality", "Vocal range", "Style & performance", "Overall appeal"],
  },
  {
    id: "rangoli",
    title: "Drawing & Rangoli",
    tagline: "Solo",
    image: rangoli,
    imgPosition: "object-center",
    options: [
      { label: "Drawing & Rangoli", type: "solo", minMembers: 1, maxMembers: 1 },
    ],
    rules: [
      "Time limit: 1 hour",
      "Theme may be announced on the spot",
      "Participants bring their own materials",
      "A2 sheet provided",
    ],
    criteria: ["Creativity", "Relevance to theme", "Color & technique", "Composition & impact"],
  },
  {
    id: "fashion",
    title: "Fashion Show",
    tagline: "Solo & Duo",
    image: fashion,
    imgPosition: "object-[center_20%]",
    options: [
      { label: "Fashion Show — Solo", type: "solo", minMembers: 1, maxMembers: 1 },
      { label: "Fashion Show — Duo",  type: "duo",  minMembers: 2, maxMembers: 2 },
    ],
    rules: [
      "Follow theme and dress code",
      "Maintain rehearsal schedule",
      "Professional model conduct required",
    ],
    criteria: [
      "Creativity & originality",
      "Presentation & styling",
      "Confidence & walk",
      "Outfit fit, finish & coordination",
    ],
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function calcAmount(option: EventOption, extraMembers: number) {
  const total = option.type === "solo" ? 1
    : option.type === "duo" ? 2
    : 1 + extraMembers; // lead + members for group
  return total * 25;
}

function isGroupType(option: EventOption) {
  return option.type === "group" || option.type === "duo";
}

// ── Sub-components ──────────────────────────────────────────────────────────

function Field({
  label, name, type = "text", placeholder, value, onChange,
}: {
  label: string; name: string; type?: string;
  placeholder?: string; value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground/80 mb-1.5">
        {label}
      </label>
      <input
        id={name} name={name} type={type} required
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full bg-parchment border border-border rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition text-sm"
      />
    </div>
  );
}

function StepDot({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
      done ? "bg-gradient-gold border-transparent text-primary-foreground"
        : active ? "border-gold text-gold-deep bg-gold/10"
        : "border-border text-muted-foreground"
    }`}>
      {done ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="2 7 5.5 10.5 12 3.5" />
        </svg>
      ) : step}
    </div>
  );
}

// ── Registration Modal ──────────────────────────────────────────────────────

function RegistrationModal({ event, onClose }: { event: EventDef; onClose: () => void }) {
  const [step, setStep] = useState(1); // 1=details, 2=payment, 3=success
  const [selectedOption, setSelectedOption] = useState<EventOption>(event.options[0]);

  // Lead details
  const [leadName, setLeadName] = useState("");
  const [leadDept, setLeadDept] = useState("");
  const [leadYear, setLeadYear] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [teamName, setTeamName] = useState("");

  // Extra members (for group/duo)
  const [members, setMembers] = useState<Member[]>([]);

  // Payment
  const [txnId, setTxnId] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amount = calcAmount(selectedOption, members.length);
  const needsTeam = isGroupType(selectedOption);
  const maxExtra = selectedOption.maxMembers - 1; // minus lead

  // Lock scroll & escape key
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  // When option changes, reset members
  useEffect(() => {
    if (selectedOption.type === "duo") setMembers([{ name: "", department: "", year: "" }]);
    else if (selectedOption.type === "solo") setMembers([]);
    else setMembers([]);
  }, [selectedOption]);

  function addMember() {
    if (members.length < maxExtra) setMembers([...members, { name: "", department: "", year: "" }]);
  }

  function removeMember(idx: number) {
    setMembers(members.filter((_, i) => i !== idx));
  }

  function updateMember(idx: number, field: keyof Member, value: string) {
    setMembers(members.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  }

  function handleScreenshotChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshot(file);
    setScreenshotPreview(URL.createObjectURL(file));
  }

  async function handlePaymentSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!txnId.trim()) { setError("Please enter your UPI transaction ID."); return; }
    setSubmitting(true);

    try {
      // 1. Upload screenshot if provided
      let screenshotUrl: string | null = null;
      if (screenshot) {
        const ext = screenshot.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("payment-screenshots")
          .upload(fileName, screenshot, { contentType: screenshot.type });
        if (uploadError) throw new Error("Screenshot upload failed. Please try again.");
        const { data: urlData } = supabase.storage.from("payment-screenshots").getPublicUrl(fileName);
        screenshotUrl = urlData.publicUrl;
      }

      // 2. Insert registration
      const { data: reg, error: regError } = await supabase
        .from("registrations")
        .insert({
          event: selectedOption.label,
          team_name: needsTeam ? teamName || null : null,
          lead_name: leadName,
          lead_department: leadDept,
          lead_year: leadYear,
          lead_phone: leadPhone,
          lead_email: leadEmail,
          transaction_id: txnId.trim(),
          payment_screenshot: screenshotUrl,
          amount_paid: amount,
          verified: false,
        })
        .select("id")
        .single();

      if (regError) {
        console.error("Registration error:", JSON.stringify(regError));
        throw new Error(`Registration failed: ${regError.message} (code: ${regError.code})`);
      }

      // 3. Insert team members if any
      if (members.length > 0 && reg) {
        const { error: membersError } = await supabase.from("team_members").insert(
          members.map((m) => ({
            registration_id: reg.id,
            name: m.name,
            department: m.department,
            year: m.year,
          }))
        );
        if (membersError) throw new Error("Could not save team members. Please try again.");
      }

      setStep(3);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        role="dialog" aria-modal="true" aria-label={`Register for ${event.title}`}
      >
        <div
          className="relative w-full max-w-lg pointer-events-auto bg-parchment border border-gold/40 rounded-3xl shadow-elegant overflow-hidden flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gold top bar */}
          <div className="h-1.5 w-full bg-gradient-gold flex-shrink-0" />

          {/* Header */}
          <div className="px-7 pt-6 pb-4 border-b border-gold/20 flex-shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-script text-xl text-gold-deep leading-none">{event.tagline}</p>
                <h2 className="font-display text-3xl font-bold text-maroon mt-0.5">
                  {event.title} — Register
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="mt-1 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full border border-gold/30 text-maroon hover:bg-gold/10 hover:border-gold transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 2 L12 12 M12 2 L2 12" />
                </svg>
              </button>
            </div>

            {/* Step indicator */}
            {step < 3 && (
              <div className="flex items-center gap-2 mt-4">
                <StepDot step={1} current={step} />
                <span className="text-xs text-muted-foreground">Details</span>
                <span className="flex-1 h-px bg-border mx-1" />
                <StepDot step={2} current={step} />
                <span className="text-xs text-muted-foreground">Payment</span>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 px-7 py-6">

            {/* ── STEP 1: Details ── */}
            {step === 1 && (
              <form
                onSubmit={(e) => { e.preventDefault(); setStep(2); }}
                className="space-y-4"
              >
                {/* Event option selector */}
                {event.options.length > 1 && (
                  <div>
                    <p className="text-sm font-medium text-foreground/80 mb-2">Category</p>
                    <div className="flex gap-2 flex-wrap">
                      {event.options.map((opt) => (
                        <button
                          key={opt.label} type="button"
                          onClick={() => setSelectedOption(opt)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            selectedOption.label === opt.label
                              ? "bg-gradient-gold text-primary-foreground border-transparent shadow-elegant"
                              : "border-gold/40 text-maroon hover:border-gold hover:bg-gold/10"
                          }`}
                        >
                          {opt.label.includes("—") ? opt.label.split("—")[1].trim() : opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team name for group */}
                {needsTeam && selectedOption.type === "group" && (
                  <Field label="Team Name" name="team_name" placeholder="e.g. Fire Squad"
                    value={teamName} onChange={setTeamName} />
                )}

                {/* Lead / Solo details */}
                <div className="bg-card/50 border border-gold/20 rounded-2xl p-4 space-y-3">
                  <p className="text-xs font-semibold text-gold-deep uppercase tracking-wider">
                    {needsTeam ? "Team Lead Details" : "Your Details"}
                  </p>
                  <Field label="Full Name" name="lead_name" placeholder="e.g. Priya Sharma"
                    value={leadName} onChange={setLeadName} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Department" name="lead_dept" placeholder="e.g. Mechanical"
                      value={leadDept} onChange={setLeadDept} />
                    <Field label="Year" name="lead_year" placeholder="e.g. 3rd Year"
                      value={leadYear} onChange={setLeadYear} />
                  </div>
                  <Field label="Phone Number" name="lead_phone" type="tel" placeholder="+91 98765 43210"
                    value={leadPhone} onChange={setLeadPhone} />
                  <Field label="Gmail Address" name="lead_email" type="email" placeholder="yourname@gmail.com"
                    value={leadEmail} onChange={setLeadEmail} />
                </div>

                {/* Extra members */}
                {needsTeam && (
                  <div className="space-y-3">
                    {members.map((m, idx) => (
                      <div key={idx} className="bg-card/50 border border-gold/20 rounded-2xl p-4 space-y-3 relative">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-gold-deep uppercase tracking-wider">
                            {selectedOption.type === "duo" ? "Partner Details" : `Member ${idx + 1}`}
                          </p>
                          {selectedOption.type === "group" && (
                            <button type="button" onClick={() => removeMember(idx)}
                              className="text-xs text-destructive hover:underline">Remove</button>
                          )}
                        </div>
                        <Field label="Full Name" name={`m_name_${idx}`} placeholder="Member name"
                          value={m.name} onChange={(v) => updateMember(idx, "name", v)} />
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Department" name={`m_dept_${idx}`} placeholder="Department"
                            value={m.department} onChange={(v) => updateMember(idx, "department", v)} />
                          <Field label="Year" name={`m_year_${idx}`} placeholder="Year"
                            value={m.year} onChange={(v) => updateMember(idx, "year", v)} />
                        </div>
                      </div>
                    ))}

                    {selectedOption.type === "group" && members.length < maxExtra && (
                      <button type="button" onClick={addMember}
                        className="w-full py-2.5 rounded-xl border-2 border-dashed border-gold/40 text-gold-deep text-sm font-medium hover:border-gold hover:bg-gold/5 transition-all flex items-center justify-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M8 3v10M3 8h10" />
                        </svg>
                        Add Member ({members.length + 1}/{maxExtra} added)
                      </button>
                    )}
                  </div>
                )}

                {/* Amount preview */}
                <div className="flex items-center justify-between bg-gold/10 border border-gold/30 rounded-xl px-4 py-3">
                  <span className="text-sm text-foreground/70">
                    ₹25 × {selectedOption.type === "solo" ? "1 person" : selectedOption.type === "duo" ? "2 persons" : `${1 + members.length} persons`}
                  </span>
                  <span className="font-display text-xl font-bold text-maroon">₹{amount}</span>
                </div>

                <button type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-shadow text-sm tracking-wide flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </form>
            )}

            {/* ── STEP 2: Payment ── */}
            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-5">
                {/* Amount banner */}
                <div className="text-center bg-gradient-gold rounded-2xl py-4 px-6 shadow-elegant">
                  <p className="text-primary-foreground/80 text-sm">Total Amount</p>
                  <p className="font-display text-5xl font-bold text-primary-foreground">₹{amount}</p>
                  <p className="text-primary-foreground/70 text-xs mt-1">
                    {selectedOption.label} · {selectedOption.type === "solo" ? "1 person" : selectedOption.type === "duo" ? "2 persons" : `${1 + members.length} persons`}
                  </p>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center bg-card/60 border border-gold/30 rounded-2xl p-5">
                  <p className="font-display text-lg text-maroon mb-3">Scan to Pay</p>
                  <div className="bg-white rounded-2xl p-3 shadow-elegant">
                    <img
                      src="/src/assets/upi-qr.png"
                      alt="UPI QR Code — swayamrudra74@oksbi"
                      className="w-44 h-44 object-contain"
                      onError={(e) => {
                        // Fallback: generate QR from UPI ID
                        (e.target as HTMLImageElement).src =
                          "https://api.qrserver.com/v1/create-qr-code/?size=176x176&data=upi%3A%2F%2Fpay%3Fpa%3Dswayamrudra74%40oksbi%26pn%3DSwayam%2BShiva%2BRudraxi%26am%3D" + amount + "%26cu%3DINR";
                      }}
                    />
                  </div>
                  <p className="text-sm font-medium text-maroon mt-3">swayamrudra74@oksbi</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Swayam Shiva Rudraxi</p>
                  <p className="text-xs text-muted-foreground mt-2 bg-gold/10 px-3 py-1.5 rounded-full">
                    Open GPay / PhonePe / Paytm → Scan → Pay ₹{amount}
                  </p>
                </div>

                {/* Transaction ID */}
                <div>
                  <label htmlFor="txn_id" className="block text-sm font-medium text-foreground/80 mb-1.5">
                    UPI Transaction ID <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="txn_id" type="text" required
                    placeholder="e.g. 407612345678"
                    value={txnId}
                    onChange={(e) => setTxnId(e.target.value)}
                    className="w-full bg-parchment border border-border rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition text-sm font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Find this in your UPI app under payment history after paying
                  </p>
                </div>

                {/* Screenshot upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                    Payment Screenshot <span className="text-muted-foreground text-xs">(recommended)</span>
                  </label>
                  <label
                    htmlFor="screenshot"
                    className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gold/40 rounded-2xl p-4 cursor-pointer hover:border-gold hover:bg-gold/5 transition-all"
                  >
                    {screenshotPreview ? (
                      <img src={screenshotPreview} alt="Payment screenshot preview"
                        className="max-h-36 rounded-xl object-contain" />
                    ) : (
                      <>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-deep mb-2">
                          <rect x="3" y="5" width="26" height="22" rx="3" />
                          <circle cx="16" cy="16" r="5" />
                          <path d="M11 5 L13 2 L19 2 L21 5" />
                        </svg>
                        <p className="text-sm text-maroon font-medium">Tap to upload screenshot</p>
                        <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG or WebP · max 4 MB</p>
                      </>
                    )}
                    <input id="screenshot" type="file" accept="image/jpeg,image/png,image/webp"
                      className="hidden" onChange={handleScreenshotChange} />
                  </label>
                  {screenshotPreview && (
                    <button type="button" onClick={() => { setScreenshot(null); setScreenshotPreview(null); }}
                      className="text-xs text-destructive mt-1 hover:underline">
                      Remove screenshot
                    </button>
                  )}
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-2.5">
                    {error}
                  </p>
                )}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-full border border-gold/40 text-maroon text-sm font-medium hover:bg-gold/10 transition-colors">
                    ← Back
                  </button>
                  <button type="submit" disabled={submitting}
                    className="flex-1 py-3 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-shadow disabled:opacity-60 text-sm tracking-wide flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                          <path d="M12 2 A10 10 0 0 1 22 12" />
                        </svg>
                        Submitting…
                      </>
                    ) : "Complete Registration"}
                  </button>
                </div>
              </form>
            )}

            {/* ── STEP 3: Success ── */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-script text-5xl text-gold-deep">Dhanyavaad!</p>
                <h3 className="font-display text-2xl text-maroon mt-2">Registration Complete</h3>
                <p className="text-foreground/70 mt-3 text-sm max-w-xs mx-auto">
                  You're registered for <strong>{selectedOption.label}</strong>. We'll verify your payment and be in touch shortly.
                </p>
                <div className="mt-5 bg-gold/10 border border-gold/30 rounded-xl px-4 py-3 text-sm text-foreground/70 max-w-xs mx-auto">
                  <p>Amount paid: <strong className="text-maroon">₹{amount}</strong></p>
                  <p className="mt-0.5">UPI ID: <strong className="text-maroon">swayamrudra74@oksbi</strong></p>
                </div>
                <button onClick={onClose}
                  className="mt-7 px-8 py-2.5 rounded-full bg-gradient-gold text-primary-foreground font-medium shadow-elegant hover:shadow-glow transition-shadow text-sm">
                  Close
                </button>
              </motion.div>
            )}

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Events Section ──────────────────────────────────────────────────────────

export function Events() {
  const [activeEvent, setActiveEvent] = useState<EventDef | null>(null);

  return (
    <section id="events" className="relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader kicker="The Stage Awaits" title="Events" />

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.1}>
              <article className="group h-full flex flex-col rounded-2xl overflow-hidden border border-gold/30 bg-card/70 backdrop-blur shadow-elegant hover-lift">
                <div className="relative aspect-[16/10] overflow-hidden bg-parchment-dark">
                  <img src={e.image} alt={e.title} loading="lazy"
                    className={`w-full h-full object-cover ${e.imgPosition} mix-blend-multiply transition-transform duration-700 group-hover:scale-110`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <p className="font-script text-2xl text-gold-deep">{e.tagline}</p>
                    <h3 className="font-display text-4xl md:text-5xl font-bold text-maroon">{e.title}</h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 grid sm:grid-cols-2 gap-6 flex-1">
                  <div>
                    <h4 className="font-display text-lg text-gold-deep mb-3 tracking-wider uppercase">Rules</h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {e.rules.map((r, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-gold-deep flex-shrink-0">◆</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-gold-deep mb-3 tracking-wider uppercase">Judging</h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {e.criteria.map((c, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-maroon flex-shrink-0">✦</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 md:px-8 pb-6 mt-auto">
                  <button type="button" onClick={() => setActiveEvent(e)}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-gold text-primary-foreground font-medium hover:shadow-glow transition-shadow group/btn"
                  >
                    <span>Register for {e.title}</span>
                    <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                      viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {activeEvent && (
        <RegistrationModal event={activeEvent} onClose={() => setActiveEvent(null)} />
      )}
    </section>
  );
}
