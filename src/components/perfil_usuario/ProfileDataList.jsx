/* eslint-disable react/prop-types */
import ProfilePreferenceSection from "./ProfilePreferecesSection";

/* eslint-disable react-refresh/only-export-components */
const ProfileDataList = ({ dataUser }) => {
  const dataFields = [
    { key: "lookingFors", title: "Estoy buscando" },
    { key: "genders", title: "Identidad de género" },
    { key: "sexualIdentities", title: "¿Cuál es tu identidad sexual?" },
    { key: "perceptions", title: "Percepción sexual" },
    { key: "interests", title: "Intereses" },
    { key: "pets", title: "¿Tienes mascotas?" },
    { key: "pronouns", title: "¿Cuáles son tus pronombres?" },
    { key: "relationshipStatus", title: "Estatus de relación" },
    { key: "roles", title: "¿Cuál es tu rol?" },
    { key: "smokes", title: "¿Fumas?" },
    { key: "zodiacs", title: "¿Cuál es tu signo zodiacal?" },
  ];

  return (
    <div className="profile-data">
      {dataFields.map((field) => (
        <ProfilePreferenceSection key={field.key} title={field.title} data={dataUser[field.key]} />
      ))}
    </div>
  );
};

export default ProfileDataList;
