import React from 'react';
import {Divider, Grid, Header} from "semantic-ui-react";
import {Query} from "react-apollo";
import gql from 'graphql-tag';
import DataVersionList from "../components/data/DataVersions";
import DataTable from "../components/data/DataTable";

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

const DatasetHeader = ({loading = false, name, description}) => (
  loading ?
    <Header as='h1' dividing icon={{name: 'spinner', color: 'teal', loading: true}}/> :
    <Header as='h1' content={name} subheader={description} dividing
            icon={{name: 'list alternate outline', color: 'teal'}}/>
);

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

      // TODO: Change when query with id is implemented.
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
                <DataVersionList datasetId={id} languageCode={languageCode}/>
              </Grid.Column>
              <Grid.Column width={12}>
                {/* TODO: Make this pretty <DataHeader languageCode={languageCode}/>*/}
                <DataTable datasetId={id} versionId='latest' languageCode={languageCode}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    }}
  </Query>
);

export default Data;