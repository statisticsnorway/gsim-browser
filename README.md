# gsim-browser
A React application to browse the GSIM object-model stored in [LDS](https://github.com/statisticsnorway/linked-data-store-documentation).

### How it works
This application is fairly small and its primary function is to import and use 
[react-components-library](https://github.com/statisticsnorway/dc-react-components-library) and directly import objects 
into **LDS** via file-uploads. Additionally, it also exposes the ability to turn on special features from 
react-components-library which includes:

  * download data-objects as JSON-files
  * get direct links to chosen values in dropdowns
  * treat MultilingualText-objects as MultiInputs

**Note** that **react-components-library** builds forms and tables from JSONSchemas exposed by **LDS**.
To do that its needs a producer to be able to decode the structure of stored objects, handle and show them correctly in the UI.
Currently a producer for GSIM objects is supported and already loaded in. Producers are located in the react-components-library.

### Try it
The first time you clone the repository, remember to run `yarn install`.

Run `yarn start` and navigate to `http://localhost:3000/`.

### Run tests
[Jest](https://jestjs.io/en/) (through *react-test-renderer*) and [Enzyme](https://airbnb.io/enzyme/) is used for testing.

`yarn test` runs all tests and `yarn coverage` calculates (rather unreliably) test coverage.

### Note:
At the moment this application imports **react-components-library** directly from GitHub which means that you need read
access to the repository in order to fetch the dependency. This also means that updates to dependencies **will not be** 
reflected unless you run `yarn upgrade`.

### Docker image
* `yarn build`
* `docker build . -t gsim-browser:0.2`
* `docker run -p 8000:80 gsim-browser:0.2`
- Navigate to `http://localhost:8000/`
