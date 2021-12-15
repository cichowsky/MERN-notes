const Loader = () => (
  <div className="flex justify-center items-center">
    <div
      className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-gray-300"
      style={{ borderRightColor: 'transparent' }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loader;
