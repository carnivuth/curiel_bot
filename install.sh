echo 'init json file'
mkdir data
echo '[]'> data/mancanze.json
echo '[]'> data/turni.json

echo 'creating env file'
cp .env.example .env
echo 'remember to edit .env variables'

