import { useEffect, useState } from "react";

/* ---------------------------------
   CONSTANTS
---------------------------------- */
const STEPS = {
  FORM: "FORM",
  REVIEW: "REVIEW",
  RESULT: "RESULT",
};

const FROM_ACCOUNT = {
  name: "Main Checking",
  balance: 7_356_300.86,
};

const ROUTING_DIRECTORY = {
  "021000021": "JPMorgan Chase Bank",
  "026009593": "Bank of America",
  "121000248": "Wells Fargo Bank",
  "031000503": "PNC Bank",
};

/* ---------------------------------
   HELPERS
---------------------------------- */
const money = (v) =>
  v.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

const maskAccount = (num) =>
  num.length < 4 ? num : "•••• " + num.slice(-4);

/* =================================
   TRANSFER PAGE
================================= */
export default function TransferPage() {
  const [step, setStep] = useState(STEPS.FORM);

  const [holder, setHolder] = useState("");
  const [routing, setRouting] = useState("");
  const [bank, setBank] = useState("");
  const [routingState, setRoutingState] = useState("idle");

  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  /* ---------------------------------
     ROUTING LOOKUP
  ---------------------------------- */
  useEffect(() => {
    if (routing.length !== 9) {
      setBank("");
      setRoutingState("idle");
      return;
    }

    setRoutingState("loading");

    const t = setTimeout(() => {
      const found = ROUTING_DIRECTORY[routing];
      if (found) {
        setBank(found);
        setRoutingState("valid");
      } else {
        setRoutingState("invalid");
      }
    }, 700);

    return () => clearTimeout(t);
  }, [routing]);

  const canContinue =
    holder &&
    routingState === "valid" &&
    account.length >= 6 &&
    Number(amount) > 0 &&
    Number(amount) <= FROM_ACCOUNT.balance;

  /* ---------------------------------
     SUBMIT
  ---------------------------------- */
  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        status: "Pending",
        eta: "1–2 business days",
        reference: `TX-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      });
      setLoading(false);
      setStep(STEPS.RESULT);
    }, 1200);
  };

  /* =================================
     RENDER
  ================================= */
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Send Money</h1>

      {/* ================= FORM ================= */}
      {step === STEPS.FORM && (
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">
          {/* FROM */}
          {/* <div className="flex justify-between text-sm text-slate-600">
            <span>{FROM_ACCOUNT.name}</span>
            <span className="font-mono">
              {money(FROM_ACCOUNT.balance)}
            </span>
          </div> */}

          {/* AMOUNT (HERO) */}
          <div className="border rounded-xl px-4 py-5">
            <input
              type="number"
              placeholder="$7,356,300.86"
              className="w-full text-3xl font-semibold outline-none bg-transparent"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="text-xs text-slate-500 mt-1">
              Available balance shown above
            </div>
          </div>

          {/* RECIPIENT */}
          <div className="space-y-3">
            <input
              placeholder="Account holder name"
              className="w-full border rounded-lg px-4 py-3 bg-transparent"
              value={holder}
              onChange={(e) => setHolder(e.target.value)}
            />

            <input
              placeholder="Routing number"
              inputMode="numeric"
              maxLength={9}
              className="w-full border rounded-lg px-4 py-3 bg-transparent"
              value={routing}
              onChange={(e) =>
                setRouting(e.target.value.replace(/\D/g, ""))
              }
            />

            {routingState === "loading" && (
              <div className="text-xs text-slate-500">
                Verifying bank…
              </div>
            )}

            {routingState === "valid" && (
              <div className="flex items-center gap-2 text-xs text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                {bank} • ACH Network
              </div>
            )}

            {routingState === "invalid" && (
              <div className="text-xs text-red-600">
                Bank not recognized
              </div>
            )}

            <input
              placeholder="Account number"
              className="w-full border rounded-lg px-4 py-3 bg-transparent"
              value={account}
              onChange={(e) =>
                setAccount(e.target.value.replace(/\D/g, ""))
              }
            />

            <input
              placeholder="Memo (optional)"
              className="w-full border rounded-lg px-4 py-3 bg-transparent"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          <button
            disabled={!canContinue}
            onClick={() => setStep(STEPS.REVIEW)}
            className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-40"
          >
            Review transfer
          </button>
        </div>
      )}

      {/* ================= REVIEW ================= */}
      {step === STEPS.REVIEW && (
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">
          <h2 className="font-medium">Confirm transfer</h2>

          <div className="divide-y text-sm">
            <Row label="Recipient" value={holder} />
            <Row label="Bank" value={bank} />
            <Row label="Account" value={maskAccount(account)} />
            <Row
              label="Amount"
              value={money(Number(amount))}
              strong
            />
          </div>

          <div className="text-xs text-slate-500">
            Transfers are processed via ACH. Once submitted, this
            transfer cannot be canceled.
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(STEPS.FORM)}
              className="flex-1 border rounded-lg py-2"
            >
              Back
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="flex-1 bg-black text-white rounded-lg py-2"
            >
              {loading ? "Submitting…" : "Submit"}
            </button>
          </div>
        </div>
      )}

      {/* ================= RESULT ================= */}
      {step === STEPS.RESULT && result && (
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-3">
          <h2 className="font-medium text-emerald-700">
            Transfer initiated
          </h2>
          <div className="text-sm">Status: {result.status}</div>
          <div className="text-sm">ETA: {result.eta}</div>
          <div className="text-xs text-slate-500">
            Reference: {result.reference}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------
   ROW
---------------------------------- */
function Row({ label, value, strong }) {
  return (
    <div className="flex justify-between py-2">
      <span className="text-slate-500">{label}</span>
      <span className={strong ? "font-semibold" : ""}>
        {value}
      </span>
    </div>
  );
}
