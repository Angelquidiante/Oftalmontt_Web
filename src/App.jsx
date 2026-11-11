import { useState } from 'react';
import data from './data/horarios.json';
import SidebarCalendario from './components/SidebarCalendario.jsx';
import ModalConfirmacion from './components/ModalConfirmacion.jsx';
import PantallaExito from './components/PantallaExito.jsx';
import logoOftalmontt from './assets/logo.png'; 

const Header = ({ menuAbierto, setMenuAbierto }) => (
  <>
    <div className="oftalmo-topbar-wrapper">
      <div className="oftalmo-topbar">
        <span>Oftalmontt - Clínica Oftalmológica</span>
        <span>Lunes a Jueves de 08:00 a 19:00 hrs Viernes de 08:00 a 18:00 hrs. Horario Extendido. Fono: +56 (65) 2 340 900 Mail: info@oftalmontt.cl</span>
      </div>
    </div>
    <div className="oftalmo-header-wrapper">
      <header className="oftalmo-header">
        <div className="oftalmo-logo">
          <img src={logoOftalmontt} alt="Oftalmontt Logo" />
        </div>
        <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)}>☰</button>
        <nav className={`oftalmo-nav ${menuAbierto ? 'abierto' : ''}`}>
          <a href="#">Inicio</a>
          <a href="#">Staff</a>
          <a href="#">Servicios</a>
          <a href="#">Especialidades</a>
          <a href="#">Patologías</a>
          <a href="#">Clínicas</a>
          <a href="#">Noticias</a>
          <a href="#">Portal de Exámenes</a>
          <a href="#">Contacto</a>
        </nav>
      </header>
    </div>
  </>
);

