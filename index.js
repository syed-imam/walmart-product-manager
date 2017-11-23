import app from './server/server';
import config from './config/config';

app.listen(config.portNumber, () => {
    console.info(`server started on port 3000`);
});
