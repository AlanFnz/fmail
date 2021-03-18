//MongoDB client config
var MongoClient = require('mongodb').MongoClient;
var mongoDBName = 'myFirstDatabase'; 
var mongoCollectionName = 'emails'; 
var connectionString = 'mongodb+srv://dbuser:test1234@cluster0.pnuxa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; 

//Elasticsearch client config
const { Client } = require('@elastic/elasticsearch')
const esClient = new Client({ node: 'http://localhost:9200' });
var esIndexName = 'emails'; 

let bulk = [];

async function indexData() {

  const client = await MongoClient.connect(connectionString, { useNewUrlParser: true })
    .catch(err => { console.log(err); });

  if (!client) {
    return;
  }

  try {

    const db = client.db(mongoDBName);

    let collection = db.collection(mongoCollectionName);
    await collection.find().forEach((doc) => {
      bulk.push({
        index: {
          _index: esIndexName,
        }
      })

      let { _id, ...data } = doc;
      data.id = _id.toString();
      bulk.push(data);
    })
    console.log('bulk');

    await esClient.indices.create({
      index: esIndexName,
    }, { ignore: [400] })

    const { body: bulkResponse } = await esClient.bulk({ refresh: true, body: bulk })

    if (bulkResponse.errors) {
      const erroredDocuments = []
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: bulk[i * 2],
            document: bulk[i * 2 + 1]
          })
        }
      })
      console.log('erroredDocuments')
    }

    const { body: count } = await esClient.count({ index: esIndexName })
    console.log(count)

  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

indexData();