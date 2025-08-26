export default function Navbar() {
  return (
    <nav className="app-navbar">
      <div className="app-navbar-inner">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md bg-primary"></div>
          <span className="font-semibold">Datta Able • Tiquetes</span>
        </div>
        <div className="text-xs text-gray-500">Frontend mock</div>
      </div>
    </nav>
  );
}
