const { Client } = require('@elastic/elasticsearch')
const esClient = new Client({ node: 'http://localhost:9200' });

esClient.indices.delete({
    index: 'emails',
  }).then(function(resp) {
    console.log("Successful query!");
    console.log(JSON.stringify(resp, null, 4));
  }, function(err) {
    console.trace(err.message);
  });