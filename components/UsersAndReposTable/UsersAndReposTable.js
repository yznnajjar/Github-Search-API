import React from "react";
import Link from 'next/link';
import { Table, Avatar } from "antd";
// Styles
import styles from './UsersAndReposTable.module.scss';

const USERS_COLUMN = [
  {
    title: "Name",
    dataIndex: "login",
    key: "login",
    width: 120,
    render: (_, record) =>{
      return (
        <div>
          <Avatar
            size="large"
            src={record.avatar_url}
          />
          <strong className={styles['user-name--text']}>{ record.login }</strong>
        </div>
      )
    }
  },
  {
    title: "Profile Link",
    dataIndex: "html_url",
    key: "html_url",
    width: 200,
    render: (_, record) => {
      return(
        <span className={styles["user--profile-link"]}>
          <Link href={record.html_url}>
            <a target="_blank" rel="noopener noreferrer">{record.html_url}</a>
          </Link>
        </span>
      )
    },
  },

];

const REPOS_COLUMN = [
  {
    title: "Repository Name",
    dataIndex: "name",
    key: "name",
    width: 120,
  },
  {
    title : "Forked Users",
    dataIndex : "forkers",
    width:150,
    render: (_, record) => (
      <div
        style={{
          border: "1px solid red",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Avatar src="https://joeschmoe.io/api/v1/random" />

        <strong style={{ fontSize: "12px", margin: "auto" }}>{text}</strong>
      </div>
    )
  },
  {
    title: "Profile Link",
    dataIndex: "html_url",
    key: "html_url",
    width: 200,
    render: (_, record) => {
      return(
        <span className={styles["user--profile-link"]}>
          <Link href={record.html_url}>
            <a target="_blank" rel="noopener noreferrer">{record.html_url}</a>
          </Link>
        </span>
      )
    },
  },

];
export const UsersAndReposTable = (props) => {
  return (
      <div className={styles['user-repos__container']}>
        <Table
          columns={ USERS_COLUMN }
          dataSource={props.data}
          pagination={false}
        />
      </div>
  );
};
