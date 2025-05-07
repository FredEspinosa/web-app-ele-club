import { useProgress } from "../../hooks/ProgressContext";

const ProgressBar = ({ porcentaje }) => {
  const { currentStep, totalSteps } = useProgress(0);
  const textoPorcentaje = porcentaje !== undefined ? `Completa tu perfil: ${porcentaje}%` : 'Completa tu perfil';

  return (
    <div style={{
      backgroundColor: porcentaje !== undefined ? 'fff' : '#333',
      padding: '16px',
      borderRadius: '16px',
      color: porcentaje !== undefined ? '000' : 'white',
      width: 'full',
    }}>
      <div style={{ marginBottom: '8px' }}>{textoPorcentaje}</div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              height: '10px',
              borderRadius: '5px',
              backgroundColor: index < currentStep ? '#b48c46' : '#ccc',
              transition: 'background-color 0.4s ease'
            }}
          />
        ))}
      </div>
      
    </div>
  );
};

export default ProgressBar;
