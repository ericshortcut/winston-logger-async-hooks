# Winston & Async Hooks

 Just a sample app formatting showing how to track API calls and keep context between different layers

## Installation

You can install packages locally or use Docker

```bash
npm install
```
or

```bash
docker-compose up --build
```

## Usage

```bash
# list 
curl localhost:3000
```
```bash
# insert 
curl --request POST \
  --url http://localhost:3000/doc \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "new Document"
}'
```
```bash
# get by id
curl --request GET \
  --url http://localhost:3000/doc/749b88fc-5561-49b1-b8af-d2acd5f01e98
```
```bash
# replace by id
curl --request PUT \
  --url http://localhost:3000/doc/749b88fc-5561-49b1-b8af-d2acd5f01e98 \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "new Document2"
}'
```
```bash
# delete document
curl --request DELETE \
  --url http://localhost:3000/doc/749b88fc-5561-49b1-b8af-d2acd5f01e98
```
## License

[BSD](https://opensource.org/licenses/BSD-3-Clause)