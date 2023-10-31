import { Col, Input, Row, Tooltip, Form, Tag, Space, Radio, message, FormListFieldData, InputNumber } from 'antd';
import { Button } from '@app/components/common/buttons/Button/Button';
import { CheckBox } from '@app/components/header/components/searchDropdown/searchOverlay/SearchFilter/SearchFilter.styles';
import { Rating } from '@app/components/medical-dashboard/favoriteDoctors/DoctorCard/DoctorCard.styles';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Card } from '@app/components/common/Card/Card';

const Express: React.FC = () => {
  return (
    <Row gutter={[30, 30]}>
      <Col span={24}>
        <Card>
          <h2>Express Car</h2>
          <img src="" />
        </Card>
      </Col>
    </Row>
  );
};
export default Express;
