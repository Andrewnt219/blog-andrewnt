import type {
  UsePaginationItem,
  UsePaginationProps,
} from '@hooks/useMuiPagination';
import usePagination from '@hooks/useMuiPagination';
import React, { ReactElement } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import tw, { styled } from 'twin.macro';
type Props = {
  total: number;
  perPage?: number;
  usePaginationProps?: Omit<UsePaginationProps, 'count'>;
  onItemClicked(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    currentPage: number
  ): void;
  className?: string;
};

function Pagination({
  className,
  onItemClicked,
  total,
  perPage = 1,
  usePaginationProps,
}: Props) {
  // passing in `items` doesn't work properly
  const { items } = usePagination({
    count: Math.ceil(total / perPage),
    ...usePaginationProps,
  });
  const buttons = renderControllers(items, onItemClicked);
  const prevButton = buttons.shift();
  const nextButton = buttons.pop();

  return (
    <nav aria-label="Page Pagination" className={className} tw="w-min">
      <ul aria-label="arrow buttons" tw="flex items-baseline gap-sm">
        {buttons}
      </ul>
    </nav>
  );
}

// Render all the pagination controllers
function renderControllers(
  items: UsePaginationItem[],
  onClick: Props['onItemClicked']
): ReactElement[] {
  return items.map(({ page, type, onClick: onMuiClick, ...item }, index) => {
    let children = null;

    const handleItemClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      onMuiClick(event);
      onClick && onClick(event, page);
    };

    switch (type) {
      case 'start-ellipsis':
      case 'end-ellipsis':
        children = (
          <Button aria-hidden tabIndex={-1} isEllipsis {...item}>
            ...
          </Button>
        );
        break;

      case 'page':
        children = (
          <Button
            aria-label={
              item.selected
                ? `Current page, Page ${page}`
                : `Go to page ${page}`
            }
            onClick={handleItemClick}
            {...item}
          >
            {page}
          </Button>
        );
        break;

      case 'next':
        children = (
          <Control
            aria-disabled={item.disabled}
            onClick={handleItemClick}
            {...item}
          >
            <RiArrowRightSLine title="Go to next page" />
          </Control>
        );
        break;

      case 'previous':
        children = (
          <Control
            aria-disabled={item.disabled}
            disabled={item.disabled}
            onClick={handleItemClick}
          >
            <RiArrowLeftSLine title="Go to previous page" />
          </Control>
        );
        break;

      default:
        children = (
          <Button onClick={handleItemClick} {...item}>
            {type}
          </Button>
        );
        break;
    }

    return <li key={index}>{children}</li>;
  });
}

// TODO fix focus/hover on mobile
type ButtonProps = {
  selected?: boolean;
  isEllipsis?: boolean;
};

const Control = styled.button<ButtonProps>``;

const Button = styled.button<ButtonProps>`
  ${(p) => p.isEllipsis && tw`bg-transparent pointer-events-none`}
  ${(p) => p.selected && tw`text-primary underline`}

  &:hover {
    ${tw`text-primary text-opacity-80`}
  }
`;

export default Pagination;
