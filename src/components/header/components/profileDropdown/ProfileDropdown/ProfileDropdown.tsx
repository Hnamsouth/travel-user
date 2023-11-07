import React from 'react';
import { Avatar, Button, Col, Row } from 'antd';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { H6 } from '@app/components/common/typography/H6/H6';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { useTranslation } from 'react-i18next';
import { LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const ProfileDropdown: React.FC = () => {
  const {t}= useTranslation()
  const { isTablet } = useResponsive();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);
  const u_img ="https://lh3.googleusercontent.com/a/ACg8ocJ0Unu2w7FPM4LONYAj8_bk1_XpNmLeg9K9dbHFd6VH=s96-c";

  return user ? (
    <Dropdown overlay={<ProfileOverlay />} trigger={['click']}>
      <S.ProfileDropdownHeader as={Row} gutter={[10, 10]} align="middle">
        <Col>
          <Avatar src={u_img} alt="User" shape="circle" size={40} />
        </Col>
        {isTablet && (
          <Col>
            <H6 style={{color:"white"}} >{`${user.name}`}</H6>
          </Col>
        )}
      </S.ProfileDropdownHeader>
    </Dropdown>
  ) : <Button icon={<LoginOutlined />} onClick={()=>navigate('/auth/login')}>{t('common.login')}</Button>;
};
