import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from '../../src/api/article/article.service'; // Adjust path if needed
import { getModelToken } from '@nestjs/mongoose';
import { Article } from '../../src/api/article/article.schema'; // Adjust path if needed

describe('ArticleService', () => {
  let service: ArticlesService;

  // Create a simple mock for the Article model
  const mockArticleModel = {
    countDocuments: jest.fn(), // Mock countDocuments method
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getModelToken(Article.name), // Provide the mock model
          useValue: mockArticleModel,
        },
      ],
    }).compile();
    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should return a count of articles that are "Moderated"', async () => {
    // Given
    const selectedStatus = 'Moderated'; // The status we are checking for
    const expectedCount = 10; // Example count we want to test
    mockArticleModel.countDocuments.mockReturnValue({
      exec: jest.fn().mockResolvedValue(expectedCount), // Mock exec to return expected count
    });

    // When
    const count = await service.count(selectedStatus); // Call the count method

    // Then
    expect(count).toBe(expectedCount); // Check if the returned count matches
  });

  

});
