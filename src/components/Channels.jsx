import React, { useState } from 'react';
import { Col, Nav, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels, changeCurrentChannel, fetchData } from '../slices/ChannelsSlice.js';
import { openModal } from '../slices/modalSlice.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const FixedChannel = ({ name, onClick, id, active }) => (
  <Nav.Link key={id}  eventKey={id} active={active}  className="w-100 rounded text-start" onClick={onClick}>
      {name}
  </Nav.Link>
  );

  /*<Button active={active} className="w-100 rounded text-start" onClick={onClick}>
  <span className="me-1">#</span>
  {name}
</Button>*/

 const UnremovableChannel = ({ name, variant, onClick, onRename, onRemove, id, active, t }) => (
  <Dropdown as={ButtonGroup} key={id} eventKey={id} className="d-flex mb-2">
    <Nav.Link as={Button} aria-label={name} role="button" active={active} className="w-100 rounded text-start" onClick={onClick}>
      <p>{name}</p>
    </Nav.Link>

    <Dropdown.Toggle role="button" split variant={variant} data-testid="channel-dropdown" id="dropdown-split-basic">
      <span className="visually-hidden">{t('elements.controlChannel')}</span>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item onClick={onRename} role="button">{t('elements.renameChannel')}</Dropdown.Item>
      <Dropdown.Item onClick={onRemove} role="button">{t('elements.removeChannel')}</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
 );

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectorChannels.selectAll);
  const {currentChannelId} = useSelector((state) => state.channels);
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

  const handleRename = (id, name) => () => {
    dispatch(openModal({ type: 'renameChannel', updateData: { id, name } }));
    //toast(t('toast.renamedChannel'));
  };

  const renderChannels = () => (
    <Nav variant="pills" fill className="flex-column">
      {channels.map(({ id, name, removable }) => {
        return (removable ? (
          <UnremovableChannel 
          id={id}
          key={id}
          name={name}
          variant={id === currentChannelId ? 'primary' : null}
          active={id === currentChannelId ? "true" : ""}
          onClick={handleClick(id)}
          onRemove={handleRemove(id)}
          onRename={handleRename(id, name)}
          t={t}/>
        ) : (
          <FixedChannel
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
        ))
      })}
    </Nav>
  );

  return (
    <Col md="auto" className="border-end pt-5 px-0 bg-light h-100">
      <div className="d-flex justify-content-around">
        <span>{t('elements.channels')}: </span>
        <Button variant="outline-primary"  size="sm" className="p-0 ml-auto" onClick={handleAdd}>+</Button>
      </div>
      {renderChannels()}
    </Col>
  );
};

export default Channels;

      /*{
        const Channel = removable ? UnremovableChannel : FixedChannel;
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
      })}*/