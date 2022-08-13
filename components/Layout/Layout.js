import React from 'react';
import {Layout as AntdLayout} from "antd";
//Styles
import styles from './Layout.module.scss';

const {Content, Footer} = AntdLayout;

const HEADER_TITLE = "Github Search API For Users And Repos";

const Header = () =>{
  return (
    <div className={styles["antd-layout__container--header"]}>
      <h1 className={styles["header--title"]}>{ HEADER_TITLE }</h1>
    </div>
  )
};

export const Layout = (props) =>{
  return (
    <AntdLayout className={styles["antd-layout__container"]}>
        <Header />

        <Content className={styles["antd-layout__container--content"]}>{props.children}</Content>

        {
          props.isFooterExists && (
            <Footer>
              {props.footer}
            </Footer>
          )
        }
    </AntdLayout>
  )
};
