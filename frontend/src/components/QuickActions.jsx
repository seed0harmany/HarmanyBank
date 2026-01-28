import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Download,
  FileText,
  Settings,
  Users,
  Smartphone,
  TrendingUp,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ACTIONS = [
  { id: 1, label: "Send Money", icon: Send, path: "/transfer/local", color: "#3B82F6" },
  { id: 2, label: "Deposit", icon: Download, path: "/deposit/cheque", color: "#22C55E" },
  { id: 3, label: "Statements", icon: FileText, path: "/account/statements", color: "#94A3B8" },
  { id: 4, label: "Settings", icon: Settings, path: "/profile/settings", color: "#F59E0B" },
  { id: 5, label: "Contacts", icon: Users, path: "/contacts", color: "#38BDF8" },
  { id: 6, label: "Mobile Pay", icon: Smartphone, path: "/mobile-pay", color: "#A855F7" },
  { id: 7, label: "Investments", icon: TrendingUp, path: "/investments", color: "#10B981" },
  { id: 8, label: "Security", icon: Shield, path: "/security", color: "#EF4444" },
];

export default function QuickActions() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <style>{`
        .qa-wrapper {
          position: relative;
          margin-top: -40px;
        }

        .quick-actions {
          max-width: 400px;
          margin: 0 auto;
          padding: 12px;
          border-radius: 22px;
          background: white;
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 30px 60px rgba(0,0,0,0.45);
        }

        .qa-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 14px;
        }

        .qa-grid.secondary {
          margin-top: 14px;
        }

        .qa-btn {
          position: relative;
          padding: 16px 6px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .qa-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: 0 0 0 0 transparent;
          transition: box-shadow 0.25s ease;
        }

        .qa-btn:hover {
          transform: translateY(-2px);
        }

        .qa-btn:hover::after {
          box-shadow: 0 0 0 1px var(--qa-color),
                      0 8px 24px color-mix(in srgb, var(--qa-color) 35%, transparent);
        }

        .qa-icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          border: 1px solid color-mix(in srgb, var(--qa-color) 35%, transparent);
        }

        .qa-icon {
          width: 20px;
          height: 20px;
          color: var(--qa-color);
        }

        .qa-label {
          font-size: 12px;
          font-weight: 600;
          color: #334155;
          text-align: center;
        }

        @media (max-width: 574px) {
          .qa-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 575px) {
          .qa-toggle {
            display: none;
          }
        }

        .qa-toggle {
          margin-top: 16px;
          display: flex;
          justify-content: center;
        }
          

        .qa-toggle button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.15);
          color: #334155;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        
      `}</style>

      <div className="qa-wrapper">
        <section className="quick-actions">
          <h3 className="section-title text-slate-700 dark:text-slate-300 text-sm mb-2">Quick Actions</h3>
          <div className="qa-grid">
            {ACTIONS.slice(0, 4).map(({ id, label, icon: Icon, path, color }) => (
              <button
                key={id}
                className="qa-btn"
                style={{ "--qa-color": color }}
                onClick={() => navigate(path)}
              >
                <div className="qa-icon-wrap">
                  <Icon className="qa-icon" />
                </div>
                <span className="qa-label">{label}</span>
              </button>
            ))}
          </div>

          {(expanded || window.innerWidth >= 575) && (
            <div className="qa-grid secondary">
              {ACTIONS.slice(4).map(({ id, label, icon: Icon, path, color }) => (
                <button
                  key={id}
                  className="qa-btn"
                  style={{ "--qa-color": color }}
                  onClick={() => navigate(path)}
                >
                  <div className="qa-icon-wrap">
                    <Icon className="qa-icon" />
                  </div>
                  <span className="qa-label">{label}</span>
                </button>
              ))}
            </div>
          )}

          <div className="qa-toggle">
            <button onClick={() => setExpanded(v => !v)}>
              {expanded ? <ChevronUp className="hover:bg-[#0A2242] hover:text-white" size={16} /> : <ChevronDown className="hover:bg-[#0A2242] hover:text-white" size={16} />}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
