export function IndicadorParticipacion({ porcentaje }: { porcentaje: number }) {
  const valor = Math.min(100, Math.max(0, porcentaje))
  return (
    <div className="participacion-segmentada" role="progressbar" aria-label="Participación"
      aria-valuemin={0} aria-valuemax={100} aria-valuenow={valor} title={`Participación: ${valor}%`}>
      <div className="participacion-segmentada__tramos" aria-hidden="true">
        {Array.from({ length: 10 }, (_, indice) => (
          <span key={indice} className="participacion-segmentada__tramo">
            <span className="participacion-segmentada__relleno"
              style={{ width: `${Math.min(100, Math.max(0, (valor - indice * 10) * 10))}%`, background: indice === 9 ? '#ffb025' : '#004373' }} />
          </span>
        ))}
      </div>
      <strong aria-hidden="true">{valor}%</strong>
    </div>
  )
}
