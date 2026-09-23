import { CategoryService } from '../category.service/category.service';

describe('Category', () => {
  let service: CategoryService;

  beforeEach(() => {
    service = {} as CategoryService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
