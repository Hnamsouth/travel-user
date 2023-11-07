// eslint-disable-next-line prettier/prettier
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "@app/components/common/Carousel/Carousel";
import { ViewAll } from "@app/components/nft-dashboard/common/ViewAll/ViewAll";
import { NFTCardHeader } from "@app/components/nft-dashboard/common/NFTCardHeader/NFTCardHeader";
import { TrendingCollection } from "@app/components/nft-dashboard/trending-collections/collection/TrendingCollection";
import { useResponsive } from "@app/hooks/useResponsive";
// import { getTrendingActivities, TrendingActivity } from '@app/api/activity.api';
import * as S from "./TrendingCollections.styles";
import { GetRouteData, TravelRoute } from "@app/api/main/route.api";
import { useMounted } from "@app/hooks/useMounted";

export const TrendingCollections: React.FC = () => {
  const [travelRoute, SetTraverRoute] = useState<TravelRoute[]>([]);
  const { mobileOnly, isTablet: isTabletOrHigher } = useResponsive();

  const { isMounted } = useMounted();
  const fetchData = async () => {
    await GetRouteData("travel-popular").then((res) => {
      if (isMounted) {
        SetTraverRoute(res);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { t } = useTranslation();

  const travelRouteList = useMemo(() => {
    return {
      mobile: travelRoute.map((item, index) => <TrendingCollection key={index} data={item} />).slice(0, 3),
      tablet: travelRoute.map((item, index) => (
        <div key={index}>
          <S.CardWrapper>
            <TrendingCollection data={item} />
          </S.CardWrapper>
        </div>
      ))
    };
  }, [travelRoute]);

  const sliderRef = useRef<Slider>(null);


  return (
    <>
      <NFTCardHeader title={t("page.home.popularRoute.title")}>
        {isTabletOrHigher && (
          <Row align="middle">
            <Col>
              <ViewAll bordered={false} />
            </Col>

            <Col>
              <S.ArrowBtn type="text" size="small" onClick={() => sliderRef.current && sliderRef.current.slickPrev()}>
                <LeftOutlined rev={undefined} />
              </S.ArrowBtn>
            </Col>

            <Col>
              <S.ArrowBtn type="text" size="small" onClick={() => sliderRef.current && sliderRef.current.slickNext()}>
                <RightOutlined rev={undefined} />
              </S.ArrowBtn>
            </Col>
          </Row>
        )}
      </NFTCardHeader>

      <S.SectionWrapper>
        {mobileOnly && travelRouteList.mobile}

        {isTabletOrHigher && travelRoute.length > 0 && (
          <Carousel
            ref={sliderRef}
            slidesToShow={3}
            responsive={[
              {
                breakpoint: 1900,
                settings: {
                  slidesToShow: 2
                }
              }
            ]}
          >
            {travelRouteList.tablet}
          </Carousel>
        )}
      </S.SectionWrapper>

      {mobileOnly && (
        <S.ViewAllWrapper>
          <ViewAll />
        </S.ViewAllWrapper>
      )}
    </>
  );
};
