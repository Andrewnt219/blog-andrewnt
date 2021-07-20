import { paginate } from './convert-js-utils';

describe('paginate', () => {
  let animals: number[];
  let page, perPage: number;

  beforeEach(() => {
    animals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  });

  it('should return 3 items', () => {
    page = 1;
    perPage = 3;
    expect(paginate(animals, perPage, page)).toHaveLength(3);
  });

  it('should return empty when perPage < 0', () => {
    page = 1;
    perPage = -1;

    expect(paginate(animals, perPage, page)).toHaveLength(0);
  });

  it('should return empty when page = -1', () => {
    page = -1;
    perPage = 3;

    expect(paginate(animals, perPage, page)).toHaveLength(0);
  });

  it('should return [1, 2, 3] when page = 1', () => {
    page = 1;
    perPage = 3;

    expect(paginate(animals, perPage, page)).toStrictEqual([1, 2, 3]);
  });

  it('should return [4, 5, 6] when page = 2', () => {
    page = 2;
    perPage = 3;

    expect(paginate(animals, perPage, page)).toStrictEqual([4, 5, 6]);
  });
});
