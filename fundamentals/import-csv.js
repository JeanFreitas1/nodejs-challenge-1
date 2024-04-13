import { parse } from "csv-parse";
import fs from 'node:fs'

const csvFile = new URL("../MOCK_DATA.csv", import.meta.url)
const stream = fs.createReadStream(csvFile)

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2 // skip the header line
});



(async () => {

  const linesParse = stream.pipe(csvParse)

  for await (const line of linesParse) {
    const [title, description] = line

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "applicaiton/json"
      },
      body: JSON.stringify({ title, description }),
    }).then(res => {
      return res.text()
    }).then(data => {
      console.log(data)
    })




  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }






}
)()



