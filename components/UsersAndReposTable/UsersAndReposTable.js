import React, { useContext } from "react";
import Link from "next/link";
import { Table, Avatar, Tag, Tooltip } from "antd";

// Styles
import styles from "./UsersAndReposTable.module.scss";
import { generateRandomColor } from "../../lib/helpers/generalHelpers";
import { REPOSITORY, STATE_KEY_FOR_FILTERS } from "../../lib/constant";
import { AppContext } from "../../lib/context/AppContext";


export const UsersAndReposTable = (props) => {
  const { state } = useContext(AppContext);
  const showRepoColumns = [
    {
      title: "Repository Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (_, record) => {
        if (!record) return;
        return (
          <div className={ styles["repo-name"] }>
            <Avatar size="large" src={ record?.owner?.avatar_url } />
            { record.name.length > 24 ? (
              <Tooltip placement="top" title={ record.name }>
                <strong className={ styles["repo-name--text"] }>{ record.name }</strong>
              </Tooltip>
            ) : <strong className={ styles["repo-name--text"] }>{ record.name }</strong>
            }
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
            <a key={ item.name } target="_blank" rel="noopener noreferrer" href={ item.profileLink }>
              <div className={ styles["forked-users"] }>
                <Link href="" passHref>
                  <Avatar key={ item.name } src={ item.profileLink } className={ styles["forked-users--avatar"] }>{ item.name[0].toUpperCase() }</Avatar>
                </Link>
                <strong>{ item.name }</strong>
              </div>
            </a>
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
          return (<Tag key={ item } color={ generateRandomColor() }>{ item }</Tag>);
        });
      },
    },
  ];

  const showUserColumns = [
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
  ];

  return (
    <div className={ styles["user-repos__container"] }>
      <Table
        key={ "user-and-repo-table" }
        columns={ state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] === REPOSITORY ? showRepoColumns : showUserColumns }
        dataSource={ props.data }
        pagination={ false }
        loading={ props.isQueriesFetching }
      />
    </div>
  );
};
