import React, { useCallback, useEffect, useState } from 'react';
import { Col, Input, Row, Tooltip, Form, Tag, Space, Radio, message, FormListFieldData, InputNumber } from 'antd';
import { Button } from '@app/components/common/buttons/Button/Button';
import { CheckBox } from '@app/components/header/components/searchDropdown/searchOverlay/SearchFilter/SearchFilter.styles';
import { Rating } from '@app/components/medical-dashboard/favoriteDoctors/DoctorCard/DoctorCard.styles';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Card } from '@app/components/common/Card/Card';
import { ProfileInfo } from '@app/components/profile/profileCard/ProfileInfo/ProfileInfo';
import { ProfileNav } from '@app/components/profile/profileCard/ProfileNav/ProfileNav';
import { useResponsive } from '@app/hooks/useResponsive';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Vehicle: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  const { t } = useTranslation();
  const { isTablet: isTabletOrHigher, mobileOnly } = useResponsive();
  const location = useLocation();
  const navigate = useNavigate();

  const { isTablet } = useResponsive();

  const isTitleShown = isTabletOrHigher || (mobileOnly && location.pathname === '/profile');
  const isMenuShown = isTabletOrHigher || (mobileOnly && location.pathname !== '/profile');
  return (
    <>
      <Row gutter={[30, 30]}>
        {isTitleShown && (
          <Col xs={24} md={24} xl={8}>
            <Card>
              <h2>Vehicle list</h2>
              <Radio.Group defaultValue={1} style={{ display: 'flex', flexDirection: 'column' }}>
                <Radio value={1}>
                  <a href="/vehicle/express">Express</a>
                </Radio>
                <Radio value={2}>
                  <a href="/vehicle/express">Luxury</a>
                </Radio>
                <Radio value={3}>
                  <a href="/vehicle/express">VovolAC</a>
                </Radio>
                <Radio value={4}>
                  <a href="/vehicle/express">VovolnonAC</a>
                </Radio>
              </Radio.Group>
            </Card>
          </Col>
        )}
        {isMenuShown && (
          <Col xs={24} md={24} xl={16}>
            <Outlet />
          </Col>
        )}
      </Row>
    </>
  );
};
export default Vehicle;
