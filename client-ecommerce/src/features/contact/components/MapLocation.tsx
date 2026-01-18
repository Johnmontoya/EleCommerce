const MapLocation = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-6 bg-[#0a1124] rounded-xl p-0 shadow-xl overflow-hidden">
      <div className="relative h-56 bg-linear-to-br from-green-300 to-blue-300 flex items-center justify-center">
        <div className="w-12 h-12 bg-[#0f172a] border-4 border-white rounded-full"></div>
        <div className="absolute bottom-2 left-2 bg-[#0f172a] px-3 py-1 rounded-md text-sm text-slate-100">
          Ubicación
          <br />
          Carrera 13A #9-40, Ciudad
        </div>
      </div>
    </div>
  );
};

export default MapLocation;
