import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'antd';
import { UserModel } from '@app/domain/UserModel';
import * as S from './ProfileInfo.styles';

interface ProfileInfoProps {
  profileData: UserModel | null;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
  const [fullness] = useState(90);

  const { t } = useTranslation();

  return profileData ? (
    <S.Wrapper>
      <S.ImgWrapper>
        <Avatar shape="circle"  alt="Profile" />
      </S.ImgWrapper>
      <S.Title>{`${profileData.name}`}</S.Title>
      <S.FullnessWrapper>
        <S.FullnessLine width={fullness}>{fullness}%</S.FullnessLine>
      </S.FullnessWrapper>
      <S.Text>{t('profile.fullness')}</S.Text>
    </S.Wrapper>
  ) : null;
};
