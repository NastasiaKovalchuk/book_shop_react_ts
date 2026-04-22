import ContentLoader from "react-content-loader";

const BookCardLoader = (props: any) => {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-10">
      <ContentLoader
        viewBox="0 0 1000 550"
        height="100%"
        width="100%"
        backgroundColor="#f7f3e3"
        foregroundColor="#ece4c9"
        {...props}
      >
        <rect x="0" y="0" rx="10" ry="10" width="120" height="20" />

        <rect x="0" y="60" rx="32" ry="32" width="320" height="440" />

        <rect x="380" y="60" rx="12" ry="12" width="450" height="48" />
        <rect x="380" y="125" rx="12" ry="12" width="300" height="48" />

        <rect x="380" y="210" rx="20" ry="20" width="150" height="40" />
        <rect x="545" y="210" rx="20" ry="20" width="120" height="40" />

        <rect x="380" y="300" rx="24" ry="24" width="600" height="140" />

        <rect x="380" y="480" rx="8" ry="8" width="60" height="15" />
        <rect x="380" y="505" rx="10" ry="10" width="140" height="45" />

        <rect x="780" y="485" rx="20" ry="20" width="220" height="65" />
      </ContentLoader>
    </div>
  );
};

export default BookCardLoader;
