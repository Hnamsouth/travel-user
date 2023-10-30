import React from 'react';
import * as S from './References.styles';
import { FacebookOutlined, GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

const GithubIcon = S.withStyles(GithubOutlined);
const TwitterIcon = S.withStyles(TwitterOutlined);
const FacebookIcon = S.withStyles(FacebookOutlined);
const LinkedinIcon = S.withStyles(LinkedinOutlined);

export const References: React.FC = () => {
  return (
    <S.ReferencesWrapper>
      <S.Text>Made by Student, FAI.</S.Text>
      <S.Icons>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          <GithubIcon />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <TwitterIcon />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <FacebookIcon />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
          <LinkedinIcon />
        </a>
      </S.Icons>
    </S.ReferencesWrapper>
  );
};
