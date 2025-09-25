import { useState, useEffect } from 'react';
import {
  makeStyles,
  shorthands,
  Field,
  Input,
  Textarea,
  Select,
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  TagGroup,
  Tag,
  type TagGroupProps,
} from '@fluentui/react-components';
import type { Issue } from '../types/Issue';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    ...shorthands.padding('16px'),
    width: '100%',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    '@media (max-width: 480px)': {
      flexDirection: 'column-reverse',
      width: '100%',
      '& button': {
        width: '100%',
      },
    },
  },
  tagInput: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
});

interface IssueFormProps {
  issue?: Issue;
  onSubmit: (issue: Omit<Issue, 'id' | 'createdDate' | 'updatedDate'>) => Promise<void>;
  trigger?: React.ReactElement;
}

export const IssueForm = ({ issue, onSubmit, trigger }: IssueFormProps) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'New' as Issue['status'],
    priority: 'Medium' as Issue['priority'],
    category: '',
    assignedTo: '',
    tags: [] as string[],
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (issue) {
      setFormData({
        title: issue.title,
        description: issue.description,
        status: issue.status,
        priority: issue.priority,
        category: issue.category,
        assignedTo: issue.assignedTo || '',
        tags: issue.tags,
      });
    }
  }, [issue]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit(formData);
      setOpen(false);
      setFormData({
        title: '',
        description: '',
        status: 'New',
        priority: 'Medium',
        category: '',
        assignedTo: '',
        tags: [],
      });
    } catch (error) {
      console.error('Error submitting issue:', error);
      // Here you could show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag: TagGroupProps['onDismiss'] = (_, { value }) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== value),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={(_, { open }) => setOpen(open)}>
      <DialogTrigger disableButtonEnhancement>
        {trigger || <Button>Create New Issue</Button>}
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle>{issue ? 'Edit Issue' : 'Create New Issue'}</DialogTitle>
        <DialogBody>
          <div className={styles.form}>
            <Field label="Title" required>
              <Input
                value={formData.title}
                onChange={(_, data) =>
                  setFormData(prev => ({ ...prev, title: data.value }))
                }
              />
            </Field>
            <Field label="Description" required>
              <Textarea
                value={formData.description}
                onChange={(_, data) =>
                  setFormData(prev => ({ ...prev, description: data.value }))
                }
              />
            </Field>
            <Field label="Status">
              <Select
                value={formData.status}
                onChange={(_, data) =>
                  setFormData(prev => ({ ...prev, status: data.value as Issue['status'] }))
                }
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </Select>
            </Field>
            <Field label="Priority">
              <Select
                value={formData.priority}
                onChange={(_, data) =>
                  setFormData(prev => ({ ...prev, priority: data.value as Issue['priority'] }))
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </Select>
            </Field>
            <Field label="Category">
              <Input
                value={formData.category}
                onChange={(_, data) =>
                  setFormData(prev => ({ ...prev, category: data.value }))
                }
              />
            </Field>
            <Field label="Assigned To">
              <Input
                value={formData.assignedTo}
                onChange={(_, data) =>
                  setFormData(prev => ({ ...prev, assignedTo: data.value }))
                }
              />
            </Field>
            <Field label="Tags">
              <div className={styles.tagInput}>
                <Input
                  value={newTag}
                  onChange={(_, data) => setNewTag(data.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button onClick={handleAddTag}>Add</Button>
              </div>
              <TagGroup onDismiss={handleRemoveTag}>
                {formData.tags.map(tag => (
                  <Tag key={tag} value={tag} dismissible>
                    {tag}
                  </Tag>
                ))}
              </TagGroup>
            </Field>
          </div>
        </DialogBody>
        <DialogActions>
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="secondary">Cancel</Button>
          </DialogTrigger>
          <Button
            appearance="primary"
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.description}
          >
            {loading ? 'Saving...' : issue ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};
