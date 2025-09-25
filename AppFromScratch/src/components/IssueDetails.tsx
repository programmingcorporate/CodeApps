import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  makeStyles,
  shorthands,
  Title3,
  Card,
  CardHeader,
  Button,
  Text,
  Badge,
  Label,
  TagGroup,
  Tag,
} from '@fluentui/react-components';
import { Delete24Regular, Edit24Regular } from '@fluentui/react-icons';
import { IssueForm } from './IssueForm';
import type { Issue } from '../types/Issue';
import { issueService } from '../services/IssueService';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    ...shorthands.padding('20px'),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '16px',
  },
  fieldLabel: {
    fontWeight: 'bold',
  },
  metadata: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
  },
  metadataItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
});

export const IssueDetails = () => {
  const styles = useStyles();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIssue = async () => {
      try {
        if (!id) {
          throw new Error('Issue ID is required');
        }
        const issueData = await issueService.getIssueById(id);
        if (!issueData) {
          throw new Error('Issue not found');
        }
        setIssue(issueData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load issue');
      } finally {
        setLoading(false);
      }
    };
    loadIssue();
  }, [id]);

  const handleUpdate = async (updatedIssue: Omit<Issue, 'id' | 'createdDate' | 'updatedDate'>) => {
    try {
      if (!issue) return;
      const updated = await issueService.updateIssue(issue.id, updatedIssue);
      setIssue(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update issue');
    }
  };

  const handleDelete = async () => {
    try {
      if (!issue) return;
      // await issueService.deleteIssue(issue.id);
      navigate('/issues');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete issue');
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error || !issue) {
    return <div className={styles.container}>{error || 'Issue not found'}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title3>{issue.title}</Title3>
        <div className={styles.actions}>
          <IssueForm
            issue={issue}
            onSubmit={handleUpdate}
            trigger={
              <Button icon={<Edit24Regular />} appearance="subtle">
                Edit
              </Button>
            }
          />
          <Button
            icon={<Delete24Regular />}
            appearance="subtle"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader header={<Label>Details</Label>} />
        <div className={styles.metadata}>
          <div className={styles.metadataItem}>
            <Text weight="semibold">Status</Text>
            <Badge appearance="filled" color={issue.status === 'Resolved' ? 'success' : undefined}>
              {issue.status}
            </Badge>
          </div>
          <div className={styles.metadataItem}>
            <Text weight="semibold">Priority</Text>
            <Badge appearance="filled" color={
              issue.priority === 'Critical' ? 'danger' :
              issue.priority === 'High' ? 'warning' :
              undefined
            }>
              {issue.priority}
            </Badge>
          </div>
          <div className={styles.metadataItem}>
            <Text weight="semibold">Category</Text>
            <Text>{issue.category}</Text>
          </div>
          {issue.assignedTo && (
            <div className={styles.metadataItem}>
              <Text weight="semibold">Assigned To</Text>
              <Text>{issue.assignedTo}</Text>
            </div>
          )}
        </div>

        <div className={styles.field}>
          <Text weight="semibold">Description</Text>
          <Text>{issue.description}</Text>
        </div>

        {issue.tags && issue.tags.length > 0 && (
          <div className={styles.field}>
            <Text weight="semibold">Tags</Text>
            <TagGroup>
              {issue.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagGroup>
          </div>
        )}

        <div className={styles.metadata}>
          <div className={styles.metadataItem}>
            <Text weight="semibold">Created</Text>
            <Text>{new Date(issue.createdDate).toLocaleString()}</Text>
          </div>
          <div className={styles.metadataItem}>
            <Text weight="semibold">Last Updated</Text>
            <Text>{new Date(issue.updatedDate).toLocaleString()}</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};
