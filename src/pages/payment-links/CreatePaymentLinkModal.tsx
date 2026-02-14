import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Button,
  TextInput,
  TextArea,
  Switch,
  Heading,
  Divider,
} from '@razorpay/blade/components';
import type { CreatePaymentLinkFormData, FormErrors, PaymentLink } from './types';
import { INITIAL_FORM_DATA, generateId, generateShortUrl, formatDate } from './data';

interface CreatePaymentLinkModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onCreateLink: (link: PaymentLink) => void;
}

const CreatePaymentLinkModal = ({ isOpen, onDismiss, onCreateLink }: CreatePaymentLinkModalProps) => {
  const [formData, setFormData] = useState<CreatePaymentLinkFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = <K extends keyof CreatePaymentLinkFormData>(
    field: K,
    value: CreatePaymentLinkFormData[K],
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0 || isNaN(parseFloat(formData.amount))) {
      newErrors.amount = 'Enter a valid amount greater than 0';
    }
    if (formData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Enter a valid email address';
    }
    if (formData.customerPhone && !/^\d{10}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'Enter a valid 10-digit phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const now = new Date();
    const newLink: PaymentLink = {
      id: generateId(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      amount: Math.round(parseFloat(formData.amount) * 100) / 100,
      status: 'active',
      created: formatDate(now),
      createdAt: now,
      views: 0,
      paid: 0,
      shortUrl: generateShortUrl(formData.title),
      expiryDate: formData.expiryDate?.toISOString() ?? null,
      partialPayments: formData.partialPayments,
      customer: {
        name: formData.customerName.trim(),
        email: formData.customerEmail.trim(),
        phone: formData.customerPhone.trim(),
      },
      notes: formData.notes.trim(),
    };

    onCreateLink(newLink);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  const handleDismiss = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    onDismiss();
  };

  return (
    <Modal isOpen={isOpen} onDismiss={handleDismiss} size="large">
      <ModalHeader title="Create Payment Link" subtitle="Generate a shareable link to collect payments" />
      <ModalBody>
        <Box display="flex" flexDirection="column" gap="spacing.6">
          <TextInput
            label="Title"
            placeholder="e.g. Course Registration Fee"
            value={formData.title}
            onChange={({ value }) => updateField('title', value ?? '')}
            validationState={errors.title ? 'error' : 'none'}
            errorText={errors.title}
            necessityIndicator="required"
          />

          <TextArea
            label="Description"
            placeholder="Brief description of what this payment is for"
            value={formData.description}
            onChange={({ value }) => updateField('description', value ?? '')}
            maxCharacters={500}
          />

          <TextInput
            label="Amount (INR)"
            placeholder="0.00"
            value={formData.amount}
            onChange={({ value }) => updateField('amount', value ?? '')}
            validationState={errors.amount ? 'error' : 'none'}
            errorText={errors.amount}
            type="number"
            necessityIndicator="required"
          />

          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Heading size="small">Partial Payments</Heading>
            </Box>
            <Switch
              accessibilityLabel="Enable partial payments"
              isChecked={formData.partialPayments}
              onChange={({ isChecked }) => updateField('partialPayments', isChecked)}
            />
          </Box>

          <Divider />

          <Heading size="small">Customer Details (Optional)</Heading>

          <TextInput
            label="Customer Name"
            placeholder="Enter customer name"
            value={formData.customerName}
            onChange={({ value }) => updateField('customerName', value ?? '')}
          />

          <TextInput
            label="Email"
            placeholder="customer@example.com"
            value={formData.customerEmail}
            onChange={({ value }) => updateField('customerEmail', value ?? '')}
            validationState={errors.customerEmail ? 'error' : 'none'}
            errorText={errors.customerEmail}
            type="email"
          />

          <TextInput
            label="Phone"
            placeholder="10-digit mobile number"
            value={formData.customerPhone}
            onChange={({ value }) => updateField('customerPhone', value ?? '')}
            validationState={errors.customerPhone ? 'error' : 'none'}
            errorText={errors.customerPhone}
            type="telephone"
          />

          <Divider />

          <TextArea
            label="Notes"
            placeholder="Any additional notes for this payment link"
            value={formData.notes}
            onChange={({ value }) => updateField('notes', value ?? '')}
            maxCharacters={200}
          />
        </Box>
      </ModalBody>
      <ModalFooter>
        <Box display="flex" justifyContent="flex-end" gap="spacing.4" width="100%">
          <Button variant="tertiary" onClick={handleDismiss}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Payment Link
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};

export default CreatePaymentLinkModal;
