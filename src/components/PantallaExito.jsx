export default function PantallaExito({ datos, onNueva }) {
  // Función para formatear la fecha de YYYY-MM-DD a DD-MM-YYYY
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '';
    const [year, month, day] = fechaStr.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <main className="contenedor" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <section className="exito">
        <h1>Reserva Confirmada</h1>
        <p>
          Estimado(a) <strong>{datos.nombres} {datos.apellidoP} {datos.apellidoM}</strong>,<br/>
          su hora ha sido agendada con éxito para el <strong>{formatearFecha(datos.fecha)}</strong> a las <strong>{datos.hora} hrs</strong>.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#555' }}>
          Enviaremos los detalles de su cita al correo: <strong>{datos.correo}</strong>
        </p>
        <button onClick={onNueva} className="btn-nueva-reserva">Agendar otra hora</button>
      </section>
    </main>
  );
}