import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Preview from '~/containers/Preview';
import PageSizeSelector from '~/containers/PageSizeSelector';
import Editor from '~/containers/Editor';
import ThreadDialog from '~/containers/ThreadDialog';
import PresetDialog from './containers/PresetDialog';
import PrintOptions from './containers/PrintOptions';

const notPrintable = css`
  @media print {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 1.4em;
  text-align: center;
`;

const Header = styled.header`
  ${notPrintable}
`;

const sideNavSize = 320;

const SideNav = styled.div`
  flex: 0 0 ${sideNavSize}px;
  overflow: auto;
  background-color: #fff;
  box-shadow: 0 0 10px 20px rgba(0, 0, 0, 0.02);
  z-index: 1;
  ${notPrintable}
`;

const PageNav = styled.nav`
  position: fixed;
  top: 20px;
  right: 40px;
  ${notPrintable}
`;

const App = () => {
  const [tab, setTab] = useState(0);
  const handleChangeTab = useCallback((_, tab) => setTab(tab), [tab]);
  return (
    <>
      <Wrapper>
        <SideNav>
          <Header>
            <Title>糸掛けテンプレート</Title>
          </Header>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab label="テンプレート" />
            <Tab label="印刷設定" />
          </Tabs>
          {tab === 0 && <Editor />}
          {tab === 1 && <PrintOptions />}
        </SideNav>
        <Preview />
      </Wrapper>
      <PageNav>
        <PageSizeSelector />
      </PageNav>
      <ThreadDialog />
      <PresetDialog />
    </>
  );
};

export default App;
