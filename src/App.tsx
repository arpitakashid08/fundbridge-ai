import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardShell from "./layouts/DashboardShell";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import Dashboard from "./pages/Dashboard";
import FundingDiscovery from "./pages/FundingDiscovery";
import AIStrategist from "./pages/AIStrategist";
import Grants from "./pages/Grants";
import Loans from "./pages/Loans";
import Investors from "./pages/Investors";
import Schemes from "./pages/Schemes";
import Applications from "./pages/Applications";
import Documents from "./pages/Documents";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Landing from "./pages/Landing/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Landing />} />

        <Route element={<DashboardShell />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/funding-discovery"
            element={<FundingDiscovery />}
          />

          <Route
            path="/ai-strategist"
            element={<AIStrategist />}
          />

          <Route
            path="/grants"
            element={<Grants />}
          />

          <Route
            path="/loans"
            element={<Loans />}
          />

          <Route
            path="/investors"
            element={<Investors />}
          />

          <Route
            path="/government-schemes"
            element={<Schemes />}
          />

          <Route
            path="/applications"
            element={<Applications />}
          />

          <Route
            path="/documents"
            element={<Documents />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
