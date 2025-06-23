// eslint-disable-next-line no-unused-vars
const InputDinamico = ({ config, value, onChange }) => {
  const { type, name, label, options, placeholder, iconStart, iconNameStart, iconEnd, iconNameEnd, help, msjHelp, disabled, onIconEndClick } = config;

  const getFormattedDate = (isoDate) => {
    if (!isoDate) return "";
    return isoDate.split("T")[0]; // Convierte la fecha ISO a formato YYYY-MM-DD
  };

  return (
    <div className="input-dinamico">
      {type === "select" ? (
        <div>
          <div className="club_input">
            {label && (
              <label className="club_input_label" htmlFor={name}>
                {label}
              </label>
            )}
            <div className="club_input_contenedor">
              {iconStart && <div>{iconNameStart}</div>}
              <select className="club_input_campo" id={name} name={name} value={value} onChange={onChange} disabled={disabled}>
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {iconEnd && <div onClick={onIconEndClick}>{iconNameEnd}</div>}
            </div>
            {help && <span className="club_input_span">{msjHelp}</span>}
          </div>
        </div>
      ) : type === "date" ? (
        <div>
          <div className="club_input">
            {label && (
              <label className="club_input_label" htmlFor={name}>
                {label}
              </label>
            )}
            <div className="club_input_contenedor">
              {iconStart && <div>{iconNameStart}</div>}
              <input
                className="club_input_campo"
                type="date"
                id={name}
                name={name}
                value={getFormattedDate(value)} // Muestra el valor en formato YYYY-MM-DD
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
              />
              {iconEnd && <div onClick={onIconEndClick}>{iconNameEnd}</div>}
            </div>
            {help && <span className="club_input_span">{msjHelp}</span>}
          </div>
        </div>
      ) : type === "textArea" ? (
        <div>
          <div className="club_input">
            {label && (
              <label className="club_input_label" htmlFor={name}>
                {label}
              </label>
            )}
            <div className="club_input_contenedor">
              <textarea className="club_input_campo" id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
            </div>
            {help && <span className="club_input_span">{msjHelp}</span>}
          </div>
        </div>
      ) : (
        <div>
          <div className="club_input">
            {label && (
              <label className="club_input_label" htmlFor={name}>
                {label}
              </label>
            )}
            <div className="club_input_contenedor">
              {iconStart && <div>{iconNameStart}</div>}
              <input
                className="club_input_campo"
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
              />
              {iconEnd && <div onClick={onIconEndClick}>{iconNameEnd}</div>}
            </div>
            {help && <span className="club_input_span">{msjHelp}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputDinamico;

// Explicación del código:
// Props del componente InputDinamico:

// config: Un objeto que contiene toda la configuración del campo (tipo de input, nombre, opciones si es un select, etiqueta, etc.).
// value: El valor actual del campo.
// onChange: Una función que se ejecuta cuando el valor del campo cambia.
// Renderización condicional:

// Si el tipo es select, renderiza un elemento select con las opciones proporcionadas en config.options.
// Si no, renderiza un elemento input con el tipo especificado (como text, email, number, etc.).
