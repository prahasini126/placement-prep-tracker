import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProgress from "./pages/AddProgress";
import WeakAreas from "./pages/WeakAreas";

function App() {
  return (
    <BrowserRouter>
    <div className="h-14 bg-white border-b flex items-center justify-between px-6">
  <h1 className="text-xl font-bold text-blue-600 tracking-wide">
    PrepSense
  </h1>

  <div className="text-sm text-gray-600">
    Hi, Prahasini
  </div>
</div>

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r">
          <div className="p-6 text-xl font-bold text-blue-600">
            PrepSense
          </div>

          <nav className="px-4 space-y-3">
            <a href="/" className="block text-gray-700 hover:text-blue-600">
              Dashboard
            </a>
            <a href="/add" className="block text-gray-700 hover:text-blue-600">
              Add Progress
            </a>
            <a href="/weak" className="block text-gray-700 hover:text-blue-600">
              Weak Areas
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddProgress />} />
            <Route path="/weak" element={<WeakAreas />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
