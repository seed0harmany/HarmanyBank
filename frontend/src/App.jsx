// App.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/Trasactions";
import CardComponent from "./pages/CardPage";
import AccountStatementPage from "./pages/AccountStatement";
import LocalTransferPage from "./pages/LocalTransfer";
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar";
import CheckDepositPage from "./pages/ChequeDeposit";
import ProfileSettingsPage from "./pages/ProfileSettings";
import SecurityPrivacyPage from "./pages/SecurityPrivacy";
import LoginSignupPage from "./pages/Auth";
import LoadingScreen from "./components/LoadingScreen";

/* ---------------- Scroll Controller ---------------- */
function ScrollToTop({ scrollRef }) {
  const location = useLocation();

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // critical — avoid animation conflict
      });
    }
  }, [location.pathname]);

  return null;
}


/* ---------------- Page Motion ---------------- */
const pageVariants = {
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Layout ---------------- */
function AppLayout() {
  const scrollRef = useRef(null);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const isAuthRoute = location.pathname.startsWith("/auth");

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // realistic bank transition delay

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo(0, 0);
    });
  }, [location.pathname]);



  return (
    <>
    <style>
      {` *{
        scrollbar-width: thin;
        scrollbar-color: rgba(100, 116, 139, 0.5) transparent;
      }`}
    </style>
      {loading && <LoadingScreen />}
      <ScrollToTop scrollRef={scrollRef} />

      {!isAuthRoute && (
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
      )}

      <div className={`flex h-screen ${!isAuthRoute ? "pt-[64px]" : ""}`}>
        {!isAuthRoute && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <main
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto bg-slate-50">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/auth" replace />} />

              <Route
                path="/auth"
                element={
                  <AnimatedPage>
                    <LoginSignupPage />
                  </AnimatedPage>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <AnimatedPage>
                    <Dashboard />
                  </AnimatedPage>
                }
              />

              <Route
                path="/account/history"
                element={
                  <AnimatedPage>
                    <TransactionsPage />
                  </AnimatedPage>
                }
              />

              <Route
                path="/card"
                element={
                  <AnimatedPage>
                    <CardComponent />
                  </AnimatedPage>
                }
              />

              <Route
                path="/account/statements"
                element={
                  <AnimatedPage>
                    <AccountStatementPage />
                  </AnimatedPage>
                }
              />

              <Route
                path="/transfer/local"
                element={
                  <AnimatedPage>
                    <LocalTransferPage />
                  </AnimatedPage>
                }
              />

              <Route
                path="/deposit/cheque"
                element={
                  <AnimatedPage>
                    <CheckDepositPage />
                  </AnimatedPage>
                }
              />

              <Route
                path="/profile/settings"
                element={
                  <AnimatedPage>
                    <ProfileSettingsPage />
                  </AnimatedPage>
                }
              />

              <Route
                path="/security/privacy"
                element={
                  <AnimatedPage>
                    <SecurityPrivacyPage />
                  </AnimatedPage>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

/* ---------------- App Root ---------------- */
export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
