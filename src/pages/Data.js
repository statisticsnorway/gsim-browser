import React from 'react';
import {Button, Divider, Grid, Header, Icon, List, Menu, Segment, Table} from "semantic-ui-react";
import {Query} from "react-apollo";
import gql from 'graphql-tag';

const DataListEmpty = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name='file outline'/>
      No data for this dataset.
    </Header>
    <Button primary>Upload data</Button>
  </Segment>
);

const response = {
  "data": {
    "UnitDataSet": {
      "edges": [
        {
          "cursor": "b9c10b86-5867-4270-b56e-ee7439fe381e",
          "node": {
            "name": [
              {
                "languageCode": "en",
                "languageText": "PersonWithIncomeDataset"
              }
            ],
            "description": [
              {
                "languageCode": "en",
                "languageText": "Persons with income in Norway per 2018-01-01"
              }
            ]
          }
        },
        {
          "cursor": "d7f1a566-b906-4561-92cb-4758b766335c",
          "node": {
            "name": [
              {
                "languageCode": "en",
                "languageText": "FamilyDataset"
              }
            ],
            "description": [
              {
                "languageCode": "en",
                "languageText": "Dataset for families in Norway per 2018-01-01"
              }
            ]
          }
        }
      ]
    }
  }
}

const GET_ONE = gql`
    query getOne($id:String!)  {
        UnitDataSet(after:$id, ) {
            edges {
                cursor
                node {
                    name {
                        languageCode
                        languageText
                    }
                    description {
                        languageCode
                        languageText
                    }
                }
            }
        }
    }
`;

const GET_UNIT_DATASET = gql`
    query listDatasets {
        UnitDataSet {
            edges {
                cursor
                node {
                    name {
                        languageCode
                        languageText
                    }
                    description {
                        languageCode
                        languageText
                    }
                }
            }
        }
    }
`;

/**
 * Lists the versions of a dataset.
 */
const DataList = ({id}) => (
  <Segment>
    <List divided relaxed>
      <List.Item>
        <List.Icon name='github' size='large' verticalAlign='middle'/>
        <List.Content>
          <List.Header as='a'>2008-09-15T15:53:00</List.Header>
          <List.Description as='a'>Updated 10 mins ago</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name='github' size='large' verticalAlign='middle'/>
        <List.Content>
          <List.Header as='a'>2008-09-15T15:53:00</List.Header>
          <List.Description as='a'>Updated 22 mins ago</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name='github' size='large' verticalAlign='middle'/>
        <List.Content>
          <List.Header as='a'>2008-09-15T15:53:00</List.Header>
          <List.Description as='a'>Updated 34 mins ago</List.Description>
        </List.Content>
      </List.Item>
      <Header textAlign="center">
        <Button primary>Upload new data</Button>
      </Header>
    </List>
  </Segment>
);

const DatasetHeader = ({loading = false, name, description}) => (
  loading ?
    <Header as='h1' dividing icon={{name: 'spinner', color: 'teal', loading: true}}/> :
    <Header as='h1' content={name} subheader={description} dividing
            icon={{name: 'list alternate outline', color: 'teal'}}/>
);

const DataHeader = () => (
  <Table compact size='small' basic='very' celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell as='h4' colSpan={2}>Uploaded on Tuesday, February 26, 2019 (GMT+1) by
          Hadrien
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Header as='h5'>
            <Header.Content>
              Size
              <Header.Subheader>Size of the data</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>159 Mib</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4'>
            <Header.Content>
              Rows
              <Header.Subheader>Total amout of rows</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>4 678 987 rows</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4'>
            <Header.Content>
              Location
              <Header.Subheader>Where the data is saved</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>gs://ssb-data-a/data/b9c10b86-5867-4270-b56e-ee7439fe381e</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

/**
 * Displays data.
 */
const DataTable = () => (
  <Table compact celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{color: "#0063ad"}}>
          <Icon disabled name='tag'/>Id
        </Table.HeaderCell>
        <Table.HeaderCell style={{color: "#ff5b36"}}>
          <Icon disabled name='area graph'/>Measure
        </Table.HeaderCell>
        <Table.HeaderCell style={{color: "#00ad11"}}>
          <Icon disabled name='sticky note outline '/>Attribute
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left'/>
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right'/>
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

const Data = ({languageCode}) => (
  <Query query={GET_UNIT_DATASET}>
    {({loading, error, data}) => {
      if (loading) return <DatasetHeader loading/>;

      // TODO: Improve.
      if (error) return `Error!` + JSON.stringify(error);

      // Extract the UnitDataSet.
      const datasets = [];
      const {UnitDataSet: {edges}} = data;
      for (const edge of edges) {
        const {
          cursor: id,
          node: {
            name: [{languageText: name}],
            description: [{languageText: description}]
          }
        } = edge;
        datasets.push({id, name, description})
      }

      // TODO:
      const [{
        cursor: id,
        node: {
          name: [{languageText: name}],
          description: [{languageText: description}]
        }
      }] = edges;

      return (
        <div>
          <DatasetHeader name={name} description={description}/>
          <Divider hidden/>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <DataList id={id} languageCode={languageCode}/>
              </Grid.Column>
              <Grid.Column width={12}>
                {/* TODO: Make this pretty <DataHeader languageCode={languageCode}/>*/}
                <DataTable id={id} version={null} languageCode={languageCode}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    }}
  </Query>
);

export default Data;