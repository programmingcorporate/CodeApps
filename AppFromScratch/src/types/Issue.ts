export interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'New' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  createdDate: string;
  updatedDate: string;
  assignedTo?: string;
  category: string;
  tags: string[];
}

export type IssueFilters = {
  status?: Issue['status'];
  priority?: Issue['priority'];
  category?: string;
  searchQuery?: string;
}
