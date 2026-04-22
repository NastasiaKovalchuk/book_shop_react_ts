import React from "react";
import ContentLoader from "react-content-loader";

const BooksLoader = (props: any) => {
  const cardsPerRow = 5;
  const rows = 4;
  const cardWidth = 220;
  const cardHeight = 380;
  const gapX = 40;
  const gapY = 60;

  const loaderRects = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cardsPerRow; col++) {
      const x = col * (cardWidth + gapX);
      const y = row * (cardHeight + gapY);

      loaderRects.push(
        <React.Fragment key={`${row}-${col}`}>
          <rect
            x={x}
            y={y}
            rx="24"
            ry="24"
            width={cardWidth}
            height={cardHeight}
            fillOpacity="0.3"
          />

          <rect x={x} y={y} rx="24" ry="24" width={cardWidth} height="240" />

          <rect
            x={x + 15}
            y={y + 260}
            rx="6"
            ry="6"
            width={cardWidth - 40}
            height="16"
          />
          <rect
            x={x + 15}
            y={y + 285}
            rx="6"
            ry="6"
            width={cardWidth - 100}
            height="16"
          />

          <rect
            x={x + 15}
            y={y + 315}
            rx="4"
            ry="4"
            width={cardWidth - 120}
            height="12"
          />

          <rect x={x + 15} y={y + 350} rx="4" ry="4" width="40" height="10" />
          <rect
            x={x + cardWidth - 65}
            y={y + 342}
            rx="8"
            ry="8"
            width="50"
            height="22"
          />
        </React.Fragment>,
      );
    }
  }

  const totalWidth = cardsPerRow * cardWidth + (cardsPerRow - 1) * gapX;
  const totalHeight = rows * cardHeight + (rows - 1) * gapY;

  return (
    <div className="min-h-screen bg-[#fdfcf0] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <ContentLoader
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          width="100%"
          height="100%"
          backgroundColor="#f7f3e3"
          foregroundColor="#ece4c9"
          {...props}
        >
          {loaderRects}
        </ContentLoader>
      </div>
    </div>
  );
};

export default BooksLoader;
