import Icons from "./Icons";
import PropTypes from "prop-types";

const Svg = ({ name, ...props }) => {
  const Icon = Icons[name];

  return Icon ? <span {...props}>{Icon}</span> : null;
};

Svg.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Svg;
