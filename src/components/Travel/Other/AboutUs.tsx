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
                <Title level={1}>Travel Agency  </Title>
                <Paragraph>Quality is honor</Paragraph>
                <Paragraph>
                    Travel Agency was established in 2001. The company mainly operates in the following fields:

                    Passenger transportation: Travel Agency  is one of the largest passenger transportation companies in Vietnam, operating over 2,000 passenger cars, serving millions of passengers each year.
                    Automobile trading: Travel Agency  is the official distributor of many world famous car brands, such as Mercedes-Benz, Toyota, Hyundai, etc.
                    Real estate: Travel Agency  invests in the development of many real estate projects, including residential areas, urban areas, and shopping centers.
                    Service business: Travel Agency  provides a variety of services, including express delivery services, tourism services, and restaurant services.
                    With the motto "Quality is honor", Travel Agency  always strives to provide the best services for customers. The company has won many prestigious awards, including the Golden Star of Vietnam Award, the National Brand Award, etc.

                    Travel Agency  has become a familiar name accompanying Vietnamese people in all fields. The company has contributed to promoting the socio-economic development of the country and improving the quality of life of the people.


                </Paragraph>
                <Paragraph>
                    Over 20 years of formation and development with the focus on customers, we are proud to become a core transportation
                    enterprise that contributes positively to the overall development of the transportation industry in particular and the
                    national economy in general. Always improving to bring the optimal service quality for customers, Travel Agency
                    Company has been recognized through many prestigious awards such as "Vietnam's No. 1 Brand", "Top 10 Famous
                    Brands of Vietnam", "Top 10 Perfect Services for Consumer Rights in 2022", "Top 10 Vietnamese Representative
                    Enterprises", "Top 10 reputable brands, products and services of Vietnam - ASEAN 2022" ...

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
                        <Title level={5}>TRAVEL BUS LINES</Title>
                        <Paragraph>
                            Adhering to the motto "Quality is honor", Travel Agency Joint Stock Company - TRAVEL Bus Lines is currently
                            operating over 60 fixed inter-provincial passenger transport routes stretching from South to North with 350 ticket offices
                            and transfer stations, over 2,000 vehicles of all types, serving over 20 million passengers each year.

                        </Paragraph>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="gutter-row" style={style} span={12}>
                    <div>
                        <Title level={5}>TRAVEL LAND</Title>
                        <Paragraph>
                            In the real estate sector, Travel Agency has achieved certain successes with high-quality products such as Đà Nẵng Times Square, a luxury apartment complex in Sơn Trà district, Liên Chiểu district, and many other projects that are being gradually completed.

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
                        <Title level={5}>TRAVEL EXPRESS</Title>
                        <Paragraph>
                            In parallel with the development of Travel Agency  buses, we have recognized an essential need for the transportation of goods accompanied by passengers and goods not accompanied by passengers. To meet the needs and trust of customers for Travel Agency , Travel Agency  Express Joint Stock Company - TRAVEL Express was established. After a decade of development, TRAVEL Express has gradually become a leading logistics and business development unit. TRAVEL Express has been and is investing in more transaction offices, vehicles, and dedicated transportation services to ensure that customers are served quickly and safely.

                        </Paragraph>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="gutter-row" style={style} span={12}>
                    <div>
                        <Title level={5}>TRAVEL CITY BUS </Title>
                        <Paragraph>
                            In line with the growth of Travel Agency buses, we have identified an essential need for the transportation of goods accompanying passengers and goods not accompanying passengers. In response to the needs and trust of customers for Travel Agency , Travel Agency Express Joint Stock Company - FUTA Express was established. Over a decade of development, TRAVEL Express has gradually become a leading logistics and business development unit. TRAVEL Express has been and is investing in more transaction offices, vehicles, and dedicated transportation services to ensure that customers are served quickly and safely.
                            Travel Agency buses have grown in popularity, and with this growth has come a need for the transportation of goods. To meet this need, Travel Agency Express Joint Stock Company - TRAVEL Express was established. Over a decade of development, TRAVEL Express has become a leading logistics and business development unit. TRAVEL Express has invested in more transaction offices, vehicles, and dedicated transportation services to ensure that customers are served quickly and safely.

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
                        <Title level={5}>TRAVEL ADVERTISING</Title>
                        <Paragraph>
                            In addition, we have also invested in the field of media and advertising with the establishment of TRAVEL Vietnam Advertising Joint Stock Company - TRAVEL Ads, which is the advertising exploitation unit on the entire ecosystem of Travel Agency  Group - TRAVEL Group with a variety of advertising formats such as long-distance bus advertising, cargo advertising, taxi advertising, sales stalls, etc. In the current 4.0 trend, we are also applying and developing digital marketing technologies (Digital Marketing) with the aim of providing effective comprehensive marketing solutions for businesses.

                        </Paragraph>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="gutter-row" style={style} span={12}>
                    <div>
                        <Title level={5}>TRAVEL BUS LINES</Title>
                        <Paragraph>
                            Understanding the need for rest and relaxation of passengers on long journeys through many provinces and cities, Travel Agency  also invested in the Phúc Lộc rest stop system in key areas such as Tiền Giang, Lâm Đồng, Bến Tre, Vĩnh Long, Sóc Trăng, etc. The Phúc Lộc rest stop system is fully invested to ensure serving a large number of customers 24/7.

                            The Phúc Lộc rest stops offer a variety of delicious and diverse dishes to suit the diverse tastes of passengers. Inside the rest stop, there are also specialty stalls such as seasonal fruits or traditional candy from each region, where customers can enjoy on the spot or buy as gifts for loved ones. These efforts aim to provide a comfortable and relaxing trip and an optimal service experience for Travel Agency  customers in particular and all passengers in general.

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
                        <Title level={5}>TRAVEL APPLICATION</Title>
                        <Paragraph>
                            Along with investing in development, network expansion, new routes and investing in high-quality vehicle lines, we also focus on advanced technology in business activities. Customers can now easily buy tickets and hail a ride with just a few simple steps on the TRAVEL app (TRAVEL app) as well as enjoy payment incentives from partners from time to time.
                            Using the TRAVEL app to buy travel, transportation, and transportation tickets, customers also have the opportunity to accumulate points after the trip: Exchange points to buy Travel Agency bus tickets and deliver goods to the province, free of charge, with discounts. Price... when booking a car to travel from Travel Agency station/park to home and vice versa, booking a cheap car to move within the city... Experience the TRAVEL app now - we are honored to listen and serve you .  </Paragraph>
                    </div>
                </Col>
            </Row>
        </Row>
    );
};
export default AboutUs;