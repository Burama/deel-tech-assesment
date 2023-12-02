import api from './api'
import { getConfigValue, getServerUrl } from './config'
import { CONFIG } from './const'

const bootstrap = async () => {
  const serverPort = getConfigValue(CONFIG.SERVER_PORT);

  try {
    api.listen(serverPort, () => {
      console.log(`Server is running at ${getServerUrl()}`)
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
