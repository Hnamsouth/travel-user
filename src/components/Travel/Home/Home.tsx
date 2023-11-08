import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Form, FormListFieldData } from 'antd';

import {
  BusSchedule,
  Location,
  Route,
  TravelRoute,
  getBusScheduleTableData,
  getLocationTableData,
  getRouteTableData,
} from '@app/api/main/route.api';
import { useMounted } from '@app/hooks/useMounted';
import { BusStructure, BusStructureData } from '@app/api/main/bus.api';
import { PriceForAge, TKDTdata, TKdata, getPriceForAgeData } from '@app/api/main/ticket.api';
import SearchSchedule from './SearchSchedule';
import BusScheduleList from './BusScheduleList';
import { TrendingCollections } from '@app/components/nft-dashboard/trending-collections/TrendingCollections';
import FilterTravelRoute from './Filter';
import FooterComponent from './Footer';
import { useResponsive } from '@app/hooks/useResponsive';
export interface FormData {
  BusScheduleList: BusSchedule[];
  LocationList: Location[];
  Routes: Route[];
  loading: boolean;
  from_selected: number | null;
  to_selected: number | null;
  PriceForAge: PriceForAge[];
}
export interface IBigData {
  TravelRouteData: TravelRoute[] | [];
  TravelRouteSelected: TravelRoute;
  BusStructureData: BusStructureData;
  TicketDetailData: TKDTdata[];
  TicketData: TKdata;
  fieldTKDT: FormListFieldData[];
}
export interface IsearchData {
  from: number;
  to: number;
}

const Home: React.FC = () => {
  const { isMounted } = useMounted();
  const [form] = Form.useForm();
  const [BigData, setBigData] = useState<IBigData>({
    TravelRouteData: [],
    TravelRouteSelected: {} as TravelRoute,
    BusStructureData: { busStructure: {} as BusStructure, seat: [] },
    TicketDetailData: [],
    fieldTKDT: [],
    TicketData: {} as TKdata,
  });
  const [searchData, setSearchData] = useState<FormData>({
    BusScheduleList: [],
    LocationList: [],
    Routes: [],
    loading: false,
    from_selected: null,
    to_selected: null,
    PriceForAge: [],
  });

  const fetchData = useCallback(
    (p: { current: number; pageSize: number }) => {
      setSearchData({ ...searchData, loading: true });
      getBusScheduleTableData(p).then((res) => {
        getLocationTableData(p).then((res1) => {
          getRouteTableData(p).then((res2) => {
            getPriceForAgeData().then((res3) => {
              if (isMounted) {
                setSearchData({
                  BusScheduleList: res.data,
                  LocationList: res1.data,
                  Routes: res2.data,
                  loading: false,
                  from_selected: null,
                  to_selected: null,
                  PriceForAge: res3,
                });
              }
            });
          });
        });
      });
    },
    [isMounted],
  );

  const { isDesktop, isTablet, isMobile } = useResponsive();

  useEffect(() => {
    fetchData({ current: 1, pageSize: 16 });
    return () => {};
  }, []);

  return (
    <>
      <Row gutter={[30, 30]}>
        {/* search */}
        <Col span={24}>
          <SearchSchedule BigData={BigData} setBigData={setBigData} form={form} searchData={searchData} />
        </Col>
        {/* bus schedule */}
        <Col span={24}>
          {BigData.TravelRouteData.length > 0 && (
            <Row gutter={[30, 30]}>
              {/* Filter */}
              <Col xl={6}>
                <FilterTravelRoute />
              </Col>
              {/* Schedule List */}
              <Col xl={18}>
                <BusScheduleList BigData={BigData} setBigData={setBigData} PriceForAge={searchData.PriceForAge} />
              </Col>
            </Row>
          )}
        </Col>
        <Col span={24}>
          <TrendingCollections />
        </Col>
        <p>goodbye world</p>
        <Col span={24}>
          <p>goodbye world 123</p>
          <p>goodbye world 123</p>
        </Col>
        <Col span={24}></Col>
        {/* footer */}
        <Col span={24}>
          <FooterComponent />
        </Col>
      </Row>
    </>
  );
};
// ^4.22.4
export default Home;
