import { ReactElement, useEffect, useCallback, useState } from 'react';
import { Form, Field, FieldRenderProps } from 'react-final-form';
import { Button, ButtonGroup, TextField, MenuItem } from '@material-ui/core';
import { fetchUser, updateUser, selectProfileData } from './profileSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './Profile.module.css';

const countries = [
  {
    label: 'Australia',
    value: 'Australia',
  },
  {
    label: 'Switzerland',
    value: 'Switzerland',
  },
  {
    label: 'Denmark',
    value: 'Denmark ',
  },
  {
    label: 'Spain',
    value: 'Spain ',
  },
];

const Profile = () => {
  const dispatch = useAppDispatch();
  const profileData = useAppSelector(selectProfileData);
  const [emailFieldsCount, setEmailFieldsCount] = useState<number>(1);
  const [phoneFieldsCount, setPhoneFieldsCount] = useState<number>(1);

  const renderFieldItem = useCallback(
    ({ input, label, select = false, index }) =>
      !select ? (
        <TextField
          fullWidth
          key={index}
          label={label}
          InputLabelProps={{ shrink: !!input.value }}
          variant='outlined'
          size='small'
          {...input}
          style={{ margin: '0 5px 5px' }}
        />
      ) : (
        <TextField
          select
          key={index}
          label={label}
          InputLabelProps={{ shrink: !!input.value }}
          variant='outlined'
          size='small'
          fullWidth
          {...input}
          style={{ margin: '0 5px 5px' }}
        >
          {countries.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ),
    []
  );

  const addRemoveFields = useCallback(
    (type: string, count: number) => () => {
      (type === 'email' ? setEmailFieldsCount : setPhoneFieldsCount)(count);
    },
    []
  );

  const getNewInput = useCallback((input, i): FieldRenderProps<string> => {
    const inputChangeHandler = input.onChange;

    return {
      ...input,
      onChange: (e: { target: { value: any; }; }) => {
        const newData = [...input.value];
        newData.splice(i - 1, 1, e.target.value);
        inputChangeHandler(newData);
      },
      value: input.value[i - 1] || '',
    };
  }, []);

  const getFieldsByCount = useCallback(
    (count: number, label: string) => ({
      input,
    }: FieldRenderProps<Array<string>>): ReactElement[] => {
      const fieldsArr: ReactElement[] = [];

      for (let i = 1; i <= count; i++) {
        const newInput = getNewInput(input, i);
        fieldsArr.push(renderFieldItem({ input: newInput, label, index: i }));
      }

      return fieldsArr;
    },
    [renderFieldItem, getNewInput]
  );

  const submitHandler = useCallback((data) => {
    dispatch(updateUser(data));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.container}>
          <div className={styles.profile}>
            <div className={styles.profileInner}>
              <img alt='avatar' src={profileData?.avatar} />
              <p>{`${profileData?.firstName} ${profileData?.lastName}`}</p>
              <p>{profileData?.gender}</p>
            </div>
          </div>
          <div className={styles.edit}>
            <div className={styles.editSection}>
              <h3>Edit Profile</h3>
              <Form
                initialValues={profileData}
                onSubmit={submitHandler}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.names}>
                      <Field name='firstName' label='First name' render={renderFieldItem} />
                      <Field name='lastName' label='Last name' render={renderFieldItem} />
                    </div>
                    <div className={styles.location}>
                      <Field
                        someArbitraryOtherProp={42}
                        name='city'
                        label='City'
                        render={renderFieldItem}
                      />
                      <Field name='address' label='Address' render={renderFieldItem} />
                    </div>
                    <div className={styles.country}>
                      <Field name='postcode' label='Postal Code' render={renderFieldItem} />
                      <Field select name='country' label='Country' render={renderFieldItem} />
                    </div>
                    <div>
                      <div className={styles.emailWrapper}>
                        <div className={styles.emailButtons}>
                          <ButtonGroup variant='contained' fullWidth>
                            <Button
                              color='primary'
                              disabled={emailFieldsCount === 5}
                              onClick={addRemoveFields('email', emailFieldsCount + 1)}
                            >
                              Add
                            </Button>
                            <Button
                              color='secondary'
                              disabled={emailFieldsCount === 1}
                              onClick={addRemoveFields('email', emailFieldsCount - 1)}
                            >
                              Remove
                            </Button>
                          </ButtonGroup>
                        </div>
                        <div className={styles.emailFields}>
                          <Field name='emails' render={getFieldsByCount(emailFieldsCount, 'Email')} />
                        </div>
                      </div>
                      <div className={styles.emailWrapper}>
                        <div className={styles.emailButtons}>
                          <ButtonGroup variant='contained' fullWidth>
                            <Button
                              color='primary'
                              disabled={phoneFieldsCount === 5}
                              onClick={addRemoveFields('phone', phoneFieldsCount + 1)}
                            >
                              Add
                            </Button>
                            <Button
                              color='secondary'
                              disabled={phoneFieldsCount === 1}
                              onClick={addRemoveFields('phone', phoneFieldsCount - 1)}
                            >
                              Remove
                            </Button>
                          </ButtonGroup>
                        </div>
                        <div className={styles.emailFields}>
                          <Field name='phones' render={getFieldsByCount(phoneFieldsCount, 'Phone')} />
                        </div>
                      </div>
                    </div>
                    <Button variant='contained' color='primary' type='submit'>
                      Update profile
                    </Button>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
