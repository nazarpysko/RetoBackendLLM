import fs from 'fs';
import YAML from 'yaml'

const file  = fs.readFileSync('./src/docs/swagger.yaml', 'utf8')
export default YAML.parse(file)