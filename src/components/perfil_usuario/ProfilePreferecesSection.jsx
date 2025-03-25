/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const ProfilePreferenceSection = ({ title, data }) => (
  <div className="club_cont_data_perfil">
    <h3 className="club_txt_titular">{title}</h3>
    <div className="d-flex flex-wrap">
      {Array.isArray(data) &&
        data.map((item, index) => (
          <li className="club_no_decoration_list" key={index}>
            <span className="club_txt_caption w-100 club_texto_capsula">
              {item.lookingFor?.name || item.gender?.name || item.sexualIdentity?.name || item.perception?.name}
            </span>
          </li>
        ))}
    </div>
  </div>
);

export default ProfilePreferenceSection;
