import type { Issue } from '../types/Issue';
import type { PaginatedResult } from '../types/Pagination';

const DUMMY_ISSUES: Issue[] = Array.from({ length: 50 }, (_, index) => ({
  id: (index + 1).toString(),
  title: `Issue ${index + 1}`,
  description: `This is a detailed description for issue ${index + 1}. It contains multiple lines of text to demonstrate the content wrapping and display capabilities of our issue tracking system.`,
  status: ['New', 'In Progress', 'Resolved', 'Closed'][Math.floor(Math.random() * 4)] as Issue['status'],
  priority: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)] as Issue['priority'],
  createdDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  updatedDate: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString(),
  category: ['Bug', 'Feature', 'Enhancement', 'Documentation'][Math.floor(Math.random() * 4)],
  tags: Array.from(
    { length: Math.floor(Math.random() * 4) + 1 },
    () => ['frontend', 'backend', 'ui', 'api', 'database', 'testing', 'documentation'][Math.floor(Math.random() * 7)]
  ),
  assignedTo: ['John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Brown'][Math.floor(Math.random() * 4)],
}));

export class IssueService {
  private static instance: IssueService;
  private constructor() {}

  static getInstance(): IssueService {
    if (!IssueService.instance) {
      IssueService.instance = new IssueService();
    }
    return IssueService.instance;
  }

  async getIssues(
    page: number = 1, 
    pageSize: number = 10, 
    search?: string,
    filters: { status?: string; priority?: string } = {}
  ): Promise<PaginatedResult<Issue>> {
    try {
      let filteredIssues = [...DUMMY_ISSUES];

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filteredIssues = filteredIssues.filter(issue => 
          issue.title.toLowerCase().includes(searchLower) ||
          issue.description.toLowerCase().includes(searchLower) ||
          (issue.assignedTo?.toLowerCase() || '').includes(searchLower)
        );
      }

      // Apply status filter
      if (filters.status) {
        filteredIssues = filteredIssues.filter(issue => issue.status === filters.status);
      }

      // Apply priority filter
      if (filters.priority) {
        filteredIssues = filteredIssues.filter(issue => issue.priority === filters.priority);
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedItems = filteredIssues.slice(startIndex, endIndex);
      
      return {
        items: paginatedItems,
        totalItems: DUMMY_ISSUES.length,
        currentPage: page,
        pageSize: pageSize,
        totalPages: Math.ceil(DUMMY_ISSUES.length / pageSize),
      };
    } catch (error) {
      console.error('Error fetching issues:', error);
      throw error;
    }
  }

  async createIssue(issue: Omit<Issue, 'id' | 'createdDate' | 'updatedDate'>): Promise<Issue> {
    try {
      // For now, return mock data
      return {
        id: Math.random().toString(36).substr(2, 9),
        ...issue,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error creating issue:', error);
      throw error;
    }
  }

  async updateIssue(id: string, updates: Partial<Issue>): Promise<Issue> {
    try {
      const currentIssue = await this.getIssueById(id);
      if (!currentIssue) {
        throw new Error('Issue not found');
      }
      // For now, return mock data
      return {
        ...currentIssue,
        ...updates,
        updatedDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error updating issue:', error);
      throw error;
    }
  }

  async getIssueById(id: string): Promise<Issue | null> {
    try {
      const issue = DUMMY_ISSUES.find(issue => issue.id === id);
      return issue || null;
    } catch (error) {
      console.error('Error fetching issue:', error);
      throw error;
    }
  }
}

export const issueService = IssueService.getInstance();
