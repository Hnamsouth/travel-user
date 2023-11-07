import styled from 'styled-components';
import { Layout } from 'antd';
import { media } from '@app/styles/themes/constants';

export const LayoutMaster = styled(Layout)`
  height: 100vh;
`;
//  margin-left: 80px;

export const LayoutMain = styled(Layout)`
  @media only screen and ${media.md} {
  }

  @media only screen and ${media.xl} {
    margin-left: unset;
  }
`;
