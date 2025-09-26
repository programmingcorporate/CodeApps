import { useState, useEffect } from 'react';
import {
  makeStyles,
  shorthands,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableCellLayout,
  Input,
  Select,
  Badge,
  Card,
  CardHeader,
  Body1,
  Caption1,
  Button,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { Search20Regular } from '@fluentui/react-icons';
import type { Issue, IssueFilters, SortField, SortDirection } from '../types/Issue';
import type { PaginatedResult } from '../types/Pagination';
import { useNavigate } from 'react-router-dom';
import { issueService } from '../services/IssueService';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    ...shorthands.padding('20px'),
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  filtersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  filterGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
    flex: 1,
  },
  table: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  cardList: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
  },
  card: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  badge: {
    ...shorthands.borderRadius('12px'),
    ...shorthands.padding('2px', '8px'),
  },
  new: { backgroundColor: '#e6f4ff', color: '#0078d4' },
  inProgress: { backgroundColor: '#fff4e6', color: '#d97706' },
  resolved: { backgroundColor: '#e6ffec', color: '#16a34a' },
  closed: { backgroundColor: '#f3f4f6', color: '#4b5563' },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginTop: '20px',
  },
  pageInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
});



export const IssueList = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  // Default sort configuration
  const defaultSortConfig = {
    field: 'createdDate' as SortField,
    direction: 'desc' as SortDirection
  };

  const [filters, setFilters] = useState<IssueFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [paginatedData, setPaginatedData] = useState<PaginatedResult<Issue> | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState(defaultSortConfig);

  const handleClearAll = () => {
    setFilters({});
    setSearchQuery('');
    setCurrentPage(1);
    setSortConfig(defaultSortConfig);
  };

  const handleSort = (field: SortField) => {
    // Reset to first page when sorting
    setCurrentPage(1);
    
    setSortConfig(prevConfig => ({
      field,
      direction: prevConfig.field === field && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  useEffect(() => {
    const loadIssues = async () => {
      try {
        setLoading(true);
        const result = await issueService.getIssues(
          currentPage,
          pageSize,
          searchQuery,
          {
            ...filters,
            sortBy: sortConfig.field,
            sortDirection: sortConfig.direction
          }
        );
        setPaginatedData(result);
      } catch (error) {
        console.error('Error loading issues:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Add debounce for search
    const timer = setTimeout(() => {
      loadIssues();
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [currentPage, pageSize, searchQuery, filters, sortConfig]);

  const handleIssueClick = (issueId: string) => {
    navigate(`/issue/${issueId}`);
  };

  const renderStatusBadge = (status: Issue['status']) => {
    const badgeStyle = {
      New: styles.new,
      'In Progress': styles.inProgress,
      Resolved: styles.resolved,
      Closed: styles.closed,
    }[status];

    return (
      <Badge className={`${styles.badge} ${badgeStyle}`}>
        {status}
      </Badge>
    );
  };

  if (loading || !paginatedData) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.filtersContainer}>
        <div className={styles.filterGroup}>
          <Input
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(_, data) => setSearchQuery(data.value)}
            contentBefore={<Search20Regular />}
          />
          <Select
            value={filters.status || ''}
            onChange={(_, data) => setFilters(prev => ({ ...prev, status: data.value as Issue['status'] }))}
          >
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </Select>
          <Select
            value={filters.priority || ''}
            onChange={(_, data) => setFilters(prev => ({ ...prev, priority: data.value as Issue['priority'] }))}
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </Select>
        </div>
        
        <Button
          appearance="secondary"
          icon={<Dismiss24Regular />}
          onClick={handleClearAll}
          disabled={!searchQuery && Object.keys(filters).length === 0 && 
            sortConfig.field === defaultSortConfig.field && 
            sortConfig.direction === defaultSortConfig.direction}
        >
          Clear All
        </Button>
      </div>

      {/* Desktop Table View */}
      <Table className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell 
              onClick={() => handleSort('title')}
              style={{ cursor: 'pointer' }}
            >
              Title {sortConfig.field === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHeaderCell>
            <TableHeaderCell 
              onClick={() => handleSort('status')}
              style={{ cursor: 'pointer' }}
            >
              Status {sortConfig.field === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHeaderCell>
            <TableHeaderCell 
              onClick={() => handleSort('priority')}
              style={{ cursor: 'pointer' }}
            >
              Priority {sortConfig.field === 'priority' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHeaderCell>
            <TableHeaderCell 
              onClick={() => handleSort('category')}
              style={{ cursor: 'pointer' }}
            >
              Category {sortConfig.field === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHeaderCell>
            <TableHeaderCell 
              onClick={() => handleSort('assignedTo')}
              style={{ cursor: 'pointer' }}
            >
              Created By {sortConfig.field === 'assignedTo' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHeaderCell>
            <TableHeaderCell 
              onClick={() => handleSort('createdDate')}
              style={{ cursor: 'pointer' }}
            >
              Created Date {sortConfig.field === 'createdDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.items.map(issue => (
            <TableRow key={issue.id} onClick={() => handleIssueClick(issue.id)}>
              <TableCell>
                <TableCellLayout>{issue.title}</TableCellLayout>
              </TableCell>
              <TableCell>{renderStatusBadge(issue.status)}</TableCell>
              <TableCell>{issue.priority}</TableCell>
              <TableCell>{issue.category}</TableCell>
              <TableCell>{issue.assignedTo}</TableCell>
              <TableCell>
                {new Date(issue.createdDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Mobile Card View */}
      <div className={styles.cardList}>
        {paginatedData.items.map(issue => (
          <Card
            key={issue.id}
            className={styles.card}
            onClick={() => handleIssueClick(issue.id)}
          >
            <CardHeader
              header={<Body1>{issue.title}</Body1>}
              description={
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {renderStatusBadge(issue.status)}
                  <Caption1>{issue.priority} Priority</Caption1>
                  <Caption1>•</Caption1>
                  <Caption1>{new Date(issue.createdDate).toLocaleDateString()}</Caption1>
                </div>
              }
            />
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <Button
          appearance="subtle"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className={styles.pageInfo}>
          <span>Page {currentPage} of {paginatedData.totalPages}</span>
          <span>({paginatedData.totalItems} total)</span>
        </div>
        <Button
          appearance="subtle"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, paginatedData.totalPages))}
          disabled={currentPage === paginatedData.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
