const PageHeader = ({
  title,
  subtitle
}) => (
  <div>
    <h1 className="text-4xl font-extrabold text-gray-800">
      {title}
    </h1>

    {
      subtitle
        ? <p className="text-gray-700">{subtitle}</p>
        : ''
    }
  </div>
);

export default PageHeader;
