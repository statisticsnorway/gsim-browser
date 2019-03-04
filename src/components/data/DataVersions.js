import React from 'react';
import {Get} from 'react-axios';
import {List, Placeholder, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";


const LOADING = <Segment loading><Placeholder>
  <Placeholder.Header image>
    <Placeholder.Line/>
    <Placeholder.Line/>
  </Placeholder.Header>
</Placeholder>
</Segment>;

const DataVersionList = ({id, languageCode}) => (
  <Get url={`data/${id}`}>
    {(error, response, isLoading) => {
      if (isLoading || !response) return LOADING;
      if (error) return <div>Error: {error.message}</div>;

      return <Segment>
        <List divided relaxed>
          {response.data.map((version, idx) => (
            <List.Item key={idx}>
              <List.Icon name='file outline' size='large' verticalAlign='middle'/>
              <List.Content>
                <List.Header as={Link} to={`/gsim/data/${id}/${version.id}`}>{version.id}</List.Header>
                <List.Description as='a'>Updated 10 mins ago</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    }}
  </Get>

);

export default DataVersionList;