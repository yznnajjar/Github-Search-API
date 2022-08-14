import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Table, Avatar, Tag } from "antd";
// Styles
import styles from "./UsersAndReposTable.module.scss";
import { generateRandomColor } from "../../lib/helpers/generalHelpers";

export const UsersAndReposTable = (props) => {
  const showRepoColumns = useMemo(()=>[
    {
      title: "Repository Name",
      dataIndex: "name",
      key: "name",
      width: 300,
      render: (_, record) => {
        return (
          <div className={ styles["repo-name"] }>
            <Avatar size="large" src={ record.owner.avatar_url } />
            <strong>{ record.name }</strong>
          </div>
        );
      },
    },
    {
      title: "Forked Users",
      dataIndex: "forkedUsers",
      key: "forkedUsers",
      width: 100,
      render: (_, record) => {
        return record?.forkedUsers && record.forkedUsers?.map(item => {
          return (
            <div key={ item.name} className={ styles["forked-users"] }>
              <Link href={ item.profileLink } key={ item.profileLink }>
                <Avatar src={ item.profileLink } className={ styles["forked-users--avatar"] }>{ item.name[0].toUpperCase() }</Avatar>
              </Link>
              <strong>{ item.name }</strong>
            </div>
          );
        });
      },
    },
    {
      title: "File Type",
      dataIndex: "filesExt",
      key: "filesExt",
      width: 300,
      render: (_, record) => {
        return record?.filesExt && record?.filesExt?.map(item => {
          return (<Tag key={ record.id } color={ generateRandomColor() }>{ item }</Tag>);
        });
      },
    },
  ],[props.data]);

  const showUserColumns = useMemo(()=>[
    {
      title: "Name",
      dataIndex: "login",
      key: "login",
      width: 120,
      render: (_, record) => {
        return (
          <div>
            <Avatar
              size="large"
              src={ record.avatar_url }
            />
            <strong className={ styles["user-name--text"] }>{ record.login }</strong>
          </div>
        );
      },
    },
    {
      title: "Profile Link",
      dataIndex: "html_url",
      key: "html_url",
      width: 200,
      render: (_, record) => {
        return (
          <span className={ styles["user--profile-link"] }>
          <Link href={ record.html_url }>
            <a target="_blank" rel="noopener noreferrer">{ record.html_url }</a>
          </Link>
        </span>
        );
      },
    },
  ],[props.data]);

  return (
    <div className={ styles["user-repos__container"] }>
      <Table
        key={props.data[0]?.name+generateRandomColor() || "user-and-repo-table"}
        columns={ props.isReposSuccess ? showRepoColumns : showUserColumns  }
        dataSource={ props.data }
        pagination={ false }
      />
    </div>
  );
};
