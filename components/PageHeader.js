const PageHeader = ({
  title,
  subtitle
}) => (
  <div className="mb-8">
    <h1 className="text-4xl font-extrabold text-gray-800">
      {title}
    </h1>

    {
      subtitle
        ? <p className="text-gray-700">{subtitle}</p>
        : null
    }
  </div>
);

export default PageHeader;
