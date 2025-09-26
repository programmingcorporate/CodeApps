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
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [newTag, setNewTag] = useState('');

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        status: 'New',
        priority: 'Medium',
        category: '',
        assignedTo: '',
        tags: [],
      });
      
      // Show success message briefly before closing and redirecting
      setTimeout(() => {
        setOpen(false);
        setShowSuccess(false);
        if (!issue) { // Only redirect for new issues
          navigate('/');
        }
      }, 1500);
    } catch (error) {
      console.error('Error submitting issue:', error);
      setErrors({ submit: 'Failed to submit issue. Please try again.' });
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
            {showSuccess && (
              <MessageBar intent="success">
                <MessageBarBody>
                  Issue {issue ? 'updated' : 'created'} successfully! Redirecting...
                </MessageBarBody>
              </MessageBar>
            )}
            
            {errors.submit && (
              <MessageBar intent="error">
                <MessageBarBody>{errors.submit}</MessageBarBody>
              </MessageBar>
            )}

            <Field 
              label="Title" 
              required 
              validationState={errors.title ? "error" : "none"}
              validationMessage={errors.title}
            >
              <Input
                value={formData.title}
                onChange={(_, data) => {
                  setFormData(prev => ({ ...prev, title: data.value }));
                  if (errors.title) {
                    setErrors(prev => ({ ...prev, title: '' }));
                  }
                }}
              />
            </Field>
            <Field 
              label="Description" 
              required
              validationState={errors.description ? "error" : "none"}
              validationMessage={errors.description}
            >
              <Textarea
                value={formData.description}
                onChange={(_, data) => {
                  setFormData(prev => ({ ...prev, description: data.value }));
                  if (errors.description) {
                    setErrors(prev => ({ ...prev, description: '' }));
                  }
                }}
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
            <Field 
              label="Category" 
              required
              validationState={errors.category ? "error" : "none"}
              validationMessage={errors.category}
            >
              <Input
                value={formData.category}
                onChange={(_, data) => {
                  setFormData(prev => ({ ...prev, category: data.value }));
                  if (errors.category) {
                    setErrors(prev => ({ ...prev, category: '' }));
                  }
                }}
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
