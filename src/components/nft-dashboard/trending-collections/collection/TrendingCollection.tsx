import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@app/components/common/Avatar/Avatar';
import { formatNumberWithCommas, getCurrencyPrice } from '@app/utils/utils';
import { TrendingActivity } from '@app/api/activity.api';
import * as S from './TrendingCollection.styles';
import { TravelRoute } from '@app/api/main/route.api';
import { ArrowRightOutlined } from '@ant-design/icons';

export const TrendingCollection: React.FC<{ data: TravelRoute }> = (data) => {
  const { t } = useTranslation();

  return (
    <S.Card
      padding={0}
      $img={
        'https://lightence-assets.s3.amazonaws.com/lightence-activity/milad-fakurian-bMSA5-tLFao-unsplash_js8utz.webp'
      }
    >
      <S.CollectionImage
        src={
          'https://lightence-assets.s3.amazonaws.com/lightence-activity/milad-fakurian-bMSA5-tLFao-unsplash_js8utz.webp'
        }
        alt="nft"
      />
      <S.BidButton type="ghost">{t('common.buyticket')}</S.BidButton>
      <S.NftCollectionInfo>
        {/* <S.AuthorAvatarWrapper>
          <Avatar shape="circle" size={64} src={avatar} alt={owner} />
        </S.AuthorAvatarWrapper> */}
        <S.InfoRow>
          <S.Title level={5}>
            {data.data.idRouteNavigation?.idFromLocationNavigation?.name} <ArrowRightOutlined />{' '}
            {data.data.idRouteNavigation?.idToLocationNavigation?.name}
          </S.Title>
        </S.InfoRow>
        <S.InfoRow>
          <S.OwnerText>
            type {data.data.idBusScheduleNavigation?.idBusNavigation?.idTypeBusNavigation?.name}
          </S.OwnerText>
          <S.USDText>
            {getCurrencyPrice(
              formatNumberWithCommas(
                (data.data.idRouteNavigation?.price as number) +
                  (data.data.idBusScheduleNavigation?.idBusNavigation?.idTypeBusNavigation?.pricePlus as number),
              ),
              'USD',
            )}
          </S.USDText>
        </S.InfoRow>
      </S.NftCollectionInfo>
    </S.Card>
  );
};
