import React from "react";
import ContentLoader from "react-content-loader";

const BooksLoader = (props: any) => {
  const cardsPerRow = 5; // 5 карточек в ряд
  const rows = 6; // всего 6 рядов → 6 * 5 = 30 карточек
  const cardWidth = 200;
  const cardHeight = 280;
  const gapX = 30; // горизонтальный отступ между карточками
  const gapY = 50; // вертикальный отступ между рядами

  const loaderRects = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cardsPerRow; col++) {
      const x = col * (cardWidth + gapX) + gapX;
      const y = row * (cardHeight + 55) + gapY; // 55 = card title + subtitle
      loaderRects.push(
        <React.Fragment key={`${row}-${col}`}>
          {/* сам блок книги */}
          <rect
            x={x}
            y={y}
            rx="8"
            ry="8"
            width={cardWidth}
            height={cardHeight}
          />
          {/* название */}
          <rect
            x={x}
            y={y + cardHeight + 10}
            rx="0"
            ry="0"
            width={cardWidth}
            height="18"
          />
          {/* подзаголовок */}
          {/* <rect
            x={x}
            y={y + cardHeight + 35}
            rx="0"
            ry="0"
            width={cardWidth / 2}
            height="20"
          /> */}
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
