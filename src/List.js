import React from "react";
import List from "antd/es/list";
import Skeleton from "antd/es/skeleton";
import Avatar from "antd/es/avatar";

import "antd/lib/avatar/style/css";
import "antd/lib/list/style/css";
import "antd/lib/skeleton/style/css";

const { Item } = List;

const reduceItem = (
  { full_name, description, owner: { avatar_url }, loading },
  key
) => ({
  title: full_name,
  avatar: avatar_url,
  description,
  loading
});

const renderItem = (item, index) => (
  <Item key={index}>
    <Skeleton avatar title={false} loading={item.loading} active>
      <Item.Meta
        title={item.title}
        description={item.description}
        avatar={<Avatar src={item.avatar} />}
      />
    </Skeleton>
  </Item>
);

export default function ListRepo(props) {
  const _renderItem = props.reduceItem
    ? (item, index) => renderItem(props.reduceItem(item), index)
    : renderItem;

  return <List renderItem={_renderItem} dataSource={props.data} />;
}

ListRepo.defaultProps = {
  reduceItem: reduceItem,
  data: []
};
