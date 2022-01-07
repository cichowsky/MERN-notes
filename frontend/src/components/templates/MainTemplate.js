import Header from 'components/organisms/Header/Header';
import Footer from 'components/molecules/Footer/Footer';
import PropTypes from 'prop-types';

const MainTemplate = ({ title, children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tl from-gray-50 to-gray-100">
      <Header />

      <main className="px-4 py-6 max-w-2xl w-full flex-grow self-center ">
        {title && <h1 className="text-4xl font-semibold mb-6 pb-3 border-b-2">{title}</h1>}
        {children}
      </main>

      <Footer />
    </div>
  );
};

MainTemplate.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default MainTemplate;
