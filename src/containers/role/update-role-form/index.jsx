import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from 'prop-types';
import menus from '../../../config/menus';
const Item = Form.Item;
const { TreeNode } = Tree;

const treeData = [
  {
    title: "平台权限",
    key: 0,
    children: menus.map(menu => {
      if (menu.children) {
        return {
          title: menu.title,
          key: menu.path,
          children: menu.children.map(cMenu => {
            return {
              title: cMenu.title,
              key: cMenu.path
            }
          })

        }
      } else {
        return {
          title: menu.title,
          key: menu.path
        }
      }
    })

  }
]


@Form.create()
class UpdateRoleForm extends Component {

  static propTypes = {
    role: PropTypes.object.isRequired
  }
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: []
  };


  onCheck = checkedKeys => {
   // console.log("onCheck", checkedKeys);
    this.setState({ checkedKeys });
  };


  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  render() {
    const { form: { getFieldDecorator }, role: { name, menus } } = this.props;
    return (
      <Form>
        <Item label="角色名称">
          {getFieldDecorator("name", {
            initialValue: name
          })(<Input placeholder="请输入角色名称" disabled />)}
        </Item>
        <Item>
          {
            getFieldDecorator("menus", {
              trigger: "onCheck",
              valuePropName:"checkedKeys",
              initialValue:menus
            })(
              <Tree
                checkable
                onCheck={this.onCheck}
                defaultExpandAll={true}
              >
                {this.renderTreeNodes(treeData)}
              </Tree>
            )
          }
        </Item>
      </Form>
    );
  }
}

export default UpdateRoleForm;
