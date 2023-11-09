import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabin, onClose }) {
  const isEditMode = Boolean(cabin);
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditMode ? cabin : null,
  });

  const formSubmitHandler = (data) => {
    if (isEditMode) {
      const { id, ...cabinData } = data;
      editCabin({ id, data: cabinData }, { onSuccess: () => onClose?.() });
    } else {
      createCabin(data, { onSuccess: () => onClose?.() });
    }
  };

  const onError = (errors) => null;

  const cancelFormHandler = (e) => {
    e.preventDefault();

    onClose?.();
  };

  const isPending = isCreating || isEditing;

  return (
    <Form
      type={Boolean(onClose) ? 'modal' : 'regular'}
      onSubmit={handleSubmit(formSubmitHandler, onError)}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isPending}
          type="text"
          id="name"
          {...register('name', { required: 'Cabin name should be provided' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isPending}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'Maximum capacity should be provided',
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isPending}
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'Regular price should be provided',
            min: {
              value: 1,
              message: 'Regular price should be greater than 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isPending}
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'Discount should be provided',
            validate: (value) => {
              if (
                Boolean(getValues().regularPrice) &&
                Number(value) >= Number(getValues().regularPrice)
              ) {
                return 'Discount should be less than regular price';
              }
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isPending}
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'Description should be provided',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          disabled={isPending}
          id="image"
          accept="image/*"
          {...register('image')}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="button" onClick={cancelFormHandler}>
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditMode ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
