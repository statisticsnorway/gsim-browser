import React from 'react';
import {Get} from 'react-axios';
import {Header, Icon, List, Message, Placeholder, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {humanFileSize} from "./DataUpload";

// TODO: Use language code.

const DataVersionListLoading = () => (
  <Segment loading attached>
    <Placeholder>
      <Placeholder.Header image>
        <Placeholder.Line/>
        <Placeholder.Line/>
      </Placeholder.Header>
    </Placeholder>
  </Segment>
);

const DataVersionListEmpty = () => (
  <Segment attached placeholder>
    <Header icon>
      <Icon name='file outline'/>
      No data for this dataset.
    </Header>
  </Segment>
);

const DataVersionListError = ({error}) => (
  <Segment attached>
    <Message negative attached='top'>
      <Message.Header>Could not load versions.</Message.Header>
      <p>{error.toString()}</p>
    </Message>
  </Segment>
);

const DataVersionListNormal = ({datasetId, data}) => (
  <Segment attached>
    <List divided relaxed>
      {data.map((version, idx) => (
        <List.Item key={idx}>
          <List.Icon name='file outline' size='large' verticalAlign='middle'/>
          <List.Content>
            <List.Header as={Link} to={`/gsim/data/${datasetId}/${version.id}`}>{version.id}</List.Header>
            <List.Description as='a'>Created: <Moment fromNow>{version.createdAt}</Moment></List.Description>
            <List.Description as='a'>Size: {humanFileSize(version.size)} ({version.rows} rows)</List.Description>
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