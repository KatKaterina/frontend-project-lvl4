import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import {
  Col, Nav, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentChannel, fetchData } from '../slices/ChannelsSlice.js';
import { openModal } from '../slices/modalSlice.js';

const FixedChannel = (props) => {
  const {
    name, onClick, id, active,
  } = props;
  return (
    <Nav.Link key={id} eventKey={id} active={active} className="w-100 rounded text-start" onClick={onClick}>
      {name}
    </Nav.Link>
  );
};

const RemovableChannel = (props) => {
  const {
    name, variant, onClick, onRename, onRemove, id, active, t,
  } = props;
  return (
    <Dropdown as={ButtonGroup} key={id} className="d-flex mb-2" aria-label={name}>
      <Nav.Link as={Button} aria-label={name} eventKey={id} role="button" active={active} className="w-100 rounded text-start" onClick={onClick}>
        {name}
      </Nav.Link>

      <Dropdown.Toggle role="button" split variant={variant} data-testid="channel-dropdown" id="dropdown-button-drop-end">
        <span className="visually-hidden">{t('elements.controlChannel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={onRename} role="button" href="#">{t('elements.renameChannel')}</Dropdown.Item>
        <Dropdown.Item onClick={onRemove} role="button" href="#">{t('elements.removeChannel')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Channels = () => {
  const { t } = useTranslation();

  // const channels = useSelector(selectorChannels.selectAll);

  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const handleClick = (id) => () => {
    dispatch(changeCurrentChannel({ id }));
    dispatch(fetchData());
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(openModal({ type: 'addChannel', updateData: null }));
  };

  const handleRemove = (id) => () => {
    dispatch(openModal({ type: 'removeChannel', updateData: { id } }));
  };

  const handleRename = (id, name, removable) => () => {
    dispatch(openModal({ type: 'renameChannel', updateData: { id, name, removable } }));
    // dispatch(fetchData());
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const renderChannels = () => (
    <Nav variant="pills" fill className="flex-column">
      {channels.map(({ id, name, removable }) => {
        const Channel = removable ? RemovableChannel : FixedChannel;
        return (
          <Channel
            id={id}
            key={id}
            name={name}
            variant={id === currentChannelId ? 'primary' : null}
            active={id === currentChannelId ? 'true' : ''}
            onClick={handleClick(id)}
            onRemove={handleRemove(id)}
            onRename={handleRename(id, name)}
            t={t}
          />
        );
      })}
    </Nav>
  );

  return (
    <Col md="auto" className="border-end pt-5 px-0 bg-light h-100">
      <div className="d-flex justify-content-around">
        <span>
          {t('elements.channels')}
        </span>
        <Button variant="outline-primary" size="sm" className="p-0 ml-auto" onClick={handleAdd}>+</Button>
      </div>
      {renderChannels()}
    </Col>
  );
};

export default Channels;

/* {
        const Channel = removable ? RemovableChannel : FixedChannel;
        return (
          <Channel
            id={id}
            key={id}
            name={name}
            variant={id === currentChannelId ? 'primary' : null}
            active={id === currentChannelId ? "true" : ""}
            onClick={handleClick(id)}
            onRemove={handleRemove(id)}
            onRename={handleRename(id, name)}
            t={t}
          />
        );
})} */

/* (
        !removable ? (
          <FixedChannel
            id={id}
            key={id}
            name={name}
            variant={id === currentChannelId ? 'primary' : null}
            active={id === currentChannelId ? "true" : ""}
            onClick={handleClick(id)}
            onRemove={handleRemove(id)}
            onRename={handleRename(id, name, removable)}
          t={t}/>
        ) : (
          <RemovableChannel
          id={id}
          key={id}
          name={name}
          variant={id === currentChannelId ? 'primary' : null}
          active={id === currentChannelId ? "true" : ""}
          onClick={handleClick(id)}
          onRemove={handleRemove(id)}
          onRename={handleRename(id, name)}
          t={t}
          />
))) */
