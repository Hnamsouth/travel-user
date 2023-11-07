import React, { useEffect, useState } from 'react';
import { Header } from '../../../header/Header';
import MainSider from '../sider/MainSider/MainSider';
import MainContent from '../MainContent/MainContent';
import { MainHeader } from '../MainHeader/MainHeader';
import * as S from './MainLayout.styles';
import { Outlet, useLocation } from 'react-router-dom';
import { MEDICAL_DASHBOARD_PATH, NFT_DASHBOARD_PATH } from '@app/components/router/AppRouter';
import { useResponsive } from '@app/hooks/useResponsive';
import { References } from '@app/components/common/References/References';
import { Col, Row } from 'antd';

const MainLayout: React.FC = () => {
  const [isTwoColumnsLayout, setIsTwoColumnsLayout] = useState(true);
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const { isTablet, isDesktop } = useResponsive();
  const location = useLocation();

  const toggleSider = () => setSiderCollapsed(!siderCollapsed);

  useEffect(() => {
    setIsTwoColumnsLayout([MEDICAL_DASHBOARD_PATH, NFT_DASHBOARD_PATH].includes(location.pathname) && isTablet);
  }, [location.pathname, isTablet]);


  const backgroundColor= "#0064C0";
  return (
    <S.LayoutMaster>
      {/* <MainSider isCollapsed={siderCollapsed} setCollapsed={setSiderCollapsed} /> */}
      <S.LayoutMain >
        <MainHeader isTwoColumnsLayout={isTwoColumnsLayout} >
          <Header toggleSider={toggleSider} isSiderOpened={!siderCollapsed} isTwoColumnsLayout={isTwoColumnsLayout}/>
        </MainHeader>
        <MainContent id="main-content" $isTwoColumnsLayout={isTwoColumnsLayout}>
          <div>
            <Row align={"middle"}>

              {isDesktop ? (
                <Col span={18} offset={3}>
                  <Outlet />
                </Col>
              ) : (
                <Col span={24}>
                  <Outlet />
                </Col>
              )}
            </Row>

          </div>
          {!isTwoColumnsLayout && <References />}
        </MainContent>
      </S.LayoutMain>
    </S.LayoutMaster>
  );
};

export default MainLayout;