const Footer = () => (
  <footer className="oftalmo-footer">
    <div className="footer-content">
      <div className="footer-col footer-logo">
        <img src={logoOftalmontt} alt="Oftalmontt Logo" />
      </div>
      <div className="footer-col">
        <p>En Clínica Oftalmontt, combinamos la experiencia de nuestros especialistas con tecnología de última generación para ofrecerte exámenes, procedimientos y cirugías de la más alta calidad.</p>
        <p>👁️ Cuidamos tus ojos con excelencia y dedicación.</p>
        <p>Confía en nosotros, cuida tu salud visual hoy.</p>
        <p>© 2026 Clínica Oftalmontt SpA. Todos los derechos reservados.</p>
      </div>
      <div className="footer-col">
        <p>🕒 <strong>Horario de atención:</strong> Contáctenos de lunes a jueves de 08:00 a 19:00 hrs y viernes de 08:00 a 18:00 hrs. Horario Extendido.</p>
        <p>📍 <strong>Encuéntranos en:</strong> Panamericana #400, Piso Zócalo, Puerto Montt.</p>
        <p>📍 <strong>Encuéntranos en:</strong> Dr. Giessler #702, Puerto Varas.</p>
        <p>📞 <strong>Agenda tu cita ahora:</strong> +56 (65) 2 340 900</p>
        <p>✉️ <strong>Contáctanos:</strong> info@oftalmontt.cl</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [haBuscado, setHaBuscado] = useState(false);
  
  // Inicializados vacíos para que no haya preselección
  const [sucursal, setSucursal] = useState('');
  const [prevision, setPrevision] = useState('');
  
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [confirmado, setConfirmado] = useState(null);

  // Valores según previsión
  const valores = {
    Fonasa: '$26.830',
    Isapre: '$37.884',
    Particular: '$75.000',
    Otro: '$45.000' 
  };
  const valorConsulta = valores[prevision] || '';

  // Filtrar médicos
  const medicosDisponibles = data.medicos.filter(m => 
    m.sucursal.includes(sucursal) && m.previsiones.includes(prevision)
  );

  // Calcular fechas disponibles
  const fechasDelFiltro = [...new Set(
    medicosDisponibles.flatMap(m => Object.keys(m.fechas))
  )].sort();

  const reset = () => {
    setHaBuscado(false);
    setFechaSeleccionada(null);
    setCitaSeleccionada(null);
    setConfirmado(null);
    setMenuAbierto(false);
    setSucursal('');
    setPrevision('');
  };

  const iniciarBusqueda = () => {
    // Si no hay selección, no hace nada
    if (!sucursal || !prevision) return; 

    if (fechasDelFiltro.length > 0) {
      setFechaSeleccionada(fechasDelFiltro[0]);
    }
    setHaBuscado(true);
  };

  const manejarConfirmacion = (paciente) => {
    setConfirmado({ ...paciente, ...citaSeleccionada, prevision, valor: valorConsulta });
    setCitaSeleccionada(null); 
    setMenuAbierto(false);     
    window.scrollTo(0, 0); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto} />
      
      <div style={{ flex: 1, backgroundColor: 'var(--bg-color)', display: 'flex', flexDirection: 'column' }}>
        {confirmado ? (
          <PantallaExito datos={confirmado} onNueva={reset} />
        ) : !haBuscado ? (
          <main className="pantalla-buscador">
            <div className="buscador-card">
              <h1>Agenda tu hora</h1>
              <p>Selecciona tu sucursal y previsión para ver disponibilidad.</p>
              
              <label>Sucursal</label>
              <select value={sucursal} onChange={(e) => setSucursal(e.target.value)}>
                <option value="" disabled>Selecciona una sucursal</option>
                <option value="Puerto Montt">Oftalmontt Puerto Montt</option>
                <option value="Puerto Varas">Oftalmontt Puerto Varas</option>
              </select>

              <label>Previsión</label>
              <select value={prevision} onChange={(e) => setPrevision(e.target.value)}>
                <option value="" disabled>Selecciona tu previsión</option>
                <option value="Fonasa">Fonasa</option>
                <option value="Isapre">Isapre</option>
                <option value="Particular">Particular</option>
                <option value="Otro">Otro</option>
              </select>

              <button 
                className="btn-buscar" 
                onClick={iniciarBusqueda}
                disabled={!sucursal || !prevision} 
                style={{ opacity: (!sucursal || !prevision) ? 0.6 : 1, cursor: (!sucursal || !prevision) ? 'not-allowed' : 'pointer' }}
              >
                Buscar horas disponibles
              </button>
            </div>
          </main>
        ) : (
          <>
            <div className="top-bar-resultados">
              <span>Mostrando horas para: <strong>{sucursal} | {prevision}</strong></span>
              <button className="btn-volver" onClick={reset}>Volver a buscar</button>
            </div>
            
            <main className="layout-principal">
              <div className="columna-medicos">
                <h2 className="titulo-fecha">
                  {fechaSeleccionada ? `Horas para el ${fechaSeleccionada.split('-').reverse().join('-')}` : 'Selecciona una fecha en el calendario'}
                </h2>

                {medicosDisponibles.length === 0 ? (
                  <p>No hay médicos disponibles para esta previsión en esta sucursal.</p>
                ) : fechaSeleccionada && medicosDisponibles.map((medico) => {
                  const horasDelDia = medico.fechas[fechaSeleccionada] || [];
                  if (horasDelDia.length === 0) return null;

                  return (
                    <div key={medico.id} className="tarjeta-medico">
                      <div className="medico-header">
                        <span className="badge-valor">{prevision}: {valorConsulta}</span>
                        <span className="badge-sucursal">Sucursal: {medico.sucursal}</span>
                      </div>
                      
                      <div className="medico-body">
                        <div className="medico-avatar">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                          <div className="medico-info">
                            <h3>{medico.nombre}</h3>
                            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Área de Interés:</p>
                            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#666', marginBottom: '0.8rem' }}>
                              {medico.especialidad.split(', ').map((area, index) => (
                                <li key={index}>{area}</li>
                              ))}
                            </ul>
                            <p className="convenios" style={{ fontWeight: '600', fontSize: '0.8rem' }}>Convenios: {medico.previsiones.join(', ')}</p>
                          </div>
                      </div>

                      <div className="medico-horarios">
                        {horasDelDia.map(hora => (
                          <button 
                            key={hora} 
                            className="btn-hora-lista"
                            onClick={() => setCitaSeleccionada({ medico, fecha: fechaSeleccionada, hora })}
                          >
                            {hora}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="columna-calendario">
                <SidebarCalendario 
                  fechasDisponibles={fechasDelFiltro}
                  fechaSeleccionada={fechaSeleccionada}
                  onSeleccionarFecha={setFechaSeleccionada}
                />
              </div>
            </main>
          </>
        )}
      </div>

      <Footer />

      {citaSeleccionada && (
        <ModalConfirmacion
          cita={citaSeleccionada}
          prevision={prevision}
          valor={valorConsulta}
          onCancelar={() => setCitaSeleccionada(null)}
          onConfirmar={manejarConfirmacion}
        />
      )}
    </div>
  );
}