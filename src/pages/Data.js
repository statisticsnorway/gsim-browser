import React from 'react';
import {Divider, Grid, Header} from "semantic-ui-react";
import {Query} from "react-apollo";
import gql from 'graphql-tag';
import DataVersionList from "../components/data/DataVersions";
import DataTable from "../components/data/DataTable";
import DataUpload from "../components/data/DataUpload";
import {Route} from "react-router-dom";

const GET_UNIT_DATASET = gql`
    query GetUnitDatasetById($id: ID!) {
        UnitDataSetById(id: $id) {
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
`;

const DatasetHeader = ({loading = false, name, description}) => (
  loading ?
    <Header as='h1' dividing icon={{name: 'spinner', color: 'teal', loading: true}}/> :
    <Header as='h1' content={name} subheader={description} dividing
            icon={{name: 'list alternate outline', color: 'teal'}}/>
);

const Data = ({datasetId, languageCode}) => (
  <Query query={GET_UNIT_DATASET} variables={{id:datasetId}} >
{({loading, error, data}) => {
  if (loading) return <DatasetHeader loading/>;

  // TODO: Improve.
  if (error) return `Error!` + JSON.stringify(error);

  return (
    <>
      <DatasetHeader
        name={data.UnitDataSetById.name[0].languageText}
        description={data.UnitDataSetById.description[0].languageText}
      />
      <Divider hidden/>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header as='h2' attached='top'>
              <DataUpload datasetId={datasetId}/>
            </Header>
            <DataVersionList datasetId={datasetId} languageCode={languageCode}/>
          </Grid.Column>
          <Grid.Column width={12}>
            <Route path='/gsim/data/:datasetId/:versionId'
                   render={({match: {params: {datasetId, versionId = 'latest'}}}) => (
                     <DataTable datasetId={datasetId} versionId={versionId} languageCode={languageCode}/>
                   )}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}}
</Query>
)
;

export default Data;