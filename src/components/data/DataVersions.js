import React from 'react';
import {Get} from 'react-axios';
import {Button, Header, Icon, List, Message, Placeholder, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import Moment from "react-moment";

// TODO: Use language code.

const DataVersionListLoading = () => (<Segment loading><Placeholder>
    <Placeholder.Header image>
      <Placeholder.Line/>
      <Placeholder.Line/>
    </Placeholder.Header>
  </Placeholder>
  </Segment>
);

const DataVersionListEmpty = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name='file outline'/>
      No data for this dataset.
    </Header>
    <Button primary>Upload data</Button>
  </Segment>
);

const DataVersionListError = ({error}) => (
  <Segment>
    <Message negative attached='top'>
      <Message.Header>Could not load versions.</Message.Header>
      <p>{error.toString()}</p>
    </Message>
  </Segment>
);

const DataVersionListNormal = ({datasetId, data}) => (
  <Segment>
    <List divided relaxed>
      {data.map((version, idx) => (
        <List.Item key={idx}>
          <List.Icon name='file outline' size='large' verticalAlign='middle'/>
          <List.Content>
            <List.Header as={Link} to={`/gsim/data/${datasetId}/${version.id}`}>{version.id}</List.Header>
            <List.Description as='a'><Moment fromNow>{version.createdAt}</Moment></List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  </Segment>
);

const DataVersionList = ({datasetId, languageCode}) => (
  <Get url={`data/${datasetId}`}>
    {(error, response, isLoading) => {
      if (error) return <DataVersionListError error={error}/>;
      if (isLoading || !response) return <DataVersionListLoading/>;
      if (response.data.length === 0) return <DataVersionListEmpty/>;
      return <DataVersionListNormal datasetId={datasetId} data={response.data}/>
    }}
  </Get>
);

export default DataVersionList;