import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Preview from '~/containers/Preview';
import PageSizeSelector from '~/containers/PageSizeSelector';
import Editor from '~/containers/Editor';

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
  text-align: center;
`;

const Header = styled.header`
  ${notPrintable}
`;

const sideNavSize = 500;

const SideNav = styled.div`
  flex: 0 0 ${sideNavSize}px;
  overflow: auto;
  background-color: #fff;
  box-shadow: 0 0 10px 20px rgba(0, 0, 0, 0.02);
  ${notPrintable}
`;

const PageNav = styled.nav`
  position: fixed;
  top: 20px;
  right: 40px;
  ${notPrintable}
`;

const PreviewWrap = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  background-color: #eee;
  @media print {
    margin: 0;
    padding: 0;
    width: auto;
    height: auto
    background: transparent;
  }
`;

const PreviewInner = styled.div`
  display: inline-block;
  padding: 100px;
  @media print {
    margin: 0;
    padding: 0;
    background: transparent;
  }
`;
const Tips = styled.div`
  margin: 10px;
`;

const App = (): React.ReactElement => {
  return (
    <>
      <Wrapper>
        <SideNav>
          <Header>
            <Title>糸掛けテンプレート</Title>
          </Header>
          <nav>
            <Editor />
            <Tips>
              <p>Tips:</p>
              <p>
                糸掛けシミュレーションは0を最後に設定すると繰り返さなくなります。
              </p>
            </Tips>
          </nav>
        </SideNav>
        <PreviewWrap>
          <PreviewInner>
            <Preview />
          </PreviewInner>
        </PreviewWrap>
      </Wrapper>
      <PageNav>
        <PageSizeSelector />
      </PageNav>
    </>
  );
};

export default App;
