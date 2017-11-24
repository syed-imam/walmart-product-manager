import app from './server/server';
import config from './config/config';

app.listen(config.portNumber, () => {
    console.info(`Server started on port `+config.portNumber);
});
