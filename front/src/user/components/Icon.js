import { IconContext } from "react-icons";

const Icon = (props) => {
  const iconn = props.iconn;
  const styles = props.styles;
  return (
    <div className={styles} onClick={props.clicked}>
      <IconContext.Provider
        value={{
          color: props.color,
          size: props.size,
        }}
      >
        <div className={styles}>{iconn}</div>
      </IconContext.Provider>
    </div>
  );
};

export default Icon;
