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
  Dropdown,
  DropdownOverlay,
  SelectInput,
  ActionList,
  ActionListItem,
  useToast,
} from '@razorpay/blade/components';
import type {
  CustomerGroup,
  PricingPlan,
  TemplateTerminology,
  EasyCollectionsAction,
  AddCustomerFormData,
  AddCustomerFormErrors,
} from './types';
import { generateId } from './data';

interface AddCustomerModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  groups: CustomerGroup[];
  pricingPlans: PricingPlan[];
  terminology: TemplateTerminology;
  dispatch: React.Dispatch<EasyCollectionsAction>;
}

const INITIAL_FORM: AddCustomerFormData = {
  name: '',
  contactName: '',
  email: '',
  phone: '',
  groupId: '',
  customerId: '',
  pricingPlanId: '',
  notes: '',
};

const AddCustomerModal = ({ isOpen, onDismiss, groups, pricingPlans, terminology, dispatch }: AddCustomerModalProps) => {
  const [formData, setFormData] = useState<AddCustomerFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<AddCustomerFormErrors>({});
  const toast = useToast();

  const updateField = <K extends keyof AddCustomerFormData>(field: K, value: AddCustomerFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof AddCustomerFormErrors]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field as keyof AddCustomerFormErrors];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: AddCustomerFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.customerId.trim()) {
      newErrors.customerId = `${terminology.customerId} is required`;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    dispatch({
      type: 'ADD_CUSTOMER',
      payload: {
        id: generateId('cust'),
        name: formData.name.trim(),
        contactName: formData.contactName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        customerId: formData.customerId.trim(),
        groupId: formData.groupId,
        pricingPlanId: formData.pricingPlanId || null,
        status: 'active',
        billingType: 'standard',
        enrollmentDate: formattedDate,
        totalDue: 0,
        totalPaid: 0,
        totalOverdue: 0,
        preferredChannel: 'whatsapp',
        customFields: {},
        familyLinkId: null,
        notes: formData.notes.trim(),
      },
    });

    toast.show({
      content: `${terminology.customer} added successfully`,
      color: 'positive',
    });

    resetAndClose();
  };

  const resetAndClose = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    onDismiss();
  };

  return (
    <Modal isOpen={isOpen} onDismiss={resetAndClose} size="large">
      <ModalHeader
        title={`Add ${terminology.customer}`}
        subtitle={`Add a new ${terminology.customer.toLowerCase()} to your collection`}
      />
      <ModalBody>
        <Box display="flex" flexDirection="column" gap="spacing.6">
          <TextInput
            label="Name"
            placeholder={`Enter ${terminology.customer.toLowerCase()} name`}
            value={formData.name}
            onChange={({ value }) => updateField('name', value ?? '')}
            validationState={errors.name ? 'error' : 'none'}
            errorText={errors.name}
            necessityIndicator="required"
          />

          <TextInput
            label="Contact Name"
            placeholder={`Enter ${terminology.contact.toLowerCase()} name`}
            value={formData.contactName}
            onChange={({ value }) => updateField('contactName', value ?? '')}
          />

          <TextInput
            label="Email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={({ value }) => updateField('email', value ?? '')}
            validationState={errors.email ? 'error' : 'none'}
            errorText={errors.email}
            type="email"
          />

          <TextInput
            label="Phone"
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={({ value }) => updateField('phone', value ?? '')}
            validationState={errors.phone ? 'error' : 'none'}
            errorText={errors.phone}
            type="telephone"
          />

          <TextInput
            label={terminology.customerId}
            placeholder={`Enter ${terminology.customerId.toLowerCase()}`}
            value={formData.customerId}
            onChange={({ value }) => updateField('customerId', value ?? '')}
            validationState={errors.customerId ? 'error' : 'none'}
            errorText={errors.customerId}
            necessityIndicator="required"
          />

          <Dropdown selectionType="single">
            <SelectInput
              label={terminology.group}
              placeholder={`Select ${terminology.group.toLowerCase()}`}
              value={formData.groupId}
              onChange={({ values }) => updateField('groupId', values[0] ?? '')}
            />
            <DropdownOverlay>
              <ActionList>
                {groups.map(group => (
                  <ActionListItem key={group.id} value={group.id} title={group.name} />
                ))}
              </ActionList>
            </DropdownOverlay>
          </Dropdown>

          <Dropdown selectionType="single">
            <SelectInput
              label="Pricing Plan"
              placeholder="Select pricing plan"
              value={formData.pricingPlanId}
              onChange={({ values }) => updateField('pricingPlanId', values[0] ?? '')}
            />
            <DropdownOverlay>
              <ActionList>
                {pricingPlans.map(plan => (
                  <ActionListItem
                    key={plan.id}
                    value={plan.id}
                    title={plan.name}
                    description={plan.description}
                  />
                ))}
              </ActionList>
            </DropdownOverlay>
          </Dropdown>

          <TextArea
            label="Notes"
            placeholder="Any additional notes"
            value={formData.notes}
            onChange={({ value }) => updateField('notes', value ?? '')}
            maxCharacters={500}
          />
        </Box>
      </ModalBody>
      <ModalFooter>
        <Box display="flex" justifyContent="flex-end" gap="spacing.4" width="100%">
          <Button variant="tertiary" onClick={resetAndClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add {terminology.customer}
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};

export default AddCustomerModal;
