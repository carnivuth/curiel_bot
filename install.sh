echo 'init json file'
mkdir resources
echo '[]'> resources/mancanze.json

echo 'creating env file'
cp .env.example .env
echo 'remember to edit .env variables'

