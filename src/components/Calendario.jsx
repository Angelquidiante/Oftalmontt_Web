export default function Calendario({ horarios, fechaSeleccionada, onSeleccionar }) {
  const fechas = Object.keys(horarios).sort();

  // Formatear fecha de YYYY-MM-DD a DD-MM-YYYY para mostrar
  const formatearFecha = (fechaStr) => {
    const [year, month, day] = fechaStr.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <section>
      <label htmlFor="fecha">1. Elige una fecha:</label>
      <select
        id="fecha"
        value={fechaSeleccionada || ''}
        onChange={(e) => onSeleccionar(e.target.value)}
      >
        <option value="" disabled>Selecciona un día disponible</option>
        {fechas.map((f) => (
          <option key={f} value={f}>
            {formatearFecha(f)} ({horarios[f].length} cupos)
          </option>
        ))}
      </select>
    </section>
  );
}