import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doSignUp } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from './SignUpForm.styles';
import { Col, Radio, Row } from 'antd';
import { DayjsDatePicker } from '@app/components/common/pickers/DayjsDatePicker';
import dayjs from 'dayjs';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

interface SignUpFormData {
  "Name": string,
  "Phone": string,
  "Email": string,
  "Gender": number,
  "DoB": string,
  "password": string,
  "confirmPassword": string,
}
const ClientID = "122068012715-mr0gurvo72c3qveo7ntrcq3h3fq1h6sa.apps.googleusercontent.com"

const initValues = {
  Name: "Hoang Nam",
  Phone: "0123456789",
  Gender: 0,
  Email: 'chris.johnson@altence.com',
  password: 'AFMhn17397',
  confirmPassword: 'AFMhn17397',
  termOfUse: true,
};

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const { t } = useTranslation();
  const [form] = BaseForm.useForm();

  

  const handleSubmit = (values: SignUpFormData) => {
    values['DoB'] = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    console.log(values)
    setLoading(true);
    dispatch(doSignUp(values))
      .unwrap()
      .then(() => {
        notificationController.success({
          message: t('auth.signUpSuccessMessage'),
          description: t('auth.signUpSuccessDescription'),
        });
        navigate('/auth/login');
      })
      .catch((err) => {
        notificationController.error({ message: err.message });
        setLoading(false);
      });
  };

  return (
    <Auth.FormWrapper>
      <BaseForm form={form} layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initValues}>
        <S.Title>{t('common.signUp')}</S.Title>
        <Auth.FormItem
          name="Name"
          label={t('forms.register.name')}
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInput placeholder={t('forms.register.name')} />
        </Auth.FormItem>
        <Auth.FormItem
          name="Phone"
          label={t('forms.register.phone')}
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInput placeholder={t('forms.register.phone')} />
        </Auth.FormItem>
        <Auth.FormItem
          name="Email"
          label={t('common.email')}
          rules={[
            { required: true, message: t('common.requiredField') },
            {
              type: 'email',
              message: t('common.notValidEmail'),
            },
          ]}
        >
          <Auth.FormInput placeholder={t('common.email')} />
        </Auth.FormItem>
        <Row gutter={[20, 20]}>
          <Col sm={24} md={12}>
            <Auth.FormItem
              name="Gender"
              label={t('forms.register.gender.title')}
              rules={[
                { required: true, message: t('common.requiredField') }
              ]}
            >
              <Radio.Group>
                <Radio value={0} >{t('forms.register.gender.female')}</Radio>
                <Radio value={1} >{t('forms.register.gender.male')}</Radio>
              </Radio.Group>
            </Auth.FormItem>
          </Col>
          <Col sm={24} md={12}>
            <Auth.FormItem
              name="DoB"
              label={t('forms.register.dob.title')}
              rules={[{ required: true, message: t('common.requiredField') }
                , ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (dayjs(value).get('year') < 2007) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('forms.register.dob.err')));
                  }
                })]}
            >
              <DayjsDatePicker picker='date' placeholder={t('forms.register.dob.title')} />
            </Auth.FormItem>
          </Col>
        </Row>
        <Auth.FormItem
          label={t('common.password')}
          name="password"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInputPassword placeholder={t('common.password')} />
        </Auth.FormItem>
        <Auth.FormItem
          name="confirmPassword"
          label={t('common.confirmPassword')}
          dependencies={['password']}
          rules={[
            { required: true, message: t('common.requiredField') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('common.confirmPasswordError')));
              },
            }),
          ]}
        >
          <Auth.FormInputPassword placeholder={t('common.confirmPassword')} />
        </Auth.FormItem>
        <Auth.ActionsWrapper>
          {/* name="termOfUse" */}
          <BaseForm.Item valuePropName="checked" noStyle>
            <Auth.FormCheckbox>
              <Auth.Text>
                {t('signup.agree')}{' '}
                <Link to="/" target={'_blank'}>
                  <Auth.LinkText>{t('signup.termOfUse')}</Auth.LinkText>
                </Link>{' '}
                and{' '}
                <Link to="/" target={'_blank'}>
                  <Auth.LinkText>{t('signup.privacyOPolicy')}</Auth.LinkText>
                </Link>
              </Auth.Text>
            </Auth.FormCheckbox>
          </BaseForm.Item>
        </Auth.ActionsWrapper>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
            {t('common.signUp')}
          </Auth.SubmitButton>
        </BaseForm.Item>
        <BaseForm.Item noStyle>
          <Auth.SocialButton type="default" htmlType="submit">
              <GoogleOAuthProvider clientId={ClientID} >
              <GoogleLogin type='icon' theme='filled_blue' text={t('login.googleLink')}
                onSuccess={(credentialResponse: CredentialResponse) => {
                  let emailInfo:any =jwtDecode(credentialResponse.credential as string);
                  console.log(emailInfo)
                  form.setFieldValue('Email',emailInfo.email)
                }}
                onError={() => {
                  alert('Login Failed');
                }} />
            </GoogleOAuthProvider>
          </Auth.SocialButton>
        </BaseForm.Item>
        <Auth.FooterWrapper>
          <Auth.Text>
            {t('signup.alreadyHaveAccount')}{' '}
            <Link to="/auth/login">
              <Auth.LinkText>{t('common.here')}</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
