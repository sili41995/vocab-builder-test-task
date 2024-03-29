import { InputTypes, Messages, PagePaths, regExp } from '@/constants';
import { FC, useEffect, useState } from 'react';
import { LuEyeOff, LuEye } from 'react-icons/lu';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Credentials } from '@/types/types';
import {
  Description,
  Form,
  InputsContainer,
  ShowPassBtn,
  Title,
} from './LogInForm.styled';
import AuthFormInput from '@/components/AuthFormInput';
import { toasts } from '@/utils';
import AuthFormControls from '@/components/AuthFormControls';
import { signIn } from '@/redux/auth/operations';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoading } from '@/redux/auth/selectors';

const LogInForm: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectIsLoading);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<Credentials>();
  const passInputType = showPassword ? InputTypes.text : InputTypes.password;
  const showPassBtnIcon = showPassword ? (
    <LuEye size={20} />
  ) : (
    <LuEyeOff size={20} />
  );

  useEffect(() => {
    errors.email &&
      toasts.errorToast(
        errors.email.type === 'required'
          ? Messages.emailReqErr
          : Messages.emailRegExpErr
      );
    errors.password &&
      toasts.errorToast(
        errors.password.type === 'required'
          ? Messages.passReqErr
          : Messages.passRegExpErr
      );
  }, [isSubmitting, errors]);

  const onShowPassBtnClick = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleFormSubmit: SubmitHandler<Credentials> = (data) => {
    dispatch(signIn(data))
      .unwrap()
      .then(() => {
        toasts.successToast(Messages.greetings);
        navigate(PagePaths.dictionary);
      })
      .catch((error) => {
        toasts.errorToast(error);
      });
  };

  return (
    <>
      <Title>Login</Title>
      <Description>
        Please enter your login details to continue using our service:
      </Description>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputsContainer>
          <AuthFormInput
            type={InputTypes.email}
            settings={{
              ...register('email', {
                required: true,
                pattern: regExp.email,
              }),
            }}
            placeholder='Email'
          />
          <AuthFormInput
            type={passInputType}
            settings={{
              ...register('password', {
                required: true,
                pattern: regExp.password,
              }),
            }}
            placeholder='Password'
            button={
              <ShowPassBtn type='button' onClick={onShowPassBtnClick}>
                {showPassBtnIcon}
              </ShowPassBtn>
            }
          />
        </InputsContainer>
        <AuthFormControls
          navLinkPath={PagePaths.register}
          navLinkTitle='Register'
          submitBtnDisabled={isLoading}
          submitBtnTitle='Login'
        />
      </Form>
    </>
  );
};

export default LogInForm;
