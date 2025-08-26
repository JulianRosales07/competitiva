export default function Navbar() {
  return (
    <nav className="app-navbar">
      <div className="app-navbar-inner flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md bg-primary"></div>
          <a href="/" className="app-navbar-logo font-semibold">Aerolínea • Tiquetes</a>
        </div>
        <div className="flex items-center gap-6">
          <a href="/tickets" className="text-sm text-gray-600 hover:text-primary">
            Tiquetes
          </a>
          <span className="text-xs text-gray-500">Panel de administración</span>
        </div>
      </div>
    </nav>
  );
}