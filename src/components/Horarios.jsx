export default function Horarios({ horas, horaSeleccionada, onSeleccionar }) {
  if (horas.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>No hay horarios disponibles para esta fecha.</p>;
  }

  return (
    <section>
      <h2>2. Selecciona tu horario</h2>
      <div className="lista-horarios">
        {horas.map((h) => (
          <button
            key={h}
            className={`btn-hora ${horaSeleccionada === h ? 'activo' : ''}`}
            onClick={() => onSeleccionar(h)}
          >
            {h}
          </button>
        ))}
      </div>
    </section>
  );
}