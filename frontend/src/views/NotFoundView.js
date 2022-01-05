import MainTemplate from 'components/templates/MainTemplate';
import Redirection from 'components/atoms/Redirection/Redirection';

const NotFoundView = () => {
  return (
    <MainTemplate>
      <p className="text-5xl text-red-600 font-bold mt-10">404</p>
      <h2 className="text-3xl text-red-600 font-semibold mb-10">Page not found!</h2>
      <Redirection />
    </MainTemplate>
  );
};

export default NotFoundView;
