import { useState, useEffect } from 'react';

export default function SidebarCalendario({ fechasDisponibles, fechaSeleccionada, onSeleccionarFecha }) {
  // Tomamos la fecha actual como referencia inicial, o la fecha seleccionada si existe
  const [fechaBase, setFechaBase] = useState(() => {
    if (fechaSeleccionada) {
      const [year, month] = fechaSeleccionada.split('-');
      return new Date(year, month - 1, 1);
    }
    return new Date(2026, 10, 1); // Por defecto Noviembre 2026 (mes 10)
  });

  // Si la fecha seleccionada cambia desde el componente padre, movemos el calendario a ese mes
  useEffect(() => {
    if (fechaSeleccionada) {
      const [year, month] = fechaSeleccionada.split('-');
      const nuevaFecha = new Date(year, month - 1, 1);
      if (nuevaFecha.getMonth() !== fechaBase.getMonth() || nuevaFecha.getFullYear() !== fechaBase.getFullYear()) {
        setFechaBase(nuevaFecha);
      }
    }
  }, [fechaSeleccionada]);

  const añoActual = fechaBase.getFullYear();
  const mesActual = fechaBase.getMonth();

  const diasSemana = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // Lógica para generar los días del mes
  const primerDiaDelMes = new Date(añoActual, mesActual, 1).getDay(); // 0 = Domingo, 1 = Lunes...
  const diasEnElMes = new Date(añoActual, mesActual + 1, 0).getDate();
  
  // Ajustar el offset porque nuestra semana empieza en Lunes (0 = Lunes, 6 = Domingo)
  const offsetInicial = primerDiaDelMes === 0 ? 6 : primerDiaDelMes - 1;

  const dias = [];
  for (let i = 0; i < offsetInicial; i++) dias.push(null);
  for (let i = 1; i <= diasEnElMes; i++) dias.push(i);

  const cambiarMes = (direccion) => {
    setFechaBase(new Date(añoActual, mesActual + direccion, 1));
  };

  const esDisponible = (dia) => {
    if (!dia) return false;
    const diaStr = dia < 10 ? `0${dia}` : dia;
    const mesStr = mesActual + 1 < 10 ? `0${mesActual + 1}` : mesActual + 1;
    const fechaStr = `${añoActual}-${mesStr}-${diaStr}`;
    return fechasDisponibles.includes(fechaStr);
  };

  const seleccionarDia = (dia) => {
    if (!esDisponible(dia)) return;
    const diaStr = dia < 10 ? `0${dia}` : dia;
    const mesStr = mesActual + 1 < 10 ? `0${mesActual + 1}` : mesActual + 1;
    onSeleccionarFecha(`${añoActual}-${mesStr}-${diaStr}`);
  };

  const esSeleccionado = (dia) => {
    if (!dia || !fechaSeleccionada) return false;
    const diaStr = dia < 10 ? `0${dia}` : dia;
    const mesStr = mesActual + 1 < 10 ? `0${mesActual + 1}` : mesActual + 1;
    return fechaSeleccionada === `${añoActual}-${mesStr}-${diaStr}`;
  };

  return (
    <div className="calendario-widget">
      <div className="calendario-header">
        <button type="button" className="btn-nav activo" onClick={() => cambiarMes(-1)}>&lt;</button>
        <h3>{meses[mesActual]} {añoActual}</h3>
        <button type="button" className="btn-nav activo" onClick={() => cambiarMes(1)}>&gt;</button>
      </div>

      <div className="calendario-grid">
        {diasSemana.map(d => <div key={d} className="dia-semana">{d}</div>)}
        
        {dias.map((dia, index) => {
          const disponible = esDisponible(dia);
          const seleccionado = esSeleccionado(dia);
          
          return (
            <div 
              key={index} 
              className={`dia-mes ${disponible ? 'disponible' : 'no-disponible'} ${seleccionado ? 'seleccionado' : ''}`}
              onClick={() => seleccionarDia(dia)}
            >
              {dia}
            </div>
          );
        })}
      </div>
    </div>
  );
}