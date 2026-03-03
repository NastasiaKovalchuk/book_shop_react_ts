import React from "react";
import ContentLoader from "react-content-loader";

const BooksLoader = (props: any) => {
  const cardsPerRow = 5;
  const rows = 6;
  const cardWidth = 200;
  const cardHeight = 280;
  const gapX = 30;
  const gapY = 50;

  const loaderRects = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cardsPerRow; col++) {
      const x = col * (cardWidth + gapX) + gapX;
      const y = row * (cardHeight + 55) + gapY;
      loaderRects.push(
        <React.Fragment key={`${row}-${col}`}>
          <rect
            x={x}
            y={y}
            rx="8"
            ry="8"
            width={cardWidth}
            height={cardHeight}
          />

          <rect
            x={x}
            y={y + cardHeight + 10}
            rx="0"
            ry="0"
            width={cardWidth}
            height="18"
          />
        </React.Fragment>,
      );
    }
  }

  return (
    <ContentLoader
      viewBox={`0 0 ${cardsPerRow * (cardWidth + gapX) + gapX} ${
        rows * (cardHeight + 55) + gapY
      }`}
      width="100%"
      height={rows * (cardHeight + 55) + gapY}
      {...props}
    >
      {loaderRects}
    </ContentLoader>
  );
};

export default BooksLoader;
