import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {boundClass} from 'autobind-decorator';
import {Sidebar, Icon, Menu, Segment} from 'semantic-ui-react';
import styles from './../css/Home';
import SinglePoolItem from './SinglePoolItem';

@boundClass
@connect(state => ({pools: state.data.pools}))
export default class Home extends Component {
  render() {
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          direction="bottom"
          animation="overlay"
          icon="labeled"
          inverted
          visible
          width="thin"
        >
          <Menu.Item as="a">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="camera" />
            Channels
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher className={styles.poolsContainer}>
          <div className={styles.poolsInner}>
            {_.map(this.props.pools, pool => <SinglePoolItem pool={pool} />)}
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
