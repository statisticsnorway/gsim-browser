# gsim-browser
A React application to browse the GSIM object-model stored in [LDS](https://github.com/statisticsnorway/linked-data-store-documentation).

### How it works
This application is fairly small and its only function is to import and use 
[react-components-library](https://github.com/statisticsnorway/dc-react-components-library) and then expose the ability to
turn on special features from react-components-library like the ability to:

  * directly import objects into **LDS** via file-uploads
  * download data-objects as JSON-files
  * get direct links to chosen values in dropdowns
  * treat MultilingualText-objects as MultiInputs
  * ... and more to come!

Noteworthy information about **react-components-library** is that it builds forms and tables from JSONSchemas exposed by **LDS**.
To do that its needs a producer to be able to decode the structure of the stored objects, handle and show them correctly in the UI.
Currently a producer for GSIM objects is supported and already loaded in. Producers are located in the react-components-library 
code but might find their way to a separate repository later.

### Try it
The first time you clone the repository, remember to run `yarn install`

Run `REACT_APP_LDS="LDS_url_here" yarn start` and navigate to `http://localhost:3000/`

If you leave out `REACT_APP_LDS` it defaults to `http://localhost:9090/`

##### Alternatively use a more optimized production build:
1. Run `REACT_APP_LDS="LDS_url_here" yarn build`
2. Optionally run `yarn global add serve` (if you do not have [serve](https://github.com/zeit/serve/))
3. Run `serve -s build`
4. Navigate to `http://localhost:5000/`

### Run tests
[Jest](https://jestjs.io/en/) (through *react-test-renderer*) and [Enzyme](https://airbnb.io/enzyme/) is used for testing

`yarn test` runs all tests and `yarn coverage` calculates (rather unreliably) test coverage

### Note:
At the moment this application imports **react-components-library** directly from GitHub which means that you need read
access to the repository in order to fetch the dependency. This will change later when we get to upload React libraries
to Nexus or go public. This also means that updates to dependencies **will not be** reflected unless you run `yarn upgrade`.

### Docker image
- `docker build . -t dc-gsim-browser:0.1`
- `docker run -p 8000:80 dc-gsim-browser:0.1`
- Navigate to `http://localhost:8000/gsim/`
