import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();
  const {
    minBookingLength,
    maxBookingLength,
    maxGusetPerBooking,
    breakfastPrice,
  } = settings;

  if (isLoading) {
    return <Spinner />;
  }

  const updateSettingHandler = (value, settingName) => {
    updateSetting({
      [settingName]: value,
    });
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) =>
            updateSettingHandler(e.target.value, 'minBookingLength')
          }
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) =>
            updateSettingHandler(e.target.value, 'maxBookingLength')
          }
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGusetPerBooking}
          disabled={isUpdating}
          onBlur={(e) =>
            updateSettingHandler(e.target.value, 'maxGusetPerBooking')
          }
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => updateSettingHandler(e.target.value, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
