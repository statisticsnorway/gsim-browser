import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Message, Progress} from "semantic-ui-react";

function humanFileSize(bytes, si) {
  let thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  var units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + ' ' + units[u];
}

/**
 * Handles upload.
 *
 * An axios instance needs to be provided, either via <AxiosProvider> (context) or
 * directly using the instance property.
 */
class DataUpload extends Component {

  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      upload: false,
      error: false
    };
  }

  getAxios() {
    return this.props.instance || this.context.axios;
  }

  setStatePromise(newState) {
    return new Promise((resolve) => {
      this.setState(newState, () => resolve());
    });
  }

  async uploadFile(event) {
    event.persist();
    const axios = this.getAxios();
    await this.setStatePromise({upload: true, error: false, loaded: 0, total: 0});
    try {
      const file = event.target.files[0];
      const {
        headers: {
          location: uploadHandle
        }
      } = await axios.post(`/data/${this.props.datasetId}/upload`);
      await axios.post(uploadHandle, file, {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: ProgressEvent.loaded,
            total: ProgressEvent.total
          })
        },
      });
    } catch (error) {
      await this.setStatePromise({error});
    } finally {
      await this.setStatePromise({upload: false});
    }
  }

  render() {
    const {
      upload, error,
      loaded, total
    } = this.state;
    return (
      <>
        <Button primary color='teal' disabled={upload} loading={upload}
                onClick={() => this.input && this.input.current.click()}>
          Upload data
        </Button>
        {upload && <Progress percent={loaded / total * 100} error={error} size='small'>
          {error
            ? <Message error>{error.message}</Message>
            : <span>{ (loaded / total * 100).toFixed(1) }% | {humanFileSize(loaded, true)} / {humanFileSize(total, true)}</span>
          }
        </Progress>}

        <input ref={this.input} type='file' onChange={(event) => this.uploadFile(event)}
               style={{display: 'none'}} accept='application/json,text/csv,.csv'/>
      </>
    );
  }
}

DataUpload.contextTypes = {
  axios: PropTypes.func
}

DataUpload.propTypes = {
  datasetId: PropTypes.string,
  instance: PropTypes.func
};

export default DataUpload;