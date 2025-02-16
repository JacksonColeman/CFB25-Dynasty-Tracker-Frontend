import PropTypes from "prop-types";

const PageHeader = ({ content }) => {
  return <h2 className="page-header">{content}</h2>;
};

PageHeader.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PageHeader;
