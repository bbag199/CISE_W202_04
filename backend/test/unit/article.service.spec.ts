import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from '../../src/api/article/article.service'; // Adjust path if needed
import { getModelToken } from '@nestjs/mongoose';
import { Article } from '../../src/api/article/article.schema'; // Adjust path if needed
import { NotFoundException } from '@nestjs/common';

describe('ArticleService', () => {
  let service: ArticlesService;

  // Create a simple mock for the Article model
  const mockArticleModel = {
    countDocuments: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
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

  it('should return a test string', () => {
    expect(service.test()).toBe('article route testing');
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

  it('should add a new rating to the article', async () => {
    const id = 'someId';
    const newRating = 5;
    const mockArticle = { _id: id, rating: [4], save: jest.fn() };
    mockArticleModel.findById.mockResolvedValue(mockArticle);

    const result = await service.addRating(id, newRating);
    expect(result.rating).toEqual([4, newRating]);
    expect(mockArticle.save).toHaveBeenCalled();
  });

  it('should throw NotFoundException if article does not exist', async () => {
    const id = 'nonExistentId';
    mockArticleModel.findById.mockResolvedValue(null);

    await expect(service.addRating(id, 5)).rejects.toThrow(NotFoundException);
  });
});
