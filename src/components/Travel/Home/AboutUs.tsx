import React from 'react';
import { Card, Col, Radio, Row } from 'antd';
import { Typography } from 'antd';
const { Paragraph, Text } = Typography;
const { Title } = Typography;
import { Image } from 'antd';
const style: React.CSSProperties = { padding: '20px 20px' };
const boder: React.CSSProperties = { borderRadius: '50px 50px' };

const AboutUs: React.FC = () => {
  return (
    <Row gutter={[30, 30]}>
      <Col span={24}>
        <Title level={1}>Travel</Title>
        <Paragraph>Chất lượng là danh dự</Paragraph>
        <Paragraph>
          Tập đoàn Phương Trang – FUTA Group được thành lập năm 2001. Với hoạt động kinh doanh chính trong lĩnh vực mua
          bán xe ô tô, vận tải hành khách, bất động sản và kinh doanh dịch vụ. Phương Trang dần trở thành cái tên quen
          thuộc đồng hành cùng người Việt trên mọi lĩnh vực.
        </Paragraph>
        <Paragraph>
          Trải qua hơn 20 năm hình thành và phát triển đặt khách hàng là trọng tâm, chúng tôi tự hào trở thành doanh
          nghiệp vận tải nòng cốt đóng góp tích cực vào sự phát triển chung của ngành vận tải nói riêng và nền kinh tế
          đất nước nói chung. Luôn cải tiến mang đến chất lượng dịch vụ tối ưu nhất dành cho khách hàng, Công ty Phương
          Trang được ghi nhận qua nhiều giải thưởng danh giá như “Thương hiệu số 1 Việt Nam, “Top 10 Thương hiệu nổi
          tiếng Việt Nam”, “Top 10 Dịch vụ hoàn hảo vì quyền lợi người tiêu dùng năm 2022”, “Top 10 Doanh nghiệp tiêu
          biểu Việt Nam”, “Top 10 thương hiệu, sản phẩm dịch vụ uy tín Việt Nam – ASEAN 2022” …
        </Paragraph>
      </Col>
      <Row>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Image
              style={boder}
              width={'100%'}
              src="https://storage.googleapis.com/futa-busline-web-cms-prod/495x306_px_f71ac3343d/495x306_px_f71ac3343d.png"
            />
          </div>
        </Col>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Title level={5}>FUTA BUS LINES</Title>
            <Paragraph>
              Tuân thủ phương châm “Chất lượng là danh dự” Công Ty Cổ Phần Xe Khách Phương Trang – FUTA Bus Lines hiện
              đang khai thác hơn 60 tuyến vận tải hành khách liên tỉnh cố định trải dài từ Nam ra Bắc với 350 phòng vé
              và trạm trung chuyển, hơn 2.000 đầu xe các loại, phục vụ hơn 20 triệu lượt khách mỗi năm.
            </Paragraph>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Title level={5}>FUTA LAND</Title>
            <Paragraph>
              Đối với mảng bất động sản, Phương Trang đã đạt những thành tựu nhất định với các sản phẩm chất lượng cao
              như Đà Nẵng Times Square, khu căn hộ cao cấp tại quận Sơn Trà, quận Liên Chiểu và nhiều dự án đang dần
              hoàn thiện khác.
            </Paragraph>
          </div>
        </Col>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Image
              style={boder}
              width={'100%'}
              src="https://storage.googleapis.com/futa-busline-cms-dev/futaland_63c14d8ebf/futaland_63c14d8ebf.jpg"
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Image
              style={boder}
              width={'100%'}
              src="https://storage.googleapis.com/futa-busline-web-cms-prod/Artboard_1_3x_ab80db5508/Artboard_1_3x_ab80db5508.png"
            />
          </div>
        </Col>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Title level={5}>FUTA EXPRESS</Title>
            <Paragraph>
              Song hành cùng sự phát triển của xe khách Phương Trang, chúng tôi nhận thấy một nhu cầu tất yếu là vận tải
              hàng hóa đi kèm với hành khách và hàng hóa không đi kèm với khách. Đáp ứng nhu cầu cũng như sự tin tưởng
              của khách hàng dành cho Công ty Phương Trang, Công ty Cổ phần Dịch vụ Chuyển Phát Nhanh Phương Trang –
              FUTA Express được thành lập. Qua một thập kỷ phát triển, FUTA Express dần trở thành đơn vị vận chuyển hàng
              hóa và phát triển kinh doanh. FUTA Express đã và đang đầu tư thêm nhiều phòng giao dịch, phương tiện và
              dịch vụ vận chuyển riêng biệt bảo đảm phục vụ khách hàng một cách nhanh chóng và an toàn.
            </Paragraph>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Title level={5}>FUTA CITY BUS </Title>
            <Paragraph>
              Mảng vận tải hành khách công cộng FUTA City Bus là mảnh ghép quan trọng trong chuỗi hoạt động chính mà
              Công ty Phương Trang hướng đến. Đầu tư vào những xe đời mới chất lượng cao, xe buýt Phương Trang mang đến
              cho hành khách đầy đủ tiện nghi như máy lạnh, wifi cùng đội ngũ lái xe, nhân viên chuyên nghiệp. Xe buýt
              Phương Trang cam kết mang đến cho khách hàng những chuyến đi an toàn, thoải mái với mức giá phù hợp, những
              chuyến đi “Chất lượng là danh dự.” Hiện nay, xe buýt Phương Trang đã có mặt tại 07 tỉnh thành: Đồng Tháp,
              Lâm Đồng, Thừa Thiên Huế, Khánh Hòa, Cần Thơ, An Giang và Ninh Thuận. Tiếp theo năm 2023, Công ty sẽ đưa
              vào khai thác chính thức các tuyến xe buýt mới trên địa bàn các tỉnh thành: Thành phố Hồ Chí Minh, Vĩnh
              Long, Đồng Nai, Tiền Giang, Bạc Liêu, Bến Tre, Kiên Giang…đáp ứng tối đa nhu cầu đi lại của người dân,
              giảm phương tiện cá nhân, góp phần thay đổi bộ mặt giao thông theo hướng hiện đại và tinh giản hơn.
            </Paragraph>
          </div>
        </Col>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Image
              style={boder}
              width={'100%'}
              src="https://storage.googleapis.com/futa-busline-web-cms-prod/2_495_x_306_px_bd5bf62f5d/2_495_x_306_px_bd5bf62f5d.png"
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Image
              style={boder}
              width={'100%'}
              src="https://storage.googleapis.com/futa-busline-cms-dev/Futa_Ads_daceccbca8/Futa_Ads_daceccbca8.jpg"
            />
          </div>
        </Col>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Title level={5}>FUTA ADVERTISING</Title>
            <Paragraph>
              Bên cạnh đó, chúng tôi còn đầu tư vào lĩnh vực truyền thông, quảng cáo với việc thành lập Công ty Cổ phần Quảng Cáo FUTA Việt Nam – FUTA Ads, là đơn vị khai thác quảng cáo trên toàn bộ hệ sinh thái của Tập Đoàn Phương Trang – FUTA Group với đa dạng hình thức quảng cáo như Quảng cáo xe tuyến đường dài, Quảng cáo vận chuyển hàng, Quảng cáo xe taxi, gian hàng bán hàng… Trong xu hướng 4.0 hiện nay, chúng tôi cũng đang ứng dụng và phát triển những công nghệ quảng cáo kỹ thuật số (Digital Marketing) với mục tiêu mang đến giải pháp tiếp thị toàn diện hiệu quả cho doanh nghiệp.
            </Paragraph>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Title level={5}>FUTA BUS LINES</Title>
            <Paragraph>Hiểu được nhu cầu nghỉ ngơi, thư giãn của hành Khách trên các hành trình dài qua nhiều tỉnh, thành phố, Công ty Phương Trang còn đầu tư vào hệ thống trạm dừng Phúc Lộc tại các khu vực trọng điểm như Tiền Giang, Lâm Đồng, Bến Tre, Vĩnh Long, Sóc Trăng… Hệ thống Trạm dừng Phúc Lộc được đầu tư toàn diện, đảm bảo phục vụ lượng lớn khách hàng 24/7.
              Các Trạm dừng Phúc Lộc mang đến nhiều món ăn hấp dẫn, phong phú, phù hợp với khẩu vị đa dạng của hành khách. Bên trong trạm dừng còn có các gian hàng đặc sản như trái cây theo mùa hoặc các loại bánh kẹo đặc trưng của từng vùng miền, nơi khách hàng có thể thưởng thức tại chỗ hoặc mua về làm quà cho người thân. Những nỗ lực này nhằm mang đến chuyến đi thoải mái và thư giãn cùng trải nghiệm dịch vụ tối ưu dành cho Khách hàng Phương Trang nói riêng và tất cả hành Khách nói chung.
            </Paragraph>
          </div>
        </Col>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Image
              style={boder}
              width={'100%'}
              src="https://storage.googleapis.com/futa-busline-web-cms-prod/tram_dung_01_f52c4d5695/tram_dung_01_f52c4d5695.png"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Image
              style={boder}
              width={'100%'}
              src="https://storage.googleapis.com/futa-busline-web-cms-prod/Artboard_2_3x_5a2b144a8c/Artboard_2_3x_5a2b144a8c.png"
            />
          </div>
        </Col>
        <Col className="gutter-row" style={style} span={12}>
          <div>
            <Title level={5}>FUTA APPLICATION</Title>
            <Paragraph>
              Cùng với việc đầu tư phát triển, mở rộng mạng lưới, tuyến mới và đầu từ những dòng xe chất lượng cao, chúng tôi còn tập trung công nghệ tiên tiến vào hoạt động kinh doanh. Khách hàng hiện có thể dễ dàng mua vé, gọi xe chỉ với vài thao tác đơn giản trên ứng dụng FUTA (FUTA app) cũng như tận hưởng các chương trình ưu đãi thanh toán của các đối tác trong từng thời điểm.
              Sử dụng FUTA app cho nhu cầu mua vé du lịch, đi lại, vận chuyển, Khách hàng còn có cơ hội tích luỹ điểm sau chuyến đi: Đổi điểm để mua vé xe Phương Trang và giao hàng hoá đi tỉnh, miễn phí, giảm giá… khi đặt xe di chuyển từ bến/bãi Phương Trang về nhà và ngược lại, đặt xe giá rẻ di chuyển trong thành phố...Hãy trải nghiệm FUTA app ngay – chúng tôi hân hạnh được lắng nghe và phục vụ Quý Khách.
            </Paragraph>
          </div>
        </Col>
      </Row>
    </Row>
  );
};
export default AboutUs;
