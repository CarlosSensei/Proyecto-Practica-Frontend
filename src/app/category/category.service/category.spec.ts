import { Category } from '../model/category';

describe('Category', () => {
  let service: Category;

  beforeEach(() => {
    service = {} as Category;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
