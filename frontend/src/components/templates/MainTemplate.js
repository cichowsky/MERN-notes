import PropTypes from 'prop-types';

const MainTemplate = ({ title, children }) => {
  return (
    <div className="p-4 max-w-2xl mx-auto min-h-screen">
      {title && <h1 className="text-4xl font-semibold mb-6 pb-3 border-b-2">{title}</h1>}
      {children}
    </div>
  );
};

MainTemplate.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default MainTemplate;
