import { useState, useEffect, useRef } from 'react';

export default function ModalConfirmacion({ cita, prevision, valor, onCancelar, onConfirmar }) {
  const [form, setForm] = useState({
    nombres: '', apellidoP: '', apellidoM: '', fechaNacimiento: '', rut: '', dv: '', telefono: '', correo: ''
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Función para formatear la fecha a DD-MM-YYYY
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '';
    const [year, month, day] = fechaStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const enviar = (e) => {
    e.preventDefault();
    setError('');

    if (!form.fechaNacimiento) return setError('Debes seleccionar tu fecha de nacimiento.');
    if (!/^\d{9}$/.test(form.telefono)) return setError('El celular debe tener 9 dígitos.');
    if (!/^\d{7,8}$/.test(form.rut)) return setError('RUT inválido (sin puntos ni guión).');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) return setError('Correo inválido.');

    setCargando(true);
    
    timeoutRef.current = setTimeout(() => {
      setCargando(false);
      onConfirmar(form); 
    }, 1000);
  };

  return (
    <div className="modal">
      <div className="modal-contenido">
        
        <div className="modal-resumen">
          <h2>Resumen de tu reserva</h2>
          <div className="resumen-grid">
            <p><strong>Médico:</strong> {cita.medico.nombre}</p>
            <p><strong>Especialidad:</strong> {cita.medico.especialidad}</p>
            {/* AQUÍ APLICAMOS EL FORMATO */}
            <p><strong>Fecha:</strong> {formatearFecha(cita.fecha)} a las {cita.hora} hrs</p>
            <p><strong>Lugar:</strong> {cita.medico.sucursal}</p>
            <p><strong>Previsión:</strong> {prevision}</p>
            <p><strong>Valor:</strong> {valor}</p>
          </div>
        </div>

        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '1rem 0' }} />

        <form onSubmit={enviar}>
          <h3>Tus datos</h3>
          
          <input name="nombres" placeholder="Nombre(s)" value={form.nombres} onChange={cambiar} required />
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input name="apellidoP" placeholder="Apellido Paterno" style={{ flex: 1 }} value={form.apellidoP} onChange={cambiar} required />
            <input name="apellidoM" placeholder="Apellido Materno" style={{ flex: 1 }} value={form.apellidoM} onChange={cambiar} required />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input name="rut" placeholder="RUT (sin DV)" style={{ flex: 2 }} value={form.rut} onChange={cambiar} required />
            <input name="dv" placeholder="DV" maxLength={1} style={{ flex: 1, textTransform: 'uppercase' }} value={form.dv} onChange={cambiar} required />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.2rem', marginLeft: '0.2rem' }}>
                Fecha de Nacimiento
              </span>
              <input 
                name="fechaNacimiento" 
                type="date" 
                value={form.fechaNacimiento} 
                onChange={cambiar} 
                required 
                style={{ marginBottom: 0, color: form.fechaNacimiento ? '#333' : '#757575' }} 
              />
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.2rem', marginLeft: '0.2rem' }}>
                Celular
              </span>
              <input 
                name="telefono" 
                type="tel" 
                placeholder="912345678" 
                maxLength={9} 
                value={form.telefono} 
                onChange={cambiar} 
                required 
                style={{ marginBottom: 0 }} 
              />
            </div>
          </div>

          <input name="correo" type="email" placeholder="Correo electrónico" value={form.correo} onChange={cambiar} required style={{ marginTop: '0.5rem' }} />

          {error && <p className="error">{error}</p>}

          <div className="acciones">
            <button type="submit" disabled={cargando} style={{ flex: 1 }}>
              {cargando ? 'Confirmando...' : 'Confirmar Reserva'}
            </button>
            <button type="button" onClick={onCancelar} disabled={cargando} style={{ flex: 1 }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}